# Generated by Django 2.2.12 on 2021-04-19 09:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminUI', '0026_students_activ'),
    ]

    operations = [
        migrations.AddField(
            model_name='groups',
            name='isArchived',
            field=models.BooleanField(default=False, verbose_name='isArchived'),
        ),
    ]
