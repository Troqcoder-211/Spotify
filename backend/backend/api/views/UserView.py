from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from api.serializers.UserSerializer import UserSerializer
from api.models.User import User


class UserView(APIView):
    permission_classes = [IsAuthenticated]  # Yêu cầu xác thực JWT
    parser_classes = [MultiPartParser, FormParser]  # Hỗ trợ upload file

    def get(self, request, pk=None):
        """Lấy danh sách user hoặc một user cụ thể."""
        if pk:
            user = get_object_or_404(User, pk=pk)
            serializer = UserSerializer(user)
            return Response({
                "success": True,
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        else:
            users = User.objects.all()
            serializer = UserSerializer(users, many=True)
            return Response({
                "success": True,
                "data": serializer.data
            }, status=status.HTTP_200_OK)

    def post(self, request):
        """Tạo user mới."""
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "success": True,
                "message": "Người dùng đã được tạo thành công",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "success": False,
            "message": "Dữ liệu không hợp lệ",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        """Xử lý các request PUT."""
        if request.path.endswith('/suspend/'):
            return self.suspend(request, pk)
        elif request.path.endswith('/active/'):
            return self.active(request, pk)
        else:
            return self.update(request, pk)

    def delete(self, request, pk):
        """Xoá user theo ID."""
        user = get_object_or_404(User, pk=pk)
        user.delete()
        return Response({
            "success": True,
            "message": "Người dùng đã được xoá thành công"
        }, status=status.HTTP_204_NO_CONTENT)

    def suspend(self, request, pk):
        """Tạm dừng tài khoản user."""
        user = get_object_or_404(User, pk=pk)
        user.is_active = False
        user.save()
        return Response({
            "success": True,
            "message": "Tài khoản đã được tạm dừng thành công"
        }, status=status.HTTP_200_OK)
    
    def active(self, request, pk):
        """Kích hoạt tài khoản user."""
        user = get_object_or_404(User, pk=pk)
        user.is_active = True
        user.save()
        return Response({
            "success": True,
            "message": "Tài khoản đã được kích hoạt thành công"
        }, status=status.HTTP_200_OK)   

    def update(self, request, pk):
        """Cập nhật user theo ID."""
        user = get_object_or_404(User, pk=pk)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "success": True,
                "message": "Người dùng đã được cập nhật thành công",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "success": False,
            "message": "Dữ liệu không hợp lệ",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
