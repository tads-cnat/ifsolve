from rest_framework import serializers
from .models import (Alternativa, Aluno, Area, Avaliacao, Elaborador, Item, ItemAvaliacao, Resposta, Tag, Usuario)


class ItemSerializer(serializers.HyperlinkedModelSerializer):
    tracks = serializers.HyperlinkedIdentityField(view_name='ItemViewSet')


    class Meta:
        model = Item
        fields = [ 'id', 'elaborador', 'tipo', 'visibilidade', 'area', 'assunto', 'titulo', 'data_publicacao', 'texto_base', 'enunciado', 'expectativa_resposta', 'alternativa_a', 'alternativa_b', 'alternativa_c', 'alternativa_d', 'alternativa_e', 'alternativa_correta', 'tags','tracks',]