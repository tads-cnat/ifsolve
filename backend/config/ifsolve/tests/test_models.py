from django.test import TestCase
from django.utils import timezone
from django.contrib.auth.models import User
from ifsolve.models import Item, Area, Elaborador, Alternativa, Aluno, ItemAvaliacao, Avaliacao

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
        self.assertEqual(self.itemDI.tipo, 'DI')
        self.assertEqual(self.itemDI.visibilidade, 'PU')
        self.assertEqual(self.itemDI.area, self.itemDI.area)
        self.assertEqual(self.itemDI.assunto, 'Álgebra')
        self.assertEqual(self.itemDI.titulo, 'Equação quadrática')
        self.assertEqual(self.itemDI.data_publicacao, self.itemDI.data_publicacao)
        self.assertEqual(self.itemDI.texto_base, 'Lorem ipsum dolor sit amet.')
        self.assertEqual(self.itemDI.enunciado, 'Resolva a seguinte equação:')
        self.assertEqual(self.itemDI.expectativa_resposta, 'x = 2, x = -3')

    def test_item_me_creation(self):
        self.assertEqual(self.itemME.tipo, 'ME')
        self.assertEqual(self.itemME.visibilidade, 'PU')
        self.assertEqual(self.itemME.area, self.itemME.area)
        self.assertEqual(self.itemME.assunto, 'Álgebra')
        self.assertEqual(self.itemME.titulo, 'Equação quadrática')
        self.assertEqual(self.itemME.data_publicacao, self.itemME.data_publicacao)
        self.assertEqual(self.itemME.texto_base, 'Lorem ipsum dolor sit amet.')
        self.assertEqual(self.itemME.enunciado, 'Resolva a seguinte equação:')
        self.assertEqual(self.itemME.expectativa_resposta, 'A')
        self.assertEqual(self.itemME.alternativa_a, self.alternativa_a)
        self.assertEqual(self.itemME.alternativa_b, self.alternativa_b)
        self.assertEqual(self.itemME.alternativa_c, self.alternativa_c)
        self.assertEqual(self.itemME.alternativa_d, self.alternativa_d)
        self.assertEqual(self.itemME.alternativa_e, self.alternativa_e)

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
        self.assertNotEqual(itens.count(), 1)


class AvaliacaoModelTest(TestCase):

    def setUp(self):
        
        self.user = User.objects.create(
            username='elaborador',
            password='@elaborador',
            email='elaborador@example.com'
        ) 

        self.user = User.objects.create(
            username='aluno',
            password='@aluno',
            email='aluno@example.com'
        ) 

        self.elaborador = Elaborador.objects.create(
            user=self.user,
            nome_completo='Aluno da Silva',
            data_nascimento='2003-06-01',
            verificado=True
        )

        self.aluno = Aluno.objects.create(
            user=self.user,
            nome_completo='Aluno da Silva',
            data_nascimento='2003-06-01',
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

        self.avaliacao = Avaliacao.objects.create(
            visibilidade='PU',
            titulo='Prova de equação quadrática',
            elaborador=self.elaborador,
            aluno=self.aluno,
            descricao="Essa prova é um teste",
            data_inicio='2023-06-01 10:00:00',
            data_fim='2023-07-01 10:00:00',
            nota='100',
        )

        self.ItemAvaliacaoDI = ItemAvaliacao.objects.create(
            item=self.itemDI,
            avaliacao=self.avaliacao,
            numero_item='1',
            nota_item='50'
        )

        self.ItemAvaliacaoME = ItemAvaliacao.objects.create(
            item=self.itemME,
            avaliacao=self.avaliacao,
            numero_item='2',
            nota_item='50'
        )

