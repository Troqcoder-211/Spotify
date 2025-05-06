from django.db import models
from .Folder import Folder

class Playlist(models.Model):
    playlist_id = models.AutoField(primary_key=True)
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE, null=True, blank=True)
    description = models.TextField(blank=True)
    cover_img_url = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'playlist'

    def __str__(self):
        return f"Playlist {self.playlist_id}"

