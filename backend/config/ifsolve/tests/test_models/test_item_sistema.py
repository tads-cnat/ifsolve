from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase
from ifsolve.models import Item, Elaborador
from rest_framework.authtoken.models import Token
from datetime import date


class ItemTestsSistema(APITestCase):
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

        self.item_data = {
            "tipo": "ME",
            "visibilidade": "PU",
            "assunto": "Assunto",
            "titulo": "Título",
            "data_publicacao": "2023-07-10",
            "enunciado": "Enunciado",
        }
        self.item = Item.objects.create(
            elaborador=self.elaborador, **self.item_data)

    def test_create_item(self):
        url = "/item/criar/"
        response = self.client.post(
            url, self.item_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Item.objects.count(), 2)

    def test_get_item(self):
        url = "/item/{pk}/detalhe/".format(pk=self.item.pk)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["titulo"], self.item.titulo)

    def test_update_item(self):
        url = "/item/{pk}/".format(pk=self.item.pk)
        updated_data = {
            "titulo": "Novo Título",
            "enunciado": "Novo Enunciado",
        }
        response = self.client.put(url, updated_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.item.refresh_from_db()
        self.assertEqual(self.item.titulo, "Novo Título")
        self.assertEqual(self.item.enunciado, "Novo Enunciado")

    def test_delete_item(self):
        url = "/item/{pk}/excluir/".format(pk=self.item.pk)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(Item.objects.filter(pk=self.item.pk).exists())
