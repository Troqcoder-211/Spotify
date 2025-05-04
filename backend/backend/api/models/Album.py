from django.db import models
from .Artist import Artist


class Album(models.Model):
    album_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    release_date = models.DateField()
    cover_img_url = models.ImageField(
        upload_to='albums/', blank=True, null=True)
    is_active = models.BooleanField(default=True)

    # Quan hệ nhiều-nhiều với Artist qua bảng trung gian ArtistAlbum
    artists = models.ManyToManyField(
        Artist, through='ArtistAlbum', related_name='albums')

    def __str__(self):
        return self.title
