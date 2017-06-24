# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lake_bottom_web', '0007_live_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='page',
            name='name',
        ),
        migrations.AddField(
            model_name='page',
            name='page_name',
            field=models.SlugField(default='edit_me', unique=True),
            preserve_default=False,
        ),
    ]
