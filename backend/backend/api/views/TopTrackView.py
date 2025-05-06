from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.models.Track import Track
from api.serializers.TrackSerializer import TrackSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny


class TopTrackView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Lấy tham số limit từ query params, mặc định là 10
        limit = request.query_params.get('limit', 10)

        try:
            limit = int(limit)
            if limit <= 0:
                raise ValueError()
        except ValueError:
            return Response({
                "success": False,
                "message": "Tham số 'limit' phải là số nguyên dương"
            }, status=status.HTTP_400_BAD_REQUEST)

        # Lấy các track có popularity cao nhất
        top_tracks = Track.objects.order_by(
            '-created_at', '-popularity')[:limit]
        serializer = TrackSerializer(top_tracks, many=True)

        return Response({
            "success": True,
            "data": serializer.data
        }, status=status.HTTP_200_OK)
