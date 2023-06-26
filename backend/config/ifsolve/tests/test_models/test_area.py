from django.test import TestCase
from ifsolve.models import Area


class AreaModelTest(TestCase):
    def setUp(self):
        self.area = Area.objects.create(
            codigo="0020",
            nome="Ciências exatas e da terra",
            descricao="Ciências Exatas é o campo de estudo que envolve fórmulas, dados e raciocínio lógico."
        )

    def test_area_create(self):
        area = Area.objects.filter(codigo="0020")
        self.assertTrue(area.exists())

    def test_area_update(self):
        self.area.codigo = "0021"
        self.area.nome = "NovoNome"
        self.area.descricao = "NovaDescricao"
        self.area.save()

        area = Area.objects.get(codigo="0021")
        self.assertEqual(area.nome, "NovoNome")
        self.assertEqual(area.descricao, "NovaDescricao")

    def test_area_delete(self):
        area = Area.objects.filter(codigo="020")
        area.delete()
        self.assertFalse(area.exists())
