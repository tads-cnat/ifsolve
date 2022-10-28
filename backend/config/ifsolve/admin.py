from django.contrib import admin
from .models import (Alternativa, Aluno, Area, Avaliacao, Elaborador, Item, ItemAvaliacao, Resposta, Tag, Usuario)

admin.site.register(Avaliacao)
admin.site.register(ItemAvaliacao)
admin.site.register(Usuario)
admin.site.register(Elaborador)
admin.site.register(Aluno)
admin.site.register(Item)
admin.site.register(Alternativa)
admin.site.register(Tag)
admin.site.register(Resposta)
admin.site.register(Area)
