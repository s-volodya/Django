# Generated by Django 2.2.12 on 2021-04-23 14:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminUI', '0032_language_isarchived'),
    ]

    operations = [
        migrations.AddField(
            model_name='teachers',
            name='pictures_teacher',
            field=models.ImageField(null=True, upload_to=''),
        ),
    ]
