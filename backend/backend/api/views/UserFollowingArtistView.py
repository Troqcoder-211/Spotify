from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from api.models.UserFollowingArtist import UserFollowingArtist
from api.serializers.UserFollowingArtistSerializer import UserFollowingArtistSerializer

class UserFollowingArtistView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        if pk:
            following_artist = get_object_or_404(UserFollowingArtist, pk=pk)
            serializer = UserFollowingArtistSerializer(following_artist)
        else:
            following_artists = UserFollowingArtist.objects.all()
            serializer = UserFollowingArtistSerializer(following_artists, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = UserFollowingArtistSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        following_artist = get_object_or_404(UserFollowingArtist, pk=pk)
        following_artist.delete()
        return Response({"message": "UserFollowingArtist deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
