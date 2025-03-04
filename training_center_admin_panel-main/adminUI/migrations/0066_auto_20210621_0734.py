# Generated by Django 3.1.8 on 2021-06-21 07:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminUI', '0065_teachers_sigun_in_one'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='admins',
            name='sigun_in_one',
        ),
        migrations.RemoveField(
            model_name='teachers',
            name='sigun_in_one',
        ),
        migrations.AddField(
            model_name='admins',
            name='sign_in_one',
            field=models.BooleanField(default=False, verbose_name='sign_in_one'),
        ),
        migrations.AddField(
            model_name='teachers',
            name='sign_in_one',
            field=models.BooleanField(default=False, verbose_name='sign_in_one'),
        ),
    ]
