from django.test import TestCase
from datetime import date
from django.contrib.auth.models import User
from ifsolve.models import Elaborador, Aluno, Alternativa, Item, ItemAvaliacao, Resposta


class RespostaModelTest(TestCase):

    def setUp(self):
        self.user_aluno = User.objects.create_user(
            username='testuser',
            password='testpassword'
        )

        self.user_elaborador = User.objects.create_user(
            username='testuser2',
            password='testpassword2'
        )

        self.aluno = Aluno.objects.create(
            user=self.user_aluno,
            nome_completo='Beltrano de Tal',
            data_nascimento=date(1995, 1, 1)
        )

        self.elaborador = Elaborador.objects.create(
            user=self.user_elaborador,
            nome_completo='Fulano de Tal',
            data_nascimento=date(1995, 1, 1),
            verificado=True
        )

        self.alternativa = Alternativa.objects.create(
            texto='Texto da Alternativa',
            justificativa='Justificativa da Alternativa'
        )
        self.item = Item.objects.create(
            elaborador=self.elaborador,
            tipo='ME',
            visibilidade='PU',
            assunto='Assunto do Item',
            titulo='Título do Item',
            data_publicacao=date.today(),
            enunciado='Enunciado do Item',
            expectativa_resposta='Expectativa de Resposta do Item',
            alternativa_a=self.alternativa,
            alternativa_correta='a'
        )
        self.item_avaliacao = ItemAvaliacao.objects.create(
            item=self.item,
            avaliacao=None,
            numero_item=1,
            nota_item=10
        )

        self.resposta = Resposta.objects.create(
            aluno=self.aluno,
            item=self.item,
            item_avaliacao=self.item_avaliacao,
            resposta='a',
            nota_obtida=10,
            data_hora=date.today()
        )

    def test_resposta_create(self):
        test_resposta = Resposta.objects.get(
            aluno=self.aluno, item=self.item, item_avaliacao=self.item_avaliacao, resposta='a', nota_obtida=10, data_hora=date.today())
        self.assertEqual(test_resposta, self.resposta)
        self.assertEqual(test_resposta.aluno, self.aluno)
        self.assertEqual(test_resposta.item, self.item)
        self.assertEqual(test_resposta.item_avaliacao, self.item_avaliacao)
        self.assertEqual(test_resposta.resposta, 'a')
        self.assertEqual(test_resposta.nota_obtida, 10)
        self.assertEqual(test_resposta.data_hora.date(),
                         date.today())

    def test_resposta_update(self):
        test_resposta = Resposta.objects.get(
            aluno=self.aluno, item=self.item, item_avaliacao=self.item_avaliacao, resposta='a', nota_obtida=10, data_hora=date.today())
        test_resposta.resposta = 'b'
        test_resposta.nota_obtida = 5
        test_resposta.data_hora = date(2020, 1, 1)
        test_resposta.save()

        self.assertEqual(test_resposta.resposta, 'b')
        self.assertEqual(test_resposta.nota_obtida, 5)
        self.assertEqual(test_resposta.data_hora, date(2020, 1, 1))

    def test_resposta_read(self):
        test_resposta = Resposta.objects.all()
        self.assertEqual(test_resposta.count(), 1)
        self.assertEqual(test_resposta[0].aluno, self.aluno)
        self.assertEqual(test_resposta[0].item, self.item)
        self.assertEqual(test_resposta[0].item_avaliacao, self.item_avaliacao)
        self.assertEqual(test_resposta[0].resposta, 'a')
        self.assertEqual(test_resposta[0].nota_obtida, 10)
        self.assertEqual(test_resposta[0].data_hora.date(),
                        date.today())

    def test_resposta_delete(self):
        test_resposta = Resposta.objects.get(
            aluno=self.aluno, item=self.item, item_avaliacao=self.item_avaliacao, resposta='a', nota_obtida=10, data_hora=date.today())
        test_resposta.delete()
        test_resposta = Resposta.objects.all()
        self.assertEqual(test_resposta.count(), 0)
