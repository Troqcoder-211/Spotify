from django.db import models
from .Album import Album
from .Artist import Artist

class ArtistAlbum(models.Model):
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        unique_together = ('artist', 'album') 
        db_table = 'artist_album'

