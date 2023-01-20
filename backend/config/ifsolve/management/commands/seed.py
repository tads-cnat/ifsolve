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


def create_student(st_number):
    """ Creating student number st_number"""
    logging.info(f"Creating student {st_number:05d}")

    username = f'aluno{st_number:05d}'
    email = f'{username}@email.com'
    password = f'{username}@'
    birth_date = datetime.date(
        random.randint(2000, 2020),
        random.randint(1, 12),
        random.randint(1, 28)
    )

    user = User.objects.create_user(
        username=username,
        password=password,
        email=email,
    )
    student = Aluno()
    student.user = user
    student.data_nascimento = birth_date

    student.save()
    logging.info(f"{student} student created.")
    return student


def create_setter(st_number):
    """ Creating setter number st_number"""
    logging.info(f"Creating setter {st_number:05d}")

    username = f'elaborador{st_number:05d}'
    email = f'{username}@email.com'
    password = f'{username}@'
    birth_date = datetime.date(
        random.randint(1980, 2000),
        random.randint(1, 12),
        random.randint(1, 28)
    )

    user = User.objects.create_user(
        username=username,
        password=password,
        email=email,
    )
    setter = Elaborador()
    setter.user = user
    setter.data_nascimento = birth_date
    setter.verificado = True

    setter.save()
    logging.info(f"{setter} setter created.")
    return setter


def create_area(st_number):
    """ Creating area number st_number"""
    logging.info(f"Creating area {st_number:05d}")

    area = Area()
    area.codigo = f'{st_number:05d}'
    area.nome = f'area{st_number:05d}'
    area.descricao = f'descricao{st_number:05d}'
    tem_area_mae = random.choice(["0", "1"])

    if (tem_area_mae == "1" and len(Area.objects.all()) > 0):
        area_mae = random.choice(Area.objects.all())
        area.subarea_de = area_mae

    area.save()
    logging.info(f"{area} area created.")
    return area


def create_tag(st_number):
    """ Creating tag number st_number"""
    logging.info(f"Creating tag {st_number:05d}")

    tag = Tag()
    tag.nome = f'tag{st_number:05d}'
    tag.save()
    logging.info(f"{tag} tag created.")
    return tag


def create_alternativa(st_number):
    """ Creating alternativa number st_number"""
    logging.info(f"Creating alternativa {st_number:05d}")

    alternativa = Alternativa()
    alternativa.texto = f'alternativa{st_number:05d}'
    alternativa.justificativa = f'justificativa{st_number:05d}'
    alternativa.save()
    logging.info(f"{alternativa} alternativa created.")
    return alternativa


