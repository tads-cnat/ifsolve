import unittest
from django.test import TestCase
from datetime import date
from django.contrib.auth.models import User
from myapp.models import Usuario, Aluno, Alternativa, Item, ItemAvaliacao

class ModelsIntegrationTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpassword'
        )
        self.usuario = Usuario.objects.create(
            user=self.user,
            nome_completo='Fulano de Tal',
            data_nascimento=date(1990, 1, 1)
        )
        self.aluno = Aluno.objects.create(
            user=self.user,
            nome_completo='Beltrano de Tal',
            data_nascimento=date(1995, 1, 1)
        )
        self.alternativa = Alternativa.objects.create(
            texto='Texto da Alternativa',
            justificativa='Justificativa da Alternativa'
        )
        self.item = Item.objects.create(
            elaborador=self.usuario,
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

    def test_usuario_str(self):
        self.assertEqual(str(self.usuario), 'testuser')

    def test_aluno_str(self):
        self.assertEqual(str(self.aluno), 'testuser')

    def test_alternativa_str(self):
        self.assertEqual(str(self.alternativa), 'Texto da Alternativa')

    def test_item_str(self):
        self.assertEqual(str(self.item), 'Título do Item')

    def test_item_avaliacao_str(self):
        self.assertEqual(str(self.item_avaliacao), '1 - Título do Item')

if __name__ == '__main__':
    unittest.main()
