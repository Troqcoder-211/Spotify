from rest_framework import serializers
from api.models.UserLikedTrack import UserLikedTrack

class UserLikedTrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLikedTrack
        fields = '__all__'
