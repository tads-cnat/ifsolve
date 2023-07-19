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
    user = User(
        username='marcelo',
        email='marcelo@ifsolve.com'
    )
    user.set_password('elaborador')
    user.save()
    elaborador = Elaborador(
        user=user,
        nome_completo='Marcelo Romulo Fernandes',
        data_nascimento='2000-06-01',
        verificado=True
    )
    elaborador.save()

    return elaborador

def create_area(codigo, nome, descricao):
    """ Creating area number st_number"""
    logging.warning("Creating area")

    area = Area(codigo=codigo, nome=nome, descricao=descricao)

    area.save()

    logging.warning("area created.")
    return area

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

    logging.warning('Creating elaborador')
    elaborador1 = create_elaborador()

    logging.warning('Creating areas')
    area1 = create_area('1.00.00.00-3','Ciências Exatas e da Terra','Ciências Exatas e da Terra')
    create_area('1.01.00.00-8', 'Matemática','Matemática')

    logging.warning('Creating itens')
    item1 = Item()
    item1.elaborador = elaborador1
    item1.tipo = 'ME'
    item1.visibilidade = 'PU'
    item1.assunto = 'Álgebra Linear'
    item1.titulo = 'Sistemas de Equações Lineares'
    item1.enunciado = 'Qual é a solução do seguinte sistema de equações lineares? 2x + 3y = 7 e 4x - 2y = 2'
    item1.alternativa_correta = 'b'
    item1.data_publicacao = '2023-07-17T06:18:27.679Z'
    item1.area = area1

    item1_alternativa_a = Alternativa(texto='x = 2 e y = 1', justificativa='x = 2 e y = 1')
    item1_alternativa_a.save()
    item1.alternativa_a = item1_alternativa_a

    item1_alternativa_b = Alternativa(texto='x = 1 e y = 2', justificativa='x = 1 e y = 2')
    item1_alternativa_b.save()
    item1.alternativa_b = item1_alternativa_b

    item1_alternativa_c = Alternativa(texto='x = -1 e y = 2', justificativa='x = -1 e y = 2')
    item1_alternativa_c.save()
    item1.alternativa_c = item1_alternativa_c

    item1_alternativa_d = Alternativa(texto='x = 3 e y = 1', justificativa='x = 3 e y = 1')
    item1_alternativa_d.save()
    item1.alternativa_d = item1_alternativa_d

    item1_alternativa_e = Alternativa(texto='x = 1 e y = -2', justificativa='x = 1 e y = -2')
    item1_alternativa_e.save()
    item1.alternativa_e = item1_alternativa_e

    item1.save()


    item2 = Item()
    item2.elaborador = elaborador1
    item2.tipo = 'ME'
    item2.visibilidade = 'PU'
    item2.assunto = 'Trigonometria'
    item2.titulo = 'Identidades Trigonométricas'
    item2.enunciado = 'Qual é a identidade trigonométrica correta para o seno ao quadrado?'
    item2.alternativa_correta = 'd'
    item2.data_publicacao = '2023-07-17T06:18:27.679Z'
    item2.area = area1

    item2_alternativa_a = Alternativa(texto='cos^2θ = 1 - sen^2θ', justificativa='cos^2θ = 1 - sen^2θ')
    item2_alternativa_a.save()
    item2.alternativa_a = item2_alternativa_a

    item2_alternativa_b = Alternativa(texto='secθ = 1/cosθ', justificativa='secθ = 1/cosθ')
    item2_alternativa_b.save()
    item2.alternativa_b = item2_alternativa_b

    item2_alternativa_c = Alternativa(texto='tanθ = senθ/cosθ', justificativa='tanθ = senθ/cosθ')
    item2_alternativa_c.save()
    item2.alternativa_c = item2_alternativa_c

    item2_alternativa_d = Alternativa(texto='1 - cos^2θ = sen^2θ', justificativa='1 - cos^2θ = sen^2θ')
    item2_alternativa_d.save()
    item2.alternativa_d = item2_alternativa_d

    item2_alternativa_e = Alternativa(texto='cotθ = cosθ/senθ', justificativa='cotθ = cosθ/senθ')
    item2_alternativa_e.save()
    item2.alternativa_e = item2_alternativa_e

    item2.save()


    item3 = Item()
    item3.elaborador = elaborador1
    item3.tipo = 'DI'
    item3.visibilidade = 'PU'
    item3.assunto = 'Geometria'
    item3.titulo = 'Áreas de Figuras Planas'
    item3.enunciado = 'Qual é a área de um triângulo com base de 8 metros e altura de 5 metros?'
    item3.expectativa_resposta = '20 metros quadrados'
    item3.data_publicacao = '2023-07-17T06:18:27.679Z'
    item3.area = area1

    item3.save()
