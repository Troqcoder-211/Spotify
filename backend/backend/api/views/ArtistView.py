from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from api.serializers.ArtistSerializer import ArtistSerializer
from api.models.Artist import Artist
from rest_framework.exceptions import ValidationError


class ArtistView(APIView):
    permission_classes = [IsAuthenticated]  # Yêu cầu xác thực JWT
    parser_classes = (MultiPartParser, FormParser)  # Thêm hỗ trợ file upload

    def get(self, request, pk=None):
        """Lấy danh sách tất cả artists hoặc một artist cụ thể."""
        if pk:
            artist = get_object_or_404(Artist, pk=pk)
            serializer = ArtistSerializer(artist)
            return Response({
                "success": True,
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        else:
            artists = Artist.objects.all()
            serializer = ArtistSerializer(artists, many=True)
            return Response({
                "success": True,
                "data": serializer.data
            }, status=status.HTTP_200_OK)

    def post(self, request):
        """Thêm một artist mới."""
        # Kiểm tra nếu có file ảnh và thêm vào dữ liệu
        if 'profile_picture' in request.FILES:
            request.data['profile_picture'] = request.FILES['profile_picture']

        # Sử dụng serializer để kiểm tra tính hợp lệ của dữ liệu
        serializer = ArtistSerializer(data=request.data)
        if serializer.is_valid():
            try:
                # Lưu artist vào cơ sở dữ liệu
                artist = serializer.save()
                return Response({
                    "success": True,
                    "message": "Nghệ sĩ đã được tạo thành công",
                    "data": serializer.data
                }, status=status.HTTP_201_CREATED)
            except ValidationError as e:
                return Response({
                    "success": False,
                    "message": "Có lỗi xảy ra trong quá trình lưu dữ liệu",
                    "error": str(e)
                }, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Nếu dữ liệu không hợp lệ, trả về lỗi
            return Response({
                "success": False,
                "message": "Dữ liệu không hợp lệ",
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        """Cập nhật thông tin artist theo ID."""
        # Lấy đối tượng artist từ cơ sở dữ liệu theo pk
        artist = get_object_or_404(Artist, pk=pk)

        # Kiểm tra xem có file ảnh mới không
        if 'profile_picture' in request.FILES:
            request.data['profile_picture'] = request.FILES['profile_picture']

        # Sử dụng serializer để cập nhật thông tin artist
        serializer = ArtistSerializer(artist, data=request.data, partial=True)
        if serializer.is_valid():
            try:
                # Lưu các thay đổi vào cơ sở dữ liệu
                artist = serializer.save()
                return Response({
                    "success": True,
                    "message": "Nghệ sĩ đã được cập nhật thành công",
                    "data": serializer.data
                }, status=status.HTTP_200_OK)
            except ValidationError as e:
                return Response({
                    "success": False,
                    "message": "Có lỗi xảy ra trong quá trình cập nhật dữ liệu",
                    "error": str(e)
                }, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Nếu dữ liệu không hợp lệ, trả về lỗi
            return Response({
                "success": False,
                "message": "Dữ liệu không hợp lệ",
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """Xoá artist theo ID."""
        artist = get_object_or_404(Artist, pk=pk)
        artist.delete()
        return Response({
            "success": True,
            "message": "Nghệ sĩ đã được xoá thành công"
        }, status=status.HTTP_204_NO_CONTENT)
