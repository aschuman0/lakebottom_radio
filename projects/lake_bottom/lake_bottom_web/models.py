from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Show(models.Model):
    name = models.CharField(max_length=255)
    about = models.TextField()
    playlist_file = models.FileField(upload_to='playlists', null=True)
    date_created = models.DateTimeField()
    published = models.BooleanField(default=True)
    slug = models.SlugField(unique=True)
