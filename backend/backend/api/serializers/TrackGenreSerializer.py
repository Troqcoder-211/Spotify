from rest_framework import serializers
from api.models.TrackGenre import TrackGenre

class TrackGenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrackGenre
        fields = '__all__'
