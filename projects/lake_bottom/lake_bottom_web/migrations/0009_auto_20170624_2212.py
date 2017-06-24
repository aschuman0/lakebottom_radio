# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lake_bottom_web', '0008_auto_20170624_2210'),
    ]

    operations = [
        migrations.AlterField(
            model_name='page',
            name='page_name',
            field=models.SlugField(),
        ),
    ]
