# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2019-08-20 12:39
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lake_bottom_web', '0016_song_slug'),
    ]

    operations = [
        migrations.AddField(
            model_name='show',
            name='show_type',
            field=models.CharField(choices=[('SURF', 'Surfbear Sez'), ('BOOGIE', 'Blacktail Boogie')], default='SURF', max_length=15),
        ),
    ]
