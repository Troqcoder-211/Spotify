from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from api.models.Transaction import Transaction
from api.models.SubscriptionPlan import SubscriptionPlan
from api.serializers.TransactionSerializer import TransactionSerializer
import requests, hmac, hashlib, json
from django.utils import timezone
from datetime import timedelta

PAYOS_CLIENT_ID = "10438d5e-6f68-48c6-aef3-1fa52a1c0570"
PAYOS_API_KEY = "1f100296-0e42-4464-907f-034f992deb9f"
PAYOS_CHECKSUM_KEY = "bd92eff46695a7b6aef2e30b51ded9e08664e1462d0ee860b81e1216c48a91cd"

class TransactionView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        """Lấy tất cả hoặc một giao dịch của người dùng hiện tại."""
        if pk:
            transaction = get_object_or_404(Transaction, pk=pk, user=request.user)
            serializer = TransactionSerializer(transaction)
            return Response({
                "success": True,
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        else:
            transactions = Transaction.objects.filter(user=request.user).order_by('-created_at')
            serializer = TransactionSerializer(transactions, many=True)
            return Response({
                "success": True,
                "data": serializer.data
            }, status=status.HTTP_200_OK)

    def post(self, request):
        """Tạo giao dịch mới và lấy link thanh toán từ PayOS"""
        plan_id = request.data.get("plan_id")
        payment_method = "PayOS"

        plan = get_object_or_404(SubscriptionPlan, pk=plan_id)
        amount = int(plan.price)

        transaction = Transaction.objects.create(
            user=request.user,
            plan=plan,
            payment_method=payment_method,
            status='pending',
            amount=plan.price
        )

        order_code = int(f"{transaction.id}{int(timezone.now().timestamp())}")
        
        transaction.order_code = order_code
        transaction.save()
        
        return_url = f"http://localhost:5173/payment-success?orderCode={order_code}"
        cancel_url = f"http://localhost:5173/"
        # callback_url = "https://four-melons-show.loca.lt/payment-callback/"


        # Tạo chữ ký đúng chuẩn theo tài liệu PayOS
        description = f"Mua gói {plan.name}"
        signature_raw = f"amount={amount}&cancelUrl={cancel_url}&description={description}&orderCode={order_code}&returnUrl={return_url}"
        signature = hmac.new(PAYOS_CHECKSUM_KEY.encode(), signature_raw.encode(), hashlib.sha256).hexdigest()


        payload = {
            "orderCode": order_code,
            "amount": amount,
            "description": description,
            "returnUrl": return_url,
            "cancelUrl": cancel_url,
            "signature": signature
        }

        headers = {
            "Content-Type": "application/json",
            "x-client-id": PAYOS_CLIENT_ID,
            "x-api-key": PAYOS_API_KEY
        }

        response = requests.post("https://api-merchant.payos.vn/v2/payment-requests", headers=headers, json=payload)

        response_data = response.json()
        if response.status_code == 200 and response_data.get("data") and response_data["data"].get("checkoutUrl"):
            checkout_url = response_data["data"]["checkoutUrl"]
            return Response({
                "success": True,
                "message": "Tạo giao dịch thành công",
                "data": {
                    "checkoutUrl": checkout_url,
                    "transaction_id": transaction.id
                }
              
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "success": False,
                "message": "Không thể tạo đơn hàng thanh toán",
                "error": response_data
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request):
        """Cập nhật trạng thái giao dịch và ngày thanh toán"""
        order_code = request.data.get('orderCode')
        new_status = request.data.get('status', 'success')  # mặc định là 'success'

        if not order_code:
            return Response({"success": False, "message": "Thiếu orderCode"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            transaction = Transaction.objects.select_related('plan').get(order_code=order_code, user=request.user)
        except Transaction.DoesNotExist:
            return Response({"success": False, "message": "Giao dịch không tìm thấy"}, status=status.HTTP_404_NOT_FOUND)

        if transaction.status != 'success' and new_status == 'success':
            # Cập nhật trạng thái và thời gian thanh toán
            transaction.status = 'success'
            transaction.paid_at = timezone.now()
            if transaction.plan and transaction.plan.duration_days:
                transaction.expires_at = transaction.paid_at + timedelta(days=transaction.plan.duration_days)
            transaction.save()
            
            # Cập nhật user thành premium
            user = transaction.user
            user.account_type = 'premium'
            user.save()

        return Response({"success": True, "message": "Cập nhật giao dịch thành công"}, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        """Xoá giao dịch (nếu chưa thanh toán)"""
        transaction = get_object_or_404(Transaction, pk=pk, user=request.user)
        if transaction.status == 'pending':
            transaction.delete()
            return Response({
                "success": True,
                "message": "Giao dịch đã được xoá"
            }, status=status.HTTP_204_NO_CONTENT)
        return Response({
            "success": False,
            "message": "Chỉ được xoá giao dịch khi đang ở trạng thái pending"
        }, status=status.HTTP_400_BAD_REQUEST)
        
