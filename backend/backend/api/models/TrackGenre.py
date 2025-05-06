from django.db import models
from .Track import Track
from .Genre import Genre

class TrackGenre(models.Model):
    track = models.ForeignKey(Track, on_delete=models.CASCADE)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        unique_together = ('track', 'genre')
        db_table = 'track_genre'
