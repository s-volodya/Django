# Generated by Django 2.2.12 on 2021-05-14 10:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminUI', '0052_message_files'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='delete_from',
            field=models.BooleanField(default=False, null=True),
        ),
        migrations.AddField(
            model_name='message',
            name='delete_to',
            field=models.BooleanField(default=False, null=True),
        ),
    ]
