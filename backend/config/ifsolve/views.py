from django.http import request
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .permissions import IsElaborador, IsAluno
from .models import (Alternativa, Aluno, Area, Avaliacao, Elaborador, Item, ItemAvaliacao, Resposta, Tag, Usuario)
from .serializers import (AlternativaSerializer, AlunoSerializer, AreaSerializer, AvaliacaoSerializer, ElaboradorSerializer, ItemSerializer, ItemAvaliacaoSerializer, RespostaSerializer, TagSerializer, UsuarioSerializer)

class ElaborarItemView(APIView):
    """
    View para elaboração de itens, que só pode ser acessada por elaboradores.
    """
    permission_classes = [permissions.IsAuthenticated, IsElaborador]

    def post(self, request):
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VisualizarItemView(APIView):
    """
    View para visualização de itens, que pode ser acessada por alunos e elaboradores.
    """
    permission_classes = [permissions.IsAuthenticated, IsElaborador | IsAluno]
    
    def get(self, request, id_item):
        item = get_object_or_404(Item, pk=id_item)
        serializer = ItemSerializer(item)
        return Response(serializer.data)

# class ResponderItemView(APIView):
#     """
#     View para responder itens, que só pode ser acessada por alunos.
#     """
#     permission_classes = [permissions.IsAuthenticated, IsAluno]

#     def get(self, request, id_item):
#         item = Item.objects.get(id=id_item)
#         aluno = Aluno.objects.get(user=request.user)
#         resposta = Resposta.objects.get(item=item, aluno=aluno)
#         serializer = RespostaSerializer(resposta)
#         return Response(serializer.data)

#     def post(self, request, id_item):
#         item = Item.objects.get(id=id_item)
#         aluno = Aluno.objects.get(user=request.user)
#         resposta = Resposta(item=item, aluno=aluno, alternativa=request.data['alternativa'])
#         resposta.save()
#         return Response(status=status.HTTP_201_CREATED)   
