from rest_framework import serializers
from api.models.UserFollowingArtist import UserFollowingArtist

class UserFollowingArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollowingArtist
        fields = '__all__'
