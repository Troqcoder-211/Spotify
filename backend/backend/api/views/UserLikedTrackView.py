from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from api.models.UserLikedTrack import UserLikedTrack
from api.serializers.UserLikedTrackSerializer import UserLikedTrackSerializer

class UserLikedTrackView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        if pk:
            liked_track = get_object_or_404(UserLikedTrack, pk=pk)
            serializer = UserLikedTrackSerializer(liked_track)
        else:
            liked_tracks = UserLikedTrack.objects.all()
            serializer = UserLikedTrackSerializer(liked_tracks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = UserLikedTrackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        liked_track = get_object_or_404(UserLikedTrack, pk=pk)
        liked_track.delete()
        return Response({"message": "UserLikedTrack deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
