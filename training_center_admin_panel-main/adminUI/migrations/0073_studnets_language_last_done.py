# Generated by Django 3.1.8 on 2021-07-08 10:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('adminUI', '0072_auto_20210708_0724'),
    ]

    operations = [
        migrations.CreateModel(
            name='Studnets_language_last_done',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='id')),
                ('component_parent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='adminUI.componet')),
                ('parent_studnet', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='adminUI.students')),
            ],
        ),
    ]
