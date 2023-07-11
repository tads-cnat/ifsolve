# elabora/ifsolve/management/commands/seed.py
import datetime
import logging
import random

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from ifsolve.models import (Alternativa, Aluno, Area, Elaborador, Item,
                            Resposta, Tag)

# python manage.py seed --mode=refresh

""" Clear all data and creates Base elements """
MODE_REFRESH = 'refresh'

""" Clear all data and do not create any object """
MODE_CLEAR = 'clear'


class Command(BaseCommand):
    help = "seed database for testing and development."

    def add_arguments(self, parser):
        parser.add_argument('--mode', type=str, help="Mode")

    def handle(self, *args, **options):
        self.stdout.write('seeding data...')

        
        logging.basicConfig(encoding='utf-8', level=logging.DEBUG)
        verbosity = options['verbosity']
        print(verbosity, type(verbosity))
        if verbosity == 0:
            logging.basicConfig(encoding='utf-8', level=logging.ERROR)
        elif verbosity == 1:
            logging.basicConfig(encoding='utf-8', level=logging.WARNING)
        elif verbosity == 2:
            logging.basicConfig(encoding='utf-8', level=logging.INFO)
        elif verbosity == 3:
            logging.basicConfig(encoding='utf-8', level=logging.DEBUG)
        
        
        run_seed(self, options['mode'])
        self.stdout.write('done.')


def clear_data():
    """Deletes all the table data"""

    logging.warning("Delete respostas instances")
    Resposta.objects.all().delete()

    logging.warning("Delete students instances")
    for aluno in Aluno.objects.all():
        aluno.user.delete()
    Aluno.objects.all().delete()

    logging.warning("Delete setters instances")
    for elaborador in Elaborador.objects.all():
        elaborador.user.delete()
    Elaborador.objects.all().delete()

    logging.warning("Delete all users")
    User.objects.all().delete()

    logging.warning("Delete areas instances")
    Area.objects.all().delete()

    logging.warning("Delete tags instances")
    Tag.objects.all().delete()

    logging.warning("Delete alternativas instances")
    Alternativa.objects.all().delete()

    logging.warning("Delete itens instances")
    for item in Item.objects.all():
        item.co_elaboradores.clear()
        item.tags.clear()
    Item.objects.all().delete()


def create_admin_user():
    user = User(username='admin')
    user.email = 'admin@email.com'
    user.is_staff = True
    user.is_superuser = True
    user.set_password('admin')
    user.save()

def create_elaborador():
    user = User.objects.create(
        username='elaborador',
        password='elaborador',
        email='elaborador@example.com'
    )  
    user.save()
    elaborador = Elaborador.objects.create(
        user=user,
        nome_completo='Elaborador da Silva',
        data_nascimento='2000-06-01',
        verificado=True
    )
    elaborador.save()


def run_seed(self, mode):
    """ Seed database based on mode

    :param mode: refresh / clear
    :return:
    """
    # Clear data from tables
    clear_data()
    if mode == MODE_CLEAR:
        return

    # Creating admin user
    logging.warning('Creating admin user')
    create_admin_user()
    create_elaborador()