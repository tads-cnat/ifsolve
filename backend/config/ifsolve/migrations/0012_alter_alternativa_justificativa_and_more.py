# Generated by Django 4.1.3 on 2023-01-13 01:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ifsolve', '0011_usuario_nome_completo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='alternativa',
            name='justificativa',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='alternativa',
            name='texto',
            field=models.TextField(default=2),
            preserve_default=False,
        ),
    ]