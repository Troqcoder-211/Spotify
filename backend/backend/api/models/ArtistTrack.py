from django.db import models
from .Artist import Artist
from .Track import Track

class ArtistTrack(models.Model):
    ROLE_CHOICES = [
        ('primary', 'Primary Artist'),
        ('featured', 'Featured Artist'),
    ]
    
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    track = models.ForeignKey(Track, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='primary')
    is_active = models.BooleanField(default=True)
    
    class Meta:
        unique_together = ('artist', 'track')
        db_table = 'artist_track'
