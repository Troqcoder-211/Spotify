from django.db import models


class Artist(models.Model):
    artist_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    bio = models.TextField(blank=True)
    country = models.CharField(max_length=100, blank=True)
    # Upload vào folder media/artists/
    profile_picture = models.FileField(
        upload_to='artists/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'artist'

    def __str__(self):
        return self.name
