from rest_framework import serializers
from api.models.Folder import Folder
from api.serializers.UserSerializer import UserSerializer


class FolderSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Folder
        fields = "__all__"