import pytest
from ifsolve.serializers import AreaSerializer
from ifsolve.models import Elaborador, Area
from rest_framework import status
from django.contrib.auth.models import User
from datetime import date
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from django.urls import reverse
from django.utils import timezone

BASE_URL = "http://localhost:8000"

class PostAreaTest(APITestCase):
    def setUp(self):
        self.user_elaborador = User.objects.create_superuser('Teste', 'Teste@snow.com', 'Testepassword')
        self.elaborador = Elaborador.objects.create(
            user=self.user_elaborador,
            verificado=True,
            nome_completo='Test User',
            data_nascimento=date.today()
        )
        self.token = Token.objects.create(user=self.user_elaborador)
        self.client.force_authenticate(user=self.user_elaborador)
        self.data = {
            "codigo": "12345",
            "nome": "AreaTeste",
            "descricao": "Area criada para teste."
        }

    def test_post_area(self):
        response = self.client.post(BASE_URL + '/area/', self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["nome"], self.data["nome"])

class GetAreaTest(APITestCase):
    def setUp(self):
        self.user_elaborador = User.objects.create_superuser('Teste', 'Teste@snow.com', 'Testepassword')
        self.elaborador = Elaborador.objects.create(
            user=self.user_elaborador,
            verificado=True,
            nome_completo='Test User',
            data_nascimento=date.today()
        )
        self.token = Token.objects.create(user=self.user_elaborador)
        self.client.force_authenticate(user=self.user_elaborador)
        self.area = Area.objects.create(
            nome="areaTeste",
            codigo="12345",
            descricao="Area criada para teste."
        )

    def test_get_area(self):
        response = self.client.get(BASE_URL +'/area/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['nome'], self.area.nome)

class UpdateAreaTest(APITestCase):
    def setUp(self):
        self.user_elaborador = User.objects.create_superuser('Teste', 'Teste@snow.com', 'Testepassword')
        self.elaborador = Elaborador.objects.create(
            user=self.user_elaborador,
            verificado=True,
            nome_completo='Test User',
            data_nascimento=date.today()
        )
        self.token = Token.objects.create(user=self.user_elaborador)
        self.client.force_authenticate(user=self.user_elaborador)
        self.area = Area.objects.create(
            nome="areaTeste",
            codigo="12345",
            descricao="Area criada para teste."
        )
        self.data = {
            "codigo": "54321",
            "nome": "updatedAreaTest",
            "descricao": "Area criada e editada para teste."
        }

    def test_update_area(self):
        response = self.client.put(BASE_URL + f'/area/{self.area.id}/', self.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nome'], self.data["nome"])

class DeleteAreaTest(APITestCase):
    def setUp(self):
        self.user_elaborador = User.objects.create_superuser('Teste', 'Teste@snow.com', 'Testepassword')
        self.elaborador = Elaborador.objects.create(
            user=self.user_elaborador,
            verificado=True,
            nome_completo='Test User',
            data_nascimento=date.today()
        )
        self.token = Token.objects.create(user=self.user_elaborador)
        self.client.force_authenticate(user=self.user_elaborador)
        self.area = Area.objects.create(
            nome="areaTeste",
            codigo="12345",
            descricao="Area criada para teste."
        )

    def test_delete_area(self):
        response = self.client.delete(BASE_URL + f'/area/{self.area.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

if __name__ == "__main__":
    pytest.main()