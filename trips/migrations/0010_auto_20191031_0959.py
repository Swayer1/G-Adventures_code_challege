# Generated by Django 2.2.5 on 2019-10-31 07:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0009_auto_20191029_1950'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='service',
            options={'ordering': ['name']},
        ),
    ]
