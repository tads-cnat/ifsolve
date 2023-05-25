from django.test import TestCase
from ifsolve.models import Area


class AreaTestCase(TestCase):

    def test_area_com_nomes_e_codigos_iguais(self):
        area1 = Area(
            codigo="AR01",
            nome="Matemática",
            descricao="A matemática é uma área do conhecimento que lida com números, formas, quantidades e padrões."
            )
        area2 = Area(
            codigo="AR01",
            nome="Matemática",
            descricao="O português é uma língua falada por milhões de pessoas ao redor do mundo. É uma língua românica, derivada do latim, assim como o espanhol, o francês e o italiano. "
            )
        self.assertEqual(area1, area2)

    def test_area_com_nomes_iguais_e_codigos_diferentes(self):
        area1 = Area(
            codigo="AR01",
            nome="Matemática",
            descricao="A matemática é uma área do conhecimento que lida com números, formas, quantidades e padrões."
            )
        area2 = Area(
            codigo="AR02",
            nome="Matemática",
            descricao="O português é uma língua falada por milhões de pessoas ao redor do mundo. É uma língua românica, derivada do latim, assim como o espanhol, o francês e o italiano. "
            )
        self.assertEqual(area1, area2)

    def test_area_com_nomes_diferentes_e_codigos_iguais(self):
        area1 = Area(
            codigo="AR01",
            nome="Matemática",
            descricao="A matemática é uma área do conhecimento que lida com números, formas, quantidades e padrões."
            )
        area2 = Area(
            codigo="AR01",
            nome="Português",
            descricao="O português é uma língua falada por milhões de pessoas ao redor do mundo. É uma língua românica, derivada do latim, assim como o espanhol, o francês e o italiano. "
            )
        self.assertEqual(area1, area2)
