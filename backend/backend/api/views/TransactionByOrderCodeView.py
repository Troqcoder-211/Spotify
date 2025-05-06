from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from api.models.Transaction import Transaction
from api.serializers.TransactionSerializer import TransactionSerializer

class TransactionByOrderCodeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, order_code):
        transaction = get_object_or_404(Transaction, order_code=order_code, user=request.user)
        serializer = TransactionSerializer(transaction)
        return Response({
            "success": True,
            "data": serializer.data
        }, status=status.HTTP_200_OK)

