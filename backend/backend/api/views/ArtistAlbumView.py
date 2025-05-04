from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated, AllowAny
from api.serializers.ArtistAlbumSerializer import ArtistAlbumSerializer
from api.models.ArtistAlbum import ArtistAlbum
from api.models.Album import Album
from api.models.Artist import Artist

class ArtistAlbumView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request, pk=None):
        """Lấy danh sách artist-album hoặc một artist-album cụ thể."""
        if pk:
            artist_album = get_object_or_404(ArtistAlbum, pk=pk)
            serializer = ArtistAlbumSerializer(artist_album)
        else:
            artist_albums = ArtistAlbum.objects.all()
            serializer = ArtistAlbumSerializer(artist_albums, many=True)
        return Response({
            "success": True,
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    def post(self, request):
        """Thêm một artist-album mới."""
        serializer = ArtistAlbumSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "success": True,
                "message": "Artist-Album đã được tạo thành công",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "success": False,
            "message": "Dữ liệu không hợp lệ",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        """Cập nhật thông tin artist-album."""
        artist_album = get_object_or_404(ArtistAlbum, pk=pk)
        serializer = ArtistAlbumSerializer(artist_album, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "success": True,
                "message": "Artist-Album đã được cập nhật thành công",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "success": False,
            "message": "Dữ liệu không hợp lệ",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """Xóa artist-album."""
        artist_album = get_object_or_404(ArtistAlbum, pk=pk)
        artist_album.delete()
        return Response({
            "success": True,
            "message": "Artist-Album đã được xóa thành công"
        }, status=status.HTTP_204_NO_CONTENT)

class ArtistAlbumByAlbumView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request, album_id):
        """Lấy danh sách artist của một album."""
        album = get_object_or_404(Album, pk=album_id)
        artist_albums = ArtistAlbum.objects.filter(album=album, is_active=True)
        serializer = ArtistAlbumSerializer(artist_albums, many=True)
        return Response({
            "success": True,
            "data": serializer.data
        }, status=status.HTTP_200_OK)

class ArtistAlbumByArtistView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request, artist_id):
        """Lấy danh sách album của một artist."""
        artist = get_object_or_404(Artist, pk=artist_id)
        artist_albums = ArtistAlbum.objects.filter(artist=artist, is_active=True)
        serializer = ArtistAlbumSerializer(artist_albums, many=True)
        return Response({
            "success": True,
            "data": serializer.data
        }, status=status.HTTP_200_OK) 