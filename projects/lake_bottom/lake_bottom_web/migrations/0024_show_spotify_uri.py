# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2020-02-18 22:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lake_bottom_web', '0023_show_songs'),
    ]

    operations = [
        migrations.AddField(
            model_name='show',
            name='spotify_uri',
            field=models.TextField(default=None),
            preserve_default=False,
        ),
    ]