# Generated by Django 3.2.4 on 2023-05-29 14:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0011_auto_20230526_1155'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.CharField(default=None, max_length=15, null=True),
        ),
        migrations.DeleteModel(
            name='Category',
        ),
    ]
