from rest_framework import serializers
from api.models.Album import Album
from api.models.Artist import Artist
from api.serializers.ArtistSerializer import ArtistSerializer


class ArtistMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['artist_id', 'name']  # Trả về id và name của nghệ sĩ


class AlbumSerializer(serializers.ModelSerializer):
    artists = ArtistMiniSerializer(many=True, read_only=True)

    class Meta:
        model = Album
        fields = "__all__"
