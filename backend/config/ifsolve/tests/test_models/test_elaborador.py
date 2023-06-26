from django.test import TestCase
from django.contrib.auth.models import User
from ifsolve.models import Elaborador
from datetime import datetime


class ElaboradorModelTest(TestCase):

    def setUp(self):
        self.user = User.objects.create(
            username='elaboradora',
            password='el4b0r4d0r4',
            email='elaboradora@example.com'
        )

        self.elaborador = Elaborador.objects.create(
            user=self.user,
            nome_completo='Elaboradora da Silva',
            data_nascimento='2000-06-01',
            verificado=True
        )

    def test_user_elaborador_create(self):
        test_user = User.objects.get(id=self.user.pk)
        test_elaborador = Elaborador.objects.get(id=self.elaborador.pk)
        self.assertEqual(test_user.username, 'elaboradora')
        self.assertEqual(test_user.password, 'el4b0r4d0r4')
        self.assertEqual(test_user.email, 'elaboradora@example.com')   
        self.assertEqual(test_elaborador.user, self.user)
        self.assertEqual(test_elaborador.nome_completo, 'Elaboradora da Silva')
        self.assertEqual(test_elaborador.data_nascimento, datetime.strptime('2000-06-01', '%Y-%m-%d').date())
        self.assertEqual(test_elaborador.verificado, True)

    def test_elaborador_update(self):
        self.user.username = 'elaboradora_edit'
        self.user.password = 'el4b0r4d0r4edit'
        self.user.email = 'elaboradora_edit@example.com'
        self.elaborador.nome_completo = 'Elaboradora Edit da Silva'
        self.elaborador.data_nascimento = '2002-06-01'
        self.elaborador.verificado = False
        self.user.save()
        self.elaborador.save()

        update_user = User.objects.get(id=self.user.pk)
        update_elaborador = Elaborador.objects.get(id=self.elaborador.pk)
        self.assertEqual(update_user.username, 'elaboradora_edit')
        self.assertEqual(update_user.password, 'el4b0r4d0r4edit')
        self.assertEqual(update_user.email, 'elaboradora_edit@example.com')
        self.assertEqual(update_elaborador.nome_completo, 'Elaboradora Edit da Silva')
        self.assertEqual(update_elaborador.data_nascimento, datetime.strptime('2002-06-01', '%Y-%m-%d').date())
        self.assertEqual(update_elaborador.verificado, False)

    def test_elaborador_read(self):
        user2 = User.objects.create(
            username='teste',
            password='t3st3',
            email='teste@example.com'
        )

        Elaborador.objects.create(
            user=user2,
            nome_completo='Teste da Silva',
            data_nascimento='2000-06-01',
            verificado=True
        )

        elaboradores = Elaborador.objects.all()
        self.assertGreaterEqual(elaboradores.count(), 1)  # Contando com o item criado no setUp

    def test_elaborador_delete(self):
        self.user.delete()
        self.elaborador.delete()

        usuarios = User.objects.all()
        self.assertEqual(usuarios.count(), 0)

        elaboradores = Elaborador.objects.all()
        self.assertEqual(elaboradores.count(), 0)
