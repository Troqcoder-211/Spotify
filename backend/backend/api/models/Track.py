from django.db import models
from .Album import Album
from .Artist import Artist
from django.utils import timezone


class Track(models.Model):
    track_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    album = models.ForeignKey(
        Album, on_delete=models.CASCADE, null=True, blank=True)
    duration = models.IntegerField(help_text="Duration in seconds")
    file_path = models.FileField(upload_to='tracks/', null=True, blank=True)
    img_path = models.FileField(upload_to='imgs/', null=True, blank=True)
    video_path = models.FileField(upload_to='vids/', null=True, blank=True)
    track_number = models.PositiveIntegerField(null=True, blank=True)
    popularity = models.PositiveIntegerField(default=0)
    preview_url = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    artists = models.ManyToManyField(
        Artist,
        through='ArtistTrack',
        related_name='tracks'
    )

    class Meta:
        db_table = 'track'
        ordering = ['-created_at']

    def __str__(self):
        return self.title
