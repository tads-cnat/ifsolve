from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (Alternativa, Aluno, Area, Avaliacao, Elaborador, Item, ItemAvaliacao, Resposta, Tag, Usuario)

class AlternativaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alternativa
        fields =  "__all__"

class ItemSerializer(serializers.ModelSerializer):
    alternativa_a = AlternativaSerializer(read_only = True)
    alternativa_b = AlternativaSerializer(read_only = True)
    alternativa_c = AlternativaSerializer(read_only = True)
    alternativa_d = AlternativaSerializer(read_only = True)
    alternativa_e = AlternativaSerializer(read_only = True)
 
    class Meta:
        model = Item
        fields = "__all__"