# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2019-08-20 00:59
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lake_bottom_web', '0014_auto_20190820_0057'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='song',
            name='slug',
        ),
    ]