from django.test import TestCase
from ifsolve.models import Tag


class TagTestCase(TestCase):

    def test_tags_com_nomes_iguais(self):
        tag1 = Tag(nome="Logarítmo")
        tag2 = Tag(nome="Logaritmo")
        self.assertEqual(tag1, tag2)
