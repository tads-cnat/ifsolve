from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets
from .models import (Alternativa, Aluno, Area, Avaliacao, Elaborador, Item, ItemAvaliacao, Resposta, Tag, Usuario)
from .serializers import ItemSerializer

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer