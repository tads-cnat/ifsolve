from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import (Alternativa, Aluno, Area, Avaliacao, Elaborador, Item, ItemAvaliacao, Resposta, Tag, Usuario)

class AlunoSerializer(serializers.ModelSerializer):
    data_nascimento = serializers.DateField()

    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'data_nascimento']

    def create(self, validated_data):
        username = UsuarioSerializer.__getitem__(self, "username").value
        senha = UsuarioSerializer.__getitem__(self, "password").value
        email = UsuarioSerializer.__getitem__(self, "email").value
        nascimento = UsuarioSerializer.__getitem__(self, "data_nascimento").value
        user = User.objects.create_user(
            username = username,
            password = senha,
            email = email,
        )
        aluno = Aluno()
        aluno.user = user
        aluno.data_nascimento = nascimento
        aluno.save()
        return Response(UsuarioSerializer.data)

class ElaboradorSerializer(serializers.ModelSerializer):
    data_nascimento = serializers.DateField()
    verificado = serializers.BooleanField()

    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'data_nascimento', 'verificado']

    def create(self, validated_data):
        username = UsuarioSerializer.__getitem__(self, "username").value
        senha = UsuarioSerializer.__getitem__(self, "password").value
        email = UsuarioSerializer.__getitem__(self, "email").value
        nascimento = UsuarioSerializer.__getitem__(self, "data_nascimento").value
        verificado = UsuarioSerializer.__getitem__(self, "verificado").value
        user = User.objects.create_user(
            username = username,
            password = senha,
            email = email,
        )
        elaborador = Elaborador()
        elaborador.verificado = verificado
        elaborador.user = user
        elaborador.data_nascimento = nascimento
        elaborador.save()
        return Response(UsuarioSerializer.data)

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

    def create(self, validated_data):
        item = Item.objects.create(
            elaborador = get_object_or_404(Elaborador, id = ItemSerializer.__getitem__(self, "elaborador").value),
            visibilidade = ItemSerializer.__getitem__(self, "visibilidade").value,
            area = Area.objects.get(id = ItemSerializer.__getitem__(self, "area").value),
            assunto = ItemSerializer.__getitem__(self, "assunto").value,
            titulo = ItemSerializer.__getitem__(self, "titulo").value,
            data_publicacao = ItemSerializer.__getitem__(self, "data_publicacao").value,
            enunciado = ItemSerializer.__getitem__(self, "enunciado").value,
        )

        tipo = ItemSerializer.__getitem__(self, "tipo").value
        item.tipo = tipo

        if (tipo == "ME"):
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

            item.alternativa_a = alt_a
            item.alternativa_b = alt_b
            item.alternativa_c = alt_c
            item.alternativa_d = alt_d
            item.alternativa_e = alt_e

        elif (tipo == "DI"):
            item.expectativa_resposta = ItemSerializer.__getitem__(self, "expectativa_resposta").value
            item.alternativa_correta = ItemSerializer.__getitem__(self, "alternativa_correta").value

        id_coelaboradores = ItemSerializer.__getitem__(self, "co_elaboradores").value
        tags = ItemSerializer.__getitem__(self, "tags").value
        texto_base = ItemSerializer.__getitem__(self, "texto_base").value
        
        if (tags != None):
            item.tags.add(*tags)

        if (id_coelaboradores != None):
            item.co_elaboradores.add(*id_coelaboradores)

        if (texto_base != None):
            item.texto_base = texto_base

        item.save()
        return Response(ItemSerializer.data)
    
    def update(self, instance, validated_data):
        # Precisa atualizar o update

        obj_a = ItemSerializer.__getitem__(self, "alternativa_a")
        obj_b = ItemSerializer.__getitem__(self, "alternativa_b")
        obj_c = ItemSerializer.__getitem__(self, "alternativa_c")
        obj_d = ItemSerializer.__getitem__(self, "alternativa_d")
        obj_e = ItemSerializer.__getitem__(self, "alternativa_e")

        alt_a = Alternativa.objects.get(id = obj_a.__getitem__("id").value)
        alt_b = Alternativa.objects.get(id = obj_b.__getitem__("id").value)
        alt_c = Alternativa.objects.get(id = obj_c.__getitem__("id").value)
        alt_d = Alternativa.objects.get(id = obj_d.__getitem__("id").value)
        alt_e = Alternativa.objects.get(id = obj_e.__getitem__("id").value)

        alt_a.texto = obj_a.__getitem__("texto").value
        alt_a.justificativa = obj_a.__getitem__("justificativa").value
        alt_b.texto = obj_b.__getitem__("texto").value
        alt_b.justificativa = obj_b.__getitem__("justificativa").value
        alt_c.texto = obj_c.__getitem__("texto").value
        alt_c.justificativa = obj_c.__getitem__("justificativa").value
        alt_d.texto = obj_d.__getitem__("texto").value
        alt_d.justificativa = obj_d.__getitem__("justificativa").value
        alt_e.texto = obj_e.__getitem__("texto").value
        alt_e.justificativa = obj_e.__getitem__("justificativa").value

        alt_a.save()
        alt_b.save()
        alt_c.save()
        alt_d.save()
        alt_e.save()

        instance.tipo = ItemSerializer.__getitem__(self, "tipo").value
        instance.visibilidade = ItemSerializer.__getitem__(self, "visibilidade").value
        instance.area = Area.objects.get(id = ItemSerializer.__getitem__(self, "area").value)
        instance.assunto = ItemSerializer.__getitem__(self, "assunto").value
        instance.titulo = ItemSerializer.__getitem__(self, "titulo").value
        instance.data_publicacao = ItemSerializer.__getitem__(self, "data_publicacao").value
        instance.texto_base = ItemSerializer.__getitem__(self, "texto_base").value
        instance.enunciado = ItemSerializer.__getitem__(self, "enunciado").value
        instance.expectativa_resposta = ItemSerializer.__getitem__(self, "expectativa_resposta").value
        instance.alternativa_a = alt_a
        instance.alternativa_b = alt_b
        instance.alternativa_c = alt_c
        instance.alternativa_d = alt_d
        instance.alternativa_e = alt_e
        instance.alternativa_correta = ItemSerializer.__getitem__(self, "alternativa_correta").value

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

    def create(self, validated_data):
        
        resposta = Resposta.objects.create(
            aluno = Aluno.objects.get(id = RespostaSerializer.__getitem__(self, "aluno").value),            
            resposta = RespostaSerializer.__getitem__(self, "resposta").value,
            data_hora = RespostaSerializer.__getitem__(self, "data_hora").value
        )

        item = Item.objects.get(id = RespostaSerializer.__getitem__(self, "item").value)
        item_avaliacao = RespostaSerializer.__getitem__(self, "item_avaliacao").value
        nota_obtida = RespostaSerializer.__getitem__(self, "nota_obtida").value
        
        if (item != None):
            resposta.item = item

        if (item_avaliacao != None):
            resposta.item_avaliacao = item_avaliacao

        if (nota_obtida != None):
            resposta.nota_obtida = nota_obtida

        resposta.save()
        return Response(RespostaSerializer.data)
    
    class Meta:
        model = Resposta
        fields = "__all__"