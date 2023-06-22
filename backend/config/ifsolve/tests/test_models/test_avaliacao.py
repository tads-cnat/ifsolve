from django.test import TestCase
from django.utils import timezone
from django.contrib.auth.models import User
from ifsolve.models import Item, Area, Elaborador, Alternativa, Aluno, ItemAvaliacao, Avaliacao


class AvaliacaoModelTest(TestCase):

    def setUp(self):
        self.user1 = User.objects.create(
            username='elaboradora',
            password='@elaboradora',
            email='elaboradora@example.com'
        )

        self.user2 = User.objects.create(
            username='aluna',
            password='@aluna',
            email='aluna@example.com'
        )

        self.elaborador = Elaborador.objects.create(
            user=self.user1,
            nome_completo='Elaboradora da Silva',
            data_nascimento='2003-06-01',
            verificado=True
        )

        self.aluno = Aluno.objects.create(
            user=self.user2,
            nome_completo='Aluna da Silva',
            data_nascimento='2003-06-01',
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
            area=self.area,
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

        self.avaliacao = Avaliacao.objects.create(
            visibilidade='PU',
            titulo='Prova de equação quadrática',
            elaborador=self.elaborador,
            descricao="Essa prova é um teste",
            data_inicio='2023-09-01 10:00:00',
            data_fim='2023-09-01 10:00:00',
            nota='100',
        )
        self.avaliacao.alunos.add(self.aluno.id)

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

    def test_avaliacao_create(self):
        prova = Avaliacao.objects.filter(id=self.avaliacao.id)
        self.assertTrue(prova.exists())

    def test_avaliacao_update(self):
        # Edita os atributos de prova
        self.avaliacao.visibilidade = 'PR'
        self.avaliacao.titulo = 'Prova de geometria plana'
        self.avaliacao.descricao = 'Essa prova é um teste de atualização.'
        self.avaliacao.save()

        # Verifica se as alterações foram salvas corretamente
        updated_avaliacao = Avaliacao.objects.get(id=self.avaliacao.id)
        self.assertEqual(updated_avaliacao.visibilidade, 'PR')
        self.assertEqual(updated_avaliacao.elaborador, self.elaborador)
        self.assertEqual(updated_avaliacao.titulo, 'Prova de geometria plana')
        self.assertEqual(updated_avaliacao.nota, 100)

    def test_avaliacao_delete(self):
        # Remove a avaliacao criado no setUp
        self.avaliacao.delete()
        # Verifica se a avaliacao foi removido corretamente
        avaliacoes = Avaliacao.objects.all()
        self.assertLess(avaliacoes.count(), 1)