def create_item(st_number):
    """ Creating item number st_number"""
    logging.info(f"Creating item {st_number:05d}")

    item = Item()
    lista_elaboradores = Elaborador.objects.all()
    qtd_co_elaboradores = random.randint(0, len(lista_elaboradores) - 1)
    lista_areas = Area.objects.all()
    lista_tags = Tag.objects.all()
    lista_alternativas = Alternativa.objects.all()
    visibilidade = random.choice(["0", "1", "2"])
    tem_texto_base = random.choice(["0", "1"])
    tipo = random.choice(["ME", "DI"])

    item.area = random.choice(lista_areas)
    item.titulo = f'item{st_number:05d}'
    item.assunto = f'assunto{st_number:05d}'
    item.data_publicacao = datetime.datetime(
        random.randint(2000, 2021),
        random.randint(1, 12),
        random.randint(1, 28),
        random.randint(1, 23),
        random.randint(1, 59),
        random.randint(1, 59)
    )

    item.enunciado = f'enunciado{st_number:05d}'
    item.tipo = tipo

    if (tem_texto_base == "1"):
        item.texto_base = f'texto_base{st_number:05d}'

    # item PÚBLICO
    if (visibilidade == "0"):
        item.visibilidade = "PU"

    # item PRIVADO
    elif (visibilidade == "1"):
        item.visibilidade = "PR"

    # item INATIVO
    else:
        item.visibilidade = "IN"

    item.save()

    # Quantidade de tags que o Item terá
    qtd_tags = random.randint(0, 5)
    if (qtd_tags > 0):
        for i in range(qtd_tags):
            tag = random.choice(lista_tags)
            item.tags.add(tag)

    # Discursiva
    if (tipo == "DI"):
        item.expectativa_resposta = f'expectativa_resposta{st_number:05d}'

    # Múltipla escolha
    else:
        alternativa_a = random.choice(lista_alternativas)
        alternativa_b = random.choice(lista_alternativas)
        alternativa_c = random.choice(lista_alternativas)
        alternativa_d = random.choice(lista_alternativas)
        alternativa_e = random.choice(lista_alternativas)

        while (
            len(Item.objects.filter(alternativa_a=alternativa_a)) > 0
            or
            len(Item.objects.filter(alternativa_b=alternativa_a)) > 0
            or
            len(Item.objects.filter(alternativa_c=alternativa_a)) > 0
            or
            len(Item.objects.filter(alternativa_d=alternativa_a)) > 0
            or
            len(Item.objects.filter(alternativa_e=alternativa_a)) > 0
        ):
            alternativa_a = random.choice(lista_alternativas)

        while (
            len(Item.objects.filter(alternativa_a=alternativa_b)) > 0
            or
            len(Item.objects.filter(alternativa_b=alternativa_b)) > 0
            or
            len(Item.objects.filter(alternativa_c=alternativa_b)) > 0
            or
            len(Item.objects.filter(alternativa_d=alternativa_b)) > 0
            or
            len(Item.objects.filter(alternativa_e=alternativa_b)) > 0
            or
            alternativa_b == alternativa_a
        ):
            alternativa_b = random.choice(lista_alternativas)

        while (
            len(Item.objects.filter(alternativa_a=alternativa_c)) > 0
            or
            len(Item.objects.filter(alternativa_b=alternativa_c)) > 0
            or
            len(Item.objects.filter(alternativa_c=alternativa_c)) > 0
            or
            len(Item.objects.filter(alternativa_d=alternativa_c)) > 0
            or
            len(Item.objects.filter(alternativa_e=alternativa_c)) > 0
            or
            alternativa_c == alternativa_a 
            or
            alternativa_c == alternativa_b
        ):
            alternativa_c = random.choice(lista_alternativas)

        while (
            len(Item.objects.filter(alternativa_a=alternativa_d)) > 0
            or
            len(Item.objects.filter(alternativa_b=alternativa_d)) > 0
            or
            len(Item.objects.filter(alternativa_c=alternativa_d)) > 0
            or
            len(Item.objects.filter(alternativa_d=alternativa_d)) > 0
            or
            len(Item.objects.filter(alternativa_e=alternativa_d)) > 0
            or
            alternativa_d == alternativa_a
            or
            alternativa_d == alternativa_b
            or
            alternativa_d == alternativa_c
        ):
            alternativa_d = random.choice(lista_alternativas)

        while (
            len(Item.objects.filter(alternativa_a=alternativa_e)) > 0
            or
            len(Item.objects.filter(alternativa_b=alternativa_e)) > 0
            or
            len(Item.objects.filter(alternativa_c=alternativa_e)) > 0
            or
            len(Item.objects.filter(alternativa_d=alternativa_e)) > 0
            or
            len(Item.objects.filter(alternativa_e=alternativa_e)) > 0
            or
            alternativa_e == alternativa_a
            or
            alternativa_e == alternativa_b
            or
            alternativa_e == alternativa_c
            or
            alternativa_e == alternativa_d
        ):
            alternativa_e = random.choice(lista_alternativas)

        item.alternativa_a = alternativa_a
        item.alternativa_b = alternativa_b
        item.alternativa_c = alternativa_c
        item.alternativa_d = alternativa_d
        item.alternativa_e = alternativa_e
        item.alternativa_correta = random.choice(['a', 'b', 'c', 'd', 'e'])


    elaborador_item = random.choice(lista_elaboradores)
    while (hasattr(elaborador_item, "item")):
        elaborador_item = random.choice(lista_elaboradores)

    item.elaborador = elaborador_item
    co_elaboradores_adicionados = []
    co_elaboradores_adicionados.append(elaborador_item)

    for i in range(qtd_co_elaboradores):
        co_elaborador = random.choice(lista_elaboradores)
        if (co_elaborador not in co_elaboradores_adicionados):
            co_elaboradores_adicionados.append(co_elaborador)
            item.co_elaboradores.add(co_elaborador)

    item.save()
    logging.info(f"{item} item created.")
    return item


def create_resposta(st_number):
    """ Creating resposta number st_number"""
    logging.info(f"Creating resposta {st_number:05d}")

    resposta = Resposta()
    resposta.aluno = random.choice(Aluno.objects.all())
    resposta.item = random.choice(Item.objects.all())
    if(resposta.item.tipo == "OB"):
        resposta.resposta = random.choice(["a", "b", "c", "d", "e"])

    else:
        resposta.resposta = f'Minha_Resposta_{st_number:05d}'

    resposta.nota_obtida = random.randint(0, 100)
    resposta.data_hora = datetime.datetime(
        random.randint(2000, 2021),
        random.randint(1, 12),
        random.randint(1, 28),
        random.randint(1, 23),
        random.randint(1, 59),
        random.randint(1, 59)
    )
    resposta.save()


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

    # Creating 5 students
    students_qtd = 5
    logging.warning(f'Creating {students_qtd:d} students')
    for i in range(students_qtd):
        create_student(i+1)

    # Creating 20 setters
    setter_qtd = 20
    logging.warning(f'Creating {setter_qtd:d} setters')
    for i in range(setter_qtd):
        create_setter(i+1)

    # Creating 5 areas
    area_qtd = 5
    logging.warning(f'Creating {area_qtd:d} areas')
    for i in range(area_qtd):
        create_area(i+1)

    # Creating 10 tags
    tag_qtd = 10
    logging.warning(f'Creating {tag_qtd:d} tags')
    for i in range(tag_qtd):
        create_tag(i+1)

    # Creating 100 alternativas (considerar criar muitas
    # para diminuir conflito em itens com a mesma alternativa)
    alternativa_qtd = 100
    logging.warning(f'Creating {alternativa_qtd:d} alternativas')
    for i in range(alternativa_qtd):
        create_alternativa(i+1)

    # Creating 20 itens
    item_qtd = 20
    logging.warning(f'Creating {item_qtd:d} itens')
    for i in range(item_qtd):
        create_item(i+1)

    # Creating 15 respostas
    resposta_qtd = 15
    logging.warning(f'Creating {resposta_qtd:d} respostas')
    for i in range(resposta_qtd):
        create_resposta(i+1)