# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2019-08-20 01:33
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("lake_bottom_web", "0015_remove_song_slug"),
    ]

    operations = [
        migrations.AddField(
            model_name="song",
            name="slug",
            field=models.SlugField(default=None),
            preserve_default=False,
        ),
    ]
