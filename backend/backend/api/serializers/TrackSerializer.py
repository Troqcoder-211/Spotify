from rest_framework import serializers
from api.models.Track import Track
from api.models.Artist import Artist

# Serializer cho Artist (chỉ chọn các trường cần thiết)


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['artist_id', 'name']  # hoặc thêm các trường khác nếu cần


class TrackSerializer(serializers.ModelSerializer):
    artists = ArtistSerializer(many=True, read_only=True)

    class Meta:
        model = Track
        fields = '__all__'

    def create(self, validated_data):
        track = super().create(validated_data)
        # Nếu có file_path và chưa có preview_url thì gán luôn
        if track.file_path and not track.preview_url:
            # Hoặc chỉnh sửa link nếu bạn tạo preview riêng
            track.preview_url = track.file_path.url
            track.save()
        return track
