from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (Alternativa, Aluno, Area, Avaliacao, Elaborador, Item, ItemAvaliacao, Resposta, Tag, Usuario, Resposta)

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = "__all__"

class ElaboradorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Elaborador
        fields = "__all__"

class AlunoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aluno
        fields = "__all__"

class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = "__all__"

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"


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

class AvaliacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avaliacao
        fields = "__all__"

class ItemAvaliacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemAvaliacao
        fields = "__all__"

class RespostaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resposta
        fields = "__all__"
    
