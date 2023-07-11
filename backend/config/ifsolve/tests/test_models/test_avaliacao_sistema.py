from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase
from ifsolve.models import Item, Elaborador, Avaliacao
from rest_framework.authtoken.models import Token
from datetime import date


class AvaliacaoTestsSistema(APITestCase):
    def setUp(self):
        self.user_elaborador = User.objects.create_user(
            username='testuser',
            password='testpassword'
        )

        self.elaborador = Elaborador.objects.create(
            user=self.user_elaborador,
            verificado=True,
            nome_completo='Test User',
            data_nascimento=date.today()
        )

        self.token = Token.objects.create(user=self.user_elaborador)
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token.key}")

        self.avaliacao_data = {
            "titulo": "Título Avaliação",
            "elaborador": self.elaborador,
            "descricao": "Descrição da avaliação",
            "data_inicio": "2023-07-10T09:00:00Z",
            "data_fim": "2023-07-10T10:00:00Z",
            "nota": 10,
            "visibilidade": "PU",
        }
        self.avaliacao = Avaliacao.objects.create(**self.avaliacao_data)

    def test_create_avaliacao(self):
        url = "/avaliacao/elaborador/criar/"
        response = self.client.post(url, self.avaliacao_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Avaliacao.objects.count(), 2)

    def test_get_avaliacao(self):
        url = "/avaliacao/{pk}/detalhe/".format(pk=self.avaliacao.pk)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["titulo"], self.avaliacao.titulo)

    def test_update_avaliacao(self):
        url = "/avaliacao/{pk}/".format(pk=self.avaliacao.pk)
        updated_data = {
            "titulo": "Novo Título",
            "descricao": "Nova Descrição",
        }
        response = self.client.put(url, updated_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.avaliacao.refresh_from_db()
        self.assertEqual(self.avaliacao.titulo, "Novo Título")
        self.assertEqual(self.avaliacao.descricao, "Nova Descrição")

    def test_delete_avaliacao(self):
        url = "/avaliacao/{pk}/".format(pk=self.avaliacao.pk)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(Avaliacao.objects.filter(pk=self.avaliacao.pk).exists())
