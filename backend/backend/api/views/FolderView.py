from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from api.serializers.FolderSerializer import FolderSerializer
from api.models.Folder import Folder


class FolderView(APIView):
    permission_classes = [IsAuthenticated]  # Yêu cầu xác thực JWT

    def get(self, request, pk=None):
        """Lấy danh sách tất cả folders hoặc một folder cụ thể."""
        if pk:
            # Chỉ lấy folder của user hiện tại
            folder = get_object_or_404(Folder, pk=pk, user=request.user)
            serializer = FolderSerializer(folder)
            return Response({
                "success": True,
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        else:
            # Lấy tất cả folder của user hiện tại
            folders = Folder.objects.filter(user=request.user)
            serializer = FolderSerializer(folders, many=True)
            return Response({
                "success": True,
                "data": serializer.data
            }, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data.copy()  # Tạo bản sao có thể sửa đổi

        data['user_id'] = request.user.id  # Gán user hiện tại vào dữ liệu
        """Tạo một folder mới."""
        serializer = FolderSerializer(data=request.data)
        if serializer.is_valid():
            folder = serializer.save()
            return Response({
                "success": True,
                "message": "Folder đã được tạo thành công",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "success": False,
            "message": "Dữ liệu không hợp lệ",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        """Cập nhật thông tin folder theo ID."""
        folder = get_object_or_404(
            # Chỉ cho phép cập nhật folder của user hiện tại
            Folder, pk=pk, user=request.user)
        serializer = FolderSerializer(folder, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "success": True,
                "message": "Folder đã được cập nhật thành công",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "success": False,
            "message": "Dữ liệu không hợp lệ",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """Xoá folder theo ID."""
        folder = get_object_or_404(
            Folder, pk=pk, user=request.user)  # Chỉ cho phép xóa folder của user hiện tại
        folder.delete()
        return Response({
            "success": True,
            "message": "Folder đã được xoá thành công"
        }, status=status.HTTP_204_NO_CONTENT)
