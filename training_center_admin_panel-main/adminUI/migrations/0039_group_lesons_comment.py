# Generated by Django 2.2.12 on 2021-04-30 12:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminUI', '0038_payment_student_send_mail'),
    ]

    operations = [
        migrations.AddField(
            model_name='group_lesons',
            name='comment',
            field=models.CharField(max_length=100, null=True, verbose_name='comment'),
        ),
    ]
