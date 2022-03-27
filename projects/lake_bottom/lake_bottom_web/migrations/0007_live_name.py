# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ("lake_bottom_web", "0006_live_page"),
    ]

    operations = [
        migrations.AddField(
            model_name="live",
            name="name",
            field=models.CharField(default="main", max_length=255),
            preserve_default=False,
        ),
    ]
