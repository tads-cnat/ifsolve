from django.test import TestCase
from ifsolve.models import Tag


class TagTestCase(TestCase):

    def test_tags_com_nomes_iguais(self):
        tag1 = Tag(nome="Logaritmo")
        tag2 = Tag(nome="Logaritmo")
        self.assertEqual(tag1, tag2)

    def test_tags_com_nomes_diferentes(self):
        tag1 = Tag(nome="Logarítmo")
        tag2 = Tag(nome="Logaritmo")
        self.assertNotEqual(tag1, tag2)

    def test_tag_menor_que_outra(self):
        tag1 = Tag(nome="Algoritmo")
        tag2 = Tag(nome="Logaritmo")
        self.assertLess(tag1, tag2)

    def test_tag_maior_que_outra(self):
        tag1 = Tag(nome="Logaritmo")
        tag2 = Tag(nome="Algoritmo")
        self.assertGreater(tag1, tag2)
