from rest_framework import serializers
from api.models.PlaylistTrack import PlaylistTrack

class PlaylistTrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaylistTrack
        fields = '__all__'
