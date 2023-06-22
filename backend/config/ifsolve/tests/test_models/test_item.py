from django.test import TestCase
from django.utils import timezone
from django.contrib.auth.models import User
from ifsolve.models import Item, Area, Elaborador, Alternativa


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
            area=self.area,
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
            alternativa_a=self.alternativa_a,
            alternativa_b=self.alternativa_b,
            alternativa_c=self.alternativa_c,
            alternativa_d=self.alternativa_d,
            alternativa_e=self.alternativa_e,
        )

    def test_item_di_create(self):
        item = Item.objects.get(id=self.itemDI.id)
        self.assertEqual(self.itemDI.tipo, item.tipo)
        self.assertEqual(self.itemDI.visibilidade, item.visibilidade)
        self.assertEqual(self.itemDI.area, item.area)
        self.assertEqual(self.itemDI.assunto, item.assunto)
        self.assertEqual(self.itemDI.titulo, item.titulo)
        self.assertEqual(self.itemDI.data_publicacao, item.data_publicacao)
        self.assertEqual(self.itemDI.texto_base, item.texto_base)
        self.assertEqual(self.itemDI.enunciado, item.enunciado)
        self.assertEqual(self.itemDI.expectativa_resposta, item.expectativa_resposta)

    def test_item_me_create(self):
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

    def test_item_update(self):
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

    def test_area_read(self):
        # Cria mais itens para listar
        Item.objects.create(
            elaborador=self.itemDI.elaborador,
            tipo='DI',
            visibilidade='PU',
            area=self.itemDI.area,
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
            area=self.itemDI.area,
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

    def test_item_delete(self):
        # Remove o item criado no setUp
        self.itemDI.delete()

        # Verifica se o item foi removido corretamente
        itens = Item.objects.all()
        self.assertEqual(itens.count(), 1)
