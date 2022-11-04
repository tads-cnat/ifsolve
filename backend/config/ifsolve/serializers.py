from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.response import Response
from .models import (Alternativa, Aluno, Area, Avaliacao, Elaborador, Item, ItemAvaliacao, Resposta, Tag, Usuario)

class AlunoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aluno
        fields = "__all__"

class ElaboradorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Elaborador
        fields = "__all__"

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
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
    alternativa_a = AlternativaSerializer()
    alternativa_b = AlternativaSerializer()
    alternativa_c = AlternativaSerializer()
    alternativa_d = AlternativaSerializer()
    alternativa_e = AlternativaSerializer()

    def create(self, validated_data):
        obj_a = ItemSerializer.__getitem__(self, "alternativa_a")
        obj_b = ItemSerializer.__getitem__(self, "alternativa_b")
        obj_c = ItemSerializer.__getitem__(self, "alternativa_c")
        obj_d = ItemSerializer.__getitem__(self, "alternativa_d")
        obj_e = ItemSerializer.__getitem__(self, "alternativa_e")

        alt_a = Alternativa.objects.create(texto = obj_a.__getitem__("texto").value, justificativa = obj_a.__getitem__("justificativa").value)
        alt_b = Alternativa.objects.create(texto = obj_b.__getitem__("texto").value, justificativa = obj_b.__getitem__("justificativa").value)
        alt_c = Alternativa.objects.create(texto = obj_c.__getitem__("texto").value, justificativa = obj_c.__getitem__("justificativa").value)
        alt_d = Alternativa.objects.create(texto = obj_d.__getitem__("texto").value, justificativa = obj_d.__getitem__("justificativa").value)
        alt_e = Alternativa.objects.create(texto = obj_e.__getitem__("texto").value, justificativa = obj_e.__getitem__("justificativa").value)

        item = Item.objects.create(
            tipo = ItemSerializer.__getitem__(self, "tipo").value,
            visibilidade = ItemSerializer.__getitem__(self, "visibilidade").value,
            area = Area.objects.get(id = ItemSerializer.__getitem__(self, "area").value),
            assunto = ItemSerializer.__getitem__(self, "assunto").value,
            titulo = ItemSerializer.__getitem__(self, "titulo").value,
            data_publicacao = ItemSerializer.__getitem__(self, "data_publicacao").value,
            texto_base = ItemSerializer.__getitem__(self, "texto_base").value,
            enunciado = ItemSerializer.__getitem__(self, "enunciado").value,
            expectativa_resposta = ItemSerializer.__getitem__(self, "expectativa_resposta").value,
            alternativa_a = alt_a,
            alternativa_b = alt_b,
            alternativa_c = alt_c,
            alternativa_d = alt_d,
            alternativa_e = alt_e,
            alternativa_correta = ItemSerializer.__getitem__(self, "alternativa_correta").value,
        )

        elaboradores = ItemSerializer.__getitem__(self, "elaborador").value
        tags = ItemSerializer.__getitem__(self, "tags").value
        
        item.elaborador.add(*elaboradores)
        item.tags.add(*tags)
        item.save()
        return Response(ItemSerializer.data)
 
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
    
