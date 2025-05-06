from django.db import models
from .Playlist import Playlist
from .Track import Track

class PlaylistTrack(models.Model):
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE)
    track = models.ForeignKey(Track, on_delete=models.CASCADE)
    position = models.PositiveIntegerField()
    is_active = models.BooleanField(default=True)
    
    class Meta:
        unique_together = ('playlist', 'track')
        ordering = ['position']
        db_table = 'playlist_track'
