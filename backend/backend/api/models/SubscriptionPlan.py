from django.db import models

class SubscriptionPlan(models.Model):
    name = models.CharField(max_length=50)  # Ví dụ: Individual, Family
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration_days = models.IntegerField()  # Ví dụ: 30, 60 ngày
    description = models.TextField(blank=True)
    
    class Meta:
        db_table = 'plan'
