# Generated by Django 3.1.5 on 2021-03-03 16:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminUI', '0007_auto_20210302_1240'),
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='id')),
                ('name', models.CharField(default=True, max_length=45, verbose_name='room_name')),
                ('adres', models.CharField(default=True, max_length=45, verbose_name='adress')),
                ('number_of_seats', models.CharField(default=True, max_length=10, verbose_name='Number_of_seats')),
                ('computers', models.CharField(default=True, max_length=10, verbose_name='comp')),
                ('specifications', models.TextField(default=True, max_length=2500, verbose_name='Specifications')),
                ('comments', models.TextField(default=True, max_length=2500, verbose_name='comments')),
            ],
            options={
                'verbose_name': 'Room',
                'verbose_name_plural': 'Rooms',
            },
        ),
    ]
