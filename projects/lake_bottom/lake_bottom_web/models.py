from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Show(models.Model):
    name = models.CharField(max_length=255)
    about = models.TextField()
    slug = models.SlugField(unique=True)
    # add further fields for playlist, notes, etc

