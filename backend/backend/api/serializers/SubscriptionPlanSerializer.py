from rest_framework import serializers
from api.models.SubscriptionPlan import SubscriptionPlan

class SubscriptionPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionPlan
        fields = '__all__'