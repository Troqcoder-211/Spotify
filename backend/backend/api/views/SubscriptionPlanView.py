from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from api.models.SubscriptionPlan import SubscriptionPlan
from api.serializers.SubscriptionPlanSerializer import SubscriptionPlanSerializer


class SubscriptionPlanView(APIView):
    def get(self, request, pk=None):
        """Lấy danh sách tất cả hoặc 1 gói Premium cụ thể"""
        if pk:
            plan = get_object_or_404(SubscriptionPlan, pk=pk)
            serializer = SubscriptionPlanSerializer(plan)
            return Response({
                "success": True,
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        else:
            plans = SubscriptionPlan.objects.all()
            serializer = SubscriptionPlanSerializer(plans, many=True)
            return Response({
                "success": True,
                "data": serializer.data
            }, status=status.HTTP_200_OK)
            
    def post(self, request):
        """Tạo một gói Premium mới"""
        serializer = SubscriptionPlanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "success": True,
                "message": "Gói Premium đã được tạo thành công",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "success": False,
            "message": "Dữ liệu không hợp lệ",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
            
    
