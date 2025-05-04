from rest_framework import serializers
from api.models.UserLikedAlbum import UserLikedAlbum

class UserLikedAlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLikedAlbum
        fields = '__all__'
