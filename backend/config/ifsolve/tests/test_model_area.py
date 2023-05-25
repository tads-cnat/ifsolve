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

    def test_area_com_nome_maior_que_o_nome_da_outra_area(self):
        area1 = Area(
            codigo="AR03",
            nome="Ciência",
            descricao="A Ciência abrange diversas áreas, como a Física, Química, Biologia, Astronomia, Geologia e muitas outras"
            )
        area2 = Area(
            codigo="AR04",
            nome="História",
            descricao="História nos permite analisar criticamente diferentes pontos de vista, interpretar fontes históricas, desenvolver habilidades de pesquisa e análise, e aprender com os erros e sucessos do passado para construir um futuro melhor. "
            )
        self.assertGreater(area1, area2)

    def test_area_com_nome_menor_que_o_nome_da_outra_area(self):
        area1 = Area(
            codigo="AR03",
            nome="Ciência",
            descricao="A Ciência abrange diversas áreas, como a Física, Química, Biologia, Astronomia, Geologia e muitas outras"
            )
        area2 = Area(
            codigo="AR04",
            nome="História",
            descricao="História nos permite analisar criticamente diferentes pontos de vista, interpretar fontes históricas, desenvolver habilidades de pesquisa e análise, e aprender com os erros e sucessos do passado para construir um futuro melhor. "
            )
        self.assertLess(area2, area1)
