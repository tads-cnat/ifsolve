from django.test import TestCase
from django.utils import timezone
from django.contrib.auth.models import User
from ifsolve.models import Item, Area, Elaborador, Alternativa

# Create your tests here.

class ItemModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='elaborador',
            password='el4b0r4d0r',
            email='elaborador@example.com'
        ) 

        self.elaborador = Elaborador.objects.create(
            user=self.user,
            nome_completo='Elaborador da Silva',
            data_nascimento='2000-06-01',
            verificado=True
        )

        self.area = Area.objects.create(
            codigo='001',
            nome='Matemática',
            descricao='Área relacionada a cálculos e números'
        )

        self.alternativa_a = Alternativa.objects.create(
            texto='Texto A',
            justificativa='Justificativa A',
        )
        self.alternativa_b = Alternativa.objects.create(
            texto='Texto B',
            justificativa='Justificativa B',
        )
        self.alternativa_c = Alternativa.objects.create(
            texto='Texto C',
            justificativa='Justificativa C',
        )
        self.alternativa_d = Alternativa.objects.create(
            texto='Texto D',
            justificativa='Justificativa E',
        )
        self.alternativa_e = Alternativa.objects.create(
            texto='Texto E',
            justificativa='Justificativa E',
        )

        self.itemDI = Item.objects.create(
            elaborador=self.elaborador,
            tipo='DI',
            visibilidade='PU',
            area= self.area,
            assunto='Álgebra',
            titulo='Equação quadrática',
            data_publicacao=timezone.now(),
            texto_base='Lorem ipsum dolor sit amet.',
            enunciado='Resolva a seguinte equação:',
            expectativa_resposta='x = 2, x = -3',
        )
        self.itemME = Item.objects.create(
            elaborador=self.elaborador,
            tipo='ME',
            visibilidade='PU',
            area= self.area,
            assunto='Álgebra',
            titulo='Equação quadrática',
            data_publicacao=timezone.now(),
            texto_base='Lorem ipsum dolor sit amet.',
            enunciado='Resolva a seguinte equação:',
            expectativa_resposta='A',
            alternativa_a = self.alternativa_a,
            alternativa_b = self.alternativa_b,
            alternativa_c = self.alternativa_c,
            alternativa_d = self.alternativa_d,
            alternativa_e = self.alternativa_e,
        )

    def test_item_di_creation(self):
        item = Item.objects.get(id=self.itemDI.id)
        self.assertEqual(self.itemDI.tipo, item.tipo)
        self.assertEqual(self.itemDI.visibilidade, item.visibilidade)
        self.assertEqual(self.itemDI.area, item.area)
        self.assertEqual(self.itemDI.assunto, item.assunto)
        self.assertEqual(self.itemDI.titulo, item.assunto)
        self.assertEqual(self.itemDI.data_publicacao, item.data_publicacao)
        self.assertEqual(self.itemDI.texto_base, item.texto_base)
        self.assertEqual(self.itemDI.enunciado, item.enunciado)
        self.assertEqual(self.itemDI.expectativa_resposta, item.enunciado)

    def test_item_me_creation(self):
        item = Item.objects.get(id=self.itemME.id)
        self.assertEqual(self.itemME.tipo, item.tipo)
        self.assertEqual(self.itemME.visibilidade, item.visibilidade)
        self.assertEqual(self.itemME.area, item.area)
        self.assertEqual(self.itemME.assunto, item.assunto)
        self.assertEqual(self.itemME.titulo, item.titulo)
        self.assertEqual(self.itemME.data_publicacao, item.data_publicacao)
        self.assertEqual(self.itemME.texto_base, item.texto_base)
        self.assertEqual(self.itemME.enunciado, item.enunciado)
        self.assertEqual(self.itemME.expectativa_resposta, item.expectativa_resposta)
        self.assertEqual(self.itemME.alternativa_a, item.alternativa_a)
        self.assertEqual(self.itemME.alternativa_b, item.alternativa_b)
        self.assertEqual(self.itemME.alternativa_c, item.alternativa_c)
        self.assertEqual(self.itemME.alternativa_d, item.alternativa_d)
        self.assertEqual(self.itemME.alternativa_e, item.alternativa_e)
        

    def test_item_edit(self):
        # Edita os atributos do item
        self.itemDI.visibilidade = 'PR'
        self.itemDI.assunto = 'Geometria'
        self.itemDI.titulo = 'Geometria plana'
        self.itemDI.texto_base = 'Lorem sit amet ipsum dolor.'
        self.itemDI.enunciado = 'Lorem sit amet.'
        self.itemDI.expectativa_resposta = 'Lorem sit amet.'
        self.itemDI.save()

        # Verifica se as alterações foram salvas corretamente
        updated_item = Item.objects.get(id=self.itemDI.id)
        self.assertEqual(updated_item.visibilidade, 'PR')
        self.assertEqual(updated_item.assunto, 'Geometria')
        self.assertEqual(updated_item.titulo, 'Geometria plana')
        self.assertEqual(updated_item.texto_base, 'Lorem sit amet ipsum dolor.')
        self.assertEqual(updated_item.enunciado, 'Lorem sit amet.')
        self.assertEqual(updated_item.expectativa_resposta, 'Lorem sit amet.')

    def test_area_listing(self):
        # Cria mais itens para listar
        Item.objects.create(
            elaborador=self.itemDI.elaborador,
            tipo='DI',
            visibilidade='PU',
            area= self.itemDI.area,
            assunto='Álgebra',
            titulo='Equação quadrática',
            data_publicacao=timezone.now(),
            texto_base='Lorem ipsum dolor sit amet.',
            enunciado='Resolva a seguinte equação:',
            expectativa_resposta='x = 2, x = -3',
        )

        Item.objects.create(
            elaborador=self.itemDI.elaborador,
            tipo='DI',
            visibilidade='PU',
            area= self.itemDI.area,
            assunto='Álgebra',
            titulo='Equação quadrática',
            data_publicacao=timezone.now(),
            texto_base='Lorem ipsum dolor sit amet.',
            enunciado='Resolva a seguinte equação:',
            expectativa_resposta='x = 2, x = -3',
        )

        # Verifica se todas os itens são listadas corretamente
        itens = Item.objects.all()
        self.assertEqual(itens.count(), 4)  # Contando com o item criado no setUp

    def test_item_deletion(self):
        # Remove o item criado no setUp
        self.itemDI.delete()

        # Verifica se o item foi removido corretamente
        itens = Item.objects.all()
        self.assertEqual(itens.count(), 1)


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
