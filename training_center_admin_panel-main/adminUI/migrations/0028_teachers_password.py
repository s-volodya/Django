# Generated by Django 2.2.12 on 2021-04-20 09:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminUI', '0027_groups_isarchived'),
    ]

    operations = [
        migrations.AddField(
            model_name='teachers',
            name='password',
            field=models.CharField(default=123456789, max_length=20, verbose_name='password'),
        ),
    ]
