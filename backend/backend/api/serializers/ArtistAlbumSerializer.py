from rest_framework import serializers
from api.models.ArtistAlbum import ArtistAlbum

class ArtistAlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtistAlbum
        fields = '__all__'  
