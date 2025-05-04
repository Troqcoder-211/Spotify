from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated, AllowAny
from api.serializers.ArtistTrackSerializer import ArtistTrackSerializer
from api.models.ArtistTrack import ArtistTrack
from api.models.Track import Track
from api.models.Artist import Artist

class ArtistTrackView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request, pk=None):
        """Lấy danh sách artist-track hoặc một artist-track cụ thể."""
        if pk:
            artist_track = get_object_or_404(ArtistTrack, pk=pk)
            serializer = ArtistTrackSerializer(artist_track)
        else:
            artist_tracks = ArtistTrack.objects.all()
            serializer = ArtistTrackSerializer(artist_tracks, many=True)
        return Response({
            "success": True,
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    def post(self, request):
        """Thêm một artist-track mới."""
        serializer = ArtistTrackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "success": True,
                "message": "Artist-Track đã được tạo thành công",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "success": False,
            "message": "Dữ liệu không hợp lệ",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        """Cập nhật thông tin artist-track."""
        artist_track = get_object_or_404(ArtistTrack, pk=pk)
        serializer = ArtistTrackSerializer(artist_track, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "success": True,
                "message": "Artist-Track đã được cập nhật thành công",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "success": False,
            "message": "Dữ liệu không hợp lệ",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """Xóa artist-track."""
        artist_track = get_object_or_404(ArtistTrack, pk=pk)
        artist_track.delete()
        return Response({
            "success": True,
            "message": "Artist-Track đã được xóa thành công"
        }, status=status.HTTP_204_NO_CONTENT)

class ArtistTrackByTrackView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request, track_id):
        """Lấy danh sách artist của một track."""
        track = get_object_or_404(Track, pk=track_id)
        artist_tracks = ArtistTrack.objects.filter(track=track, is_active=True)
        serializer = ArtistTrackSerializer(artist_tracks, many=True)
        return Response({
            "success": True,
            "data": serializer.data
        }, status=status.HTTP_200_OK)

class ArtistTrackByArtistView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request, artist_id):
        """Lấy danh sách track của một artist."""
        artist = get_object_or_404(Artist, pk=artist_id)
        artist_tracks = ArtistTrack.objects.filter(artist=artist, is_active=True)
        serializer = ArtistTrackSerializer(artist_tracks, many=True)
        return Response({
            "success": True,
            "data": serializer.data
        }, status=status.HTTP_200_OK) 