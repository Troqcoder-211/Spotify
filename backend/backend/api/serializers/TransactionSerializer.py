from rest_framework import serializers
from api.models.Transaction import Transaction

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
        read_only_fields = ['created_at', 'paid_at']