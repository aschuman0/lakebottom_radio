from __future__ import unicode_literals

from django.db import models


# Create your models here.
class Song(models.Model):
    title = models.CharField(max_length=1027)
    artist = models.CharField(max_length=1027)
    album = models.CharField(max_length=1027)
    year = models.CharField(max_length=1027)
    slug = models.SlugField()

    def __str__(self):
        return self.title


class Show(models.Model): # TODO - Add show type with popup
    name = models.CharField(max_length=255)
    about = models.TextField()
    playlist_file = models.FileField(upload_to='/tmp', null=True)
    playlist_field = models.TextField()
    songs = models.ManyToManyField(Song)
    date_created = models.DateTimeField()
    published = models.BooleanField(default=True)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name


class Page(models.Model):
    title = models.CharField(max_length=255)
    page_body = models.TextField()
    last_updated = models.DateTimeField()
    page_name = models.SlugField(unique=True)

    def __str__(self):
        return self.title


class Live(models.Model):
    name = models.CharField(max_length=255)
    stream_url = models.CharField(max_length=1027)
    is_live = models.BooleanField(default=False)

    def __str__(self):
        return self.name
