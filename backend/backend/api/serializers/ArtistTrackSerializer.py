from rest_framework import serializers
from api.models.ArtistTrack import ArtistTrack
from api.serializers.ArtistSerializer import ArtistSerializer


class ArtistTrackSerializer(serializers.ModelSerializer):
    artist = ArtistSerializer(read_only=True)

    class Meta:
        model = ArtistTrack
        fields = ['artist', 'role']
