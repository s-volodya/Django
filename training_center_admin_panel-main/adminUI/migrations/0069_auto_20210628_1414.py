# Generated by Django 3.1.8 on 2021-06-28 14:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminUI', '0068_auto_20210628_0718'),
    ]

    operations = [
        migrations.AlterField(
            model_name='students',
            name='address',
            field=models.CharField(max_length=45, verbose_name='addres'),
        ),
    ]
