# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("lake_bottom_web", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="show",
            name="user",
            field=models.OneToOneField(
                null=True,
                blank=True,
                to=settings.AUTH_USER_MODEL,
                on_delete=models.CASCADE,
            ),
        ),
    ]
