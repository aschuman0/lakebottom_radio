from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Show(models.Model):
    name = models.CharField(max_length=255)
    about = models.TextField()
    playlist_file = models.FileField(upload_to='playlists', null=True)
    date_created = models.DateTimeField()
    published = models.BooleanField(default=True)
    slug = models.SlugField(unique=True)

class Page(models.Model):
    title = models.CharField(max_length=255)
    page_body = models.TextField()
    last_updated = models.DateTimeField()
    page_name = models.SlugField(unique=True)

class Live(models.Model):
    name = models.CharField(max_length=255)
    stream_url = models.CharField(max_length=1027)
    is_live = models.BooleanField(default=False)
