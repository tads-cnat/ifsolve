from rest_framework import serializers
from .models import (Alternativa, Aluno, Area, Avaliacao, Elaborador, Item, ItemAvaliacao, Resposta, Tag, Usuario)

class ElaboradorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Elaborador
        fields =  "__all__"

class AlternativaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Alternativa
        fields =  "__all__"


class ItemSerializer(serializers.ModelSerializer):
    elaborador = serializers.SlugRelatedField(many=True,read_only=True, slug_field='verificado')
    alternativa_a = AlternativaSerializer(required=True)
    alternativa_b = AlternativaSerializer(required=True)
    alternativa_c = AlternativaSerializer(required=True)
    alternativa_d = AlternativaSerializer(required=True)
    alternativa_e = AlternativaSerializer(required=True)
 
    class Meta:
        model = Item
        fields = "__all__"

    def create(self, validated_data):
        """
        Make necessary modifications as per your requirements
        """
        criando_alternativa = AlternativaSerializer.create(AlternativaSerializer(), validated_data)
        alternativa_a, created = Item.objects.create(profile=criando_alternativa)
        alternativa_b, created = Item.objects.create(profile=criando_alternativa)
        alternativa_c, created = Item.objects.create(profile=criando_alternativa)
        alternativa_e, created = Item.objects.create(profile=criando_alternativa)
        alternativa_d, created = Item.objects.create(profile=criando_alternativa)
