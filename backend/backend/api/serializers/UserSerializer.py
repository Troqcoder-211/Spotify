from rest_framework import serializers
from api.models.User import User
from django.contrib.auth.models import Group


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        validated_data['is_active'] = True  # Đảm bảo user luôn active
        user = User.objects.create_user(**validated_data)
        return user
