from django.contrib.auth.models import User
from django.db import models


class Usuario(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nome_completo = models.CharField(max_length=100)
    data_nascimento = models.DateField("Data de nascimento")

    def __str__(self):
        return self.user.username


class Elaborador(Usuario):
    verificado = models.BooleanField()

    def __str__(self):
        return self.user.username

    class Meta:
        verbose_name_plural = "Elaboradores"


class Aluno(Usuario):

    def __str__(self):
        return self.user.username


class Alternativa(models.Model):
    texto = models.TextField(blank=True, null=True)
    justificativa = models.TextField(blank=True, null=True)

    def __str__(self):
        return (self.texto if self.texto else '----')
 
class Tag(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome


class Area(models.Model):
    codigo = models.CharField("Código", max_length=50)
    nome = models.CharField(max_length=200)
    descricao = models.TextField("Descrição")
    subarea_de = models.ForeignKey(
        'Area',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    def __str__(self):
        return self.nome


class Item(models.Model):
    tipo_opcao = [
        ('ME', 'MultiplaEscolha'),
        ('DI', 'Discursiva')
    ]

    visibilidade_opcao = [
        ('PU', 'Publico'),
        ('PR', 'Privado'),
        ('IN', 'Inativo')
    ]

    elaborador = models.ForeignKey(Elaborador, on_delete = models.SET_NULL, null = True)
    co_elaboradores = models.ManyToManyField(Elaborador, related_name = "co_elaboradores", blank = True)
    tipo = models.CharField(max_length=2, choices=tipo_opcao)
    visibilidade = models.CharField(max_length=2, choices=visibilidade_opcao)
    area = models.ForeignKey(Area, related_name='tracks', on_delete=models.SET_NULL, null=True)
    assunto = models.CharField(max_length=200)
    titulo = models.CharField("Título", max_length=200)
    data_publicacao = models.DateTimeField("Data de publicação")
    texto_base = models.TextField(null=True, blank=True)
    enunciado = models.TextField()
    expectativa_resposta = models.TextField(
        "Expectativa de resposta", null=True, blank=True)
    alternativa_a = models.OneToOneField(
        Alternativa,
        related_name="alt_a",
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    alternativa_b = models.OneToOneField(
        Alternativa,
        related_name="alt_b",
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    alternativa_c = models.OneToOneField(
        Alternativa,
        related_name="alt_c",
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    alternativa_d = models.OneToOneField(
        Alternativa,
        related_name="alt_d",
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    alternativa_e = models.OneToOneField(
        Alternativa,
        related_name="alt_e",
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    alternativa_correta = models.CharField(max_length=1, null=True, blank=True)

    tags = models.ManyToManyField(Tag, blank=True)

    def __str__(self):
        return self.titulo

    class Meta:
        verbose_name_plural = "Itens"


class Avaliacao(models.Model):
    visibilidade_opcao = [
        ('PU', 'Publico'),
        ('PR', 'Privado')
    ]
    titulo = models.CharField("Título", max_length=200)
    elaborador = models.ForeignKey(
        Elaborador, related_name = "elaborador", on_delete=models.CASCADE)
    co_elaboradores = models.ManyToManyField(Elaborador, blank = True)
    descricao = models.TextField("Descrição")
    data_inicio = models.DateTimeField(blank=True, null=True)
    data_fim = models.DateTimeField(blank=True, null=True)
    nota = models.IntegerField()
    visibilidade = models.CharField(max_length=2, choices=visibilidade_opcao)
    alunos = models.ManyToManyField(Aluno, blank=True)

    class Meta:
        verbose_name_plural = "Avaliações"

    def __str__(self):
        return (self.titulo)


class ItemAvaliacao(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    avaliacao = models.ForeignKey(Avaliacao, on_delete=models.CASCADE, null=True, blank=True)
    numero_item = models.IntegerField()
    nota_item = models.IntegerField()

    def __str__(self):
        return ("{0} - {1}").format(self.numero_item, self.item.titulo)

    class Meta:
        verbose_name_plural = "Itens Avaliação"


class Resposta(models.Model):
    aluno = models.ForeignKey(Aluno, on_delete=models.SET_NULL, null=True)
    item = models.ForeignKey(
        Item, on_delete=models.CASCADE, null=True, blank=True)
    item_avaliacao = models.ForeignKey(
        ItemAvaliacao, on_delete=models.CASCADE, null=True, blank=True)
    resposta = models.TextField()
    nota_obtida = models.IntegerField(null=True, blank=True)
    data_hora = models.DateTimeField("Data e hora")

    def __str__(self):
        return ("Resposta: {0}").format(self.resposta)