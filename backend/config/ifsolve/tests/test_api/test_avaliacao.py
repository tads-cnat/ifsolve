import pytest
from ifsolve.models import Elaborador
from rest_framework import status
from django.contrib.auth.models import User
from datetime import date
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase, APIClient

BASE_URL = "http://localhost:8000"

class ItemTestsSistema(APITestCase):
    def setUp(self):
        self.user_elaborador = User.objects.create_superuser(
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
        self.client = APIClient()
        self.client.force_authenticate(user=self.user_elaborador)


    def test_authenticated_route_1(self):
        route_url = BASE_URL + "/avaliacao/"
        response = self.client.get(route_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
            

if __name__ == "__main__":
    pytest.main()

