from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from api.serializers.GenreSerializer import GenreSerializer
from api.models.Genre import Genre


class GenreView(APIView):
    permission_classes = [IsAuthenticated]  # Yêu cầu xác thực JWT

    def get(self, request, pk=None):
        """Lấy danh sách tất cả genres hoặc một genre cụ thể."""
        if pk:
            genre = get_object_or_404(Genre, pk=pk)
            serializer = GenreSerializer(genre)
            return Response({
                "success": True,
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        else:
            genres = Genre.objects.all()
            serializer = GenreSerializer(genres, many=True)
            return Response({
                "success": True,
                "data": serializer.data
            }, status=status.HTTP_200_OK)

    def post(self, request):
        """Thêm một genre mới."""
        serializer = GenreSerializer(data=request.data)
        if serializer.is_valid():
            genre = serializer.save()
            return Response({
                "success": True,
                "message": "Thể loại đã được tạo thành công",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "success": False,
            "message": "Dữ liệu không hợp lệ",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        """Cập nhật thông tin genre theo ID."""
        genre = get_object_or_404(Genre, pk=pk)
        serializer = GenreSerializer(genre, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "success": True,
                "message": "Thể loại đã được cập nhật thành công",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "success": False,
            "message": "Dữ liệu không hợp lệ",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """Xoá genre theo ID."""
        genre = get_object_or_404(Genre, pk=pk)
        genre.delete()
        return Response({
            "success": True,
            "message": "Thể loại đã được xoá thành công"
        }, status=status.HTTP_204_NO_CONTENT)
