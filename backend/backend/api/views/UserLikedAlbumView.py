from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from api.models.UserLikedAlbum import UserLikedAlbum
from api.serializers.UserLikedAlbumSerializer import UserLikedAlbumSerializer

class UserLikedAlbumView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        if pk:
            liked_album = get_object_or_404(UserLikedAlbum, pk=pk)
            serializer = UserLikedAlbumSerializer(liked_album)
        else:
            liked_albums = UserLikedAlbum.objects.all()
            serializer = UserLikedAlbumSerializer(liked_albums, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = UserLikedAlbumSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        liked_album = get_object_or_404(UserLikedAlbum, pk=pk)
        liked_album.delete()
        return Response({"message": "UserLikedAlbum deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
