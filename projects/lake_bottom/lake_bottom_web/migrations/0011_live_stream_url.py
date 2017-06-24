# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lake_bottom_web', '0010_auto_20170624_2212'),
    ]

    operations = [
        migrations.AddField(
            model_name='live',
            name='stream_url',
            field=models.CharField(default='none', max_length=1027),
            preserve_default=False,
        ),
    ]
