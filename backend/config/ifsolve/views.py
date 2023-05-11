from django.http import request
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from django.db import connection
from rest_framework.decorators import action
from rest_framework.authtoken.models import Token
import requests
from .permissions import IsElaborador, IsAluno, IsNotAuthenticated, IsAlunoOrElaborador
from .models import (Alternativa, Aluno, Area, Avaliacao,
                     Elaborador, Item, ItemAvaliacao, Resposta, Tag, Usuario)
from .serializers import (AlternativaSerializer, AlunoSerializer, AreaSerializer, AvaliacaoSerializer, ElaboradorSerializer,
                          ItemSerializer, ItemAvaliacaoSerializer, RespostaItemSerializer, TagSerializer, UsuarioSerializer, RespostaAvaliacaoSerializer,
                          LoginSerializer, UserSerializer, ElaboradorMostrarSerializer, AlunoMostrarSerializer)

from datetime import datetime


class AuthViewSet(viewsets.GenericViewSet):
    permission_classes = []
    serializer_class = None

    # @action(detail=False, methods=['post'], serializer_class=LoginSerializer, permission_classes=[IsNotAuthenticated])
    # def login(self, request):
    #     username = request.data.get('username')
    #     email = request.data.get('email')
    #     password = request.data.get('password')
    #     user = User.objects.filter(email=email)

    #     if not user.exists():
    #         user = User.objects.filter(username=username)

    #     if not user.exists():
    #         return Response({'error': 'Credenciais inválidas'}, status=status.HTTP_400_BAD_REQUEST)

    #     user = user.first()
    #     if not user.check_password(password):
    #         return Response({'error': 'Credenciais inválidas'}, status=status.HTTP_400_BAD_REQUEST)

    #     token, created = Token.objects.get_or_create(user=user)
    #     user_data = UserSerializer(user).data
    #     user_data['token'] = token.key
    #     return Response(user_data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], serializer_class=LoginSerializer,
            permission_classes=[IsNotAuthenticated], url_path='suap/auth_register')
    def suap_login_register(self, request):

        token = requests.post(
            'https://suap.ifrn.edu.br/api/v2/autenticacao/token/', data=request.data)

        # Se o token for válido
        if token.status_code == 200:
            token = token.json()
            token = token['access']
            user = requests.get('https://suap.ifrn.edu.br/api/v2/minhas-informacoes/meus-dados/',
                                headers={'Authorization': 'Bearer ' + token})
            user = user.json()
            # Se o usuario ja existe no sistema, loga
            user_verif = User.objects.filter(username=user['matricula'])
            if user_verif.exists():
                token, created = Token.objects.get_or_create(
                    user=user_verif.first())
                return Response({'token': token.key}, status=status.HTTP_200_OK)

            matricula = user['matricula']
            nome_completo = user['nome_usual']
            email = user['email']
            tipo_vinculo = user['tipo_vinculo']
            nascimento = user['data_nascimento']

            try:
                cargo = user['vinculo']['cargo']
            except KeyError:
                cargo = ''


            if cargo.find('PROFESSOR') != -1:
                serializer = ElaboradorSerializer(data={'username': matricula, 'nome_completo': nome_completo,
                                                        'email': email, 'nascimento': nascimento, 'verificado': False})
                serializer.is_valid(raise_exception=True)
                elaborador = serializer.save()
                user = get_object_or_404(User, username=matricula)
                token, created = Token.objects.get_or_create(user=user)
                return Response({'token': token.key}, status=status.HTTP_200_OK)

            if tipo_vinculo == 'Aluno':
                serializer = AlunoSerializer(data={'username': matricula, 'nome_completo': nome_completo,
                                                   'email': email, 'nascimento': nascimento, 'verificado': False})
                serializer.is_valid(raise_exception=True)
                aluno = serializer.save()
                user = get_object_or_404(User, username=matricula)
                token, created = Token.objects.get_or_create(user=user)
                return Response({'token': token.key}, status=status.HTTP_200_OK)

            return Response({'error': 'Você precisa ser aluno ou professor'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            username = request.data.get('username')
            email = request.data.get('email')
            password = request.data.get('password')
            user = User.objects.filter(email=email)
            cred_inv_msg = 'Credenciais inválidas'

            if not user.exists():
                user = User.objects.filter(username=username)

            if not user.exists():
                return Response({'error': cred_inv_msg}, status=status.HTTP_400_BAD_REQUEST)

            user = user.first()
            if not user.check_password(password):
                return Response({'error': cred_inv_msg}, status=status.HTTP_400_BAD_REQUEST)

            token, created = Token.objects.get_or_create(user=user)
            user_data = UserSerializer(user).data
            user_data['token'] = token.key
            return Response(user_data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def logout(self, request):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def user(self, request):
        return Response(UserSerializer(request.user).data)


class AlunoViewSet(viewsets.ModelViewSet):
    queryset = Aluno.objects.none()
    serializer_class = AlunoSerializer

    @action(detail=False, methods=['get'], url_path="todos", permission_classes=[IsElaborador])
    def listar(self, request):
        lista_alunos = Aluno.objects.all()
        serializer = AlunoMostrarSerializer(lista_alunos, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'], url_path="cadastro", permission_classes=[IsNotAuthenticated])
    def post(self, request):
        serializer = AlunoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ElaboradorViewSet(viewsets.ModelViewSet):
    queryset = Elaborador.objects.none()
    serializer_class = ElaboradorSerializer

    @action(detail=False, methods=['get'], url_path="todos", permission_classes=[IsElaborador])
    def listar(self, request):
        lista_elaboradores = Elaborador.objects.filter(verificado=True)
        serializer = ElaboradorMostrarSerializer(lista_elaboradores, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'], url_path="cadastro", permission_classes=[IsNotAuthenticated])
    def post(self, request):
        serializer = ElaboradorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.none()
    serializer_class = ItemSerializer

    @action(detail=True, methods=['delete'], url_path='excluir', permission_classes=[IsElaborador])
    def delete(self, request, pk=None):
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM ifsolve_item WHERE id = %s", [pk])
            item = cursor.fetchall()
            if (item[0][1] == "ME"):
                # Excluindo alternativa A
                (get_object_or_404(Alternativa, pk=item[0][10])).delete()
                # Excluindo alternativa B
                (get_object_or_404(Alternativa, pk=item[0][11])).delete()

                if (item[0][12]):
                    # Excluindo alternativa C
                    (get_object_or_404(Alternativa, pk=item[0][12])).delete()

                if (item[0][13]):
                    # Excluindo alternativa D
                    (get_object_or_404(Alternativa, pk=item[0][13])).delete()

                if (item[0][14]):
                    # Excluindo alternativa E
                    (get_object_or_404(Alternativa, pk=item[0][14])).delete()

            (get_object_or_404(Item, pk=item[0][0])).delete()  # Excluindo item
            return Response(status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], url_path='elaborador/(?P<elaborador_id>[^/.]+)', permission_classes=[IsElaborador])
    def itensElaborador(self, request, elaborador_id):
        # View para o elaborador ver os itens que ele criou
        elaborador = get_object_or_404(Elaborador, pk=elaborador_id)
        item = Item.objects.filter(
            elaborador=elaborador).order_by("data_publicacao")
        serializer = ItemSerializer(item, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'], url_path='detalhe', permission_classes=[IsAlunoOrElaborador])
    def detalhe(self, request, pk=None):
        if (hasattr(request.user.usuario, 'aluno')):
            queryset = Item.objects.filter(visibilidade='PU')

        elif (hasattr(request.user.usuario, 'elaborador')):
            queryset = Item.objects.filter(
                elaborador=request.user.usuario.elaborador) | Item.objects.filter(visibilidade='PU')
        item = get_object_or_404(queryset, pk=pk)
        serializer = ItemSerializer(item)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='publico', permission_classes=[IsAlunoOrElaborador])
    def itensPublicos(self, request, pk=None):
        # View para o aluno ou elaborador ver todos os itens públicos
        item = Item.objects.filter(visibilidade='PU').order_by(
            "data_publicacao")  # Ordenar também pela data crescente
        serializer = ItemSerializer(item, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'], url_path='criar', permission_classes=[IsElaborador])
    def itemCriar(self, request):
        # View para o elaborador criar um item
        elaborador = get_object_or_404(
            Elaborador, id=request.user.usuario.elaborador.id)
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(elaborador=elaborador)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path=('responder'), permission_classes=[IsAluno])
    def responder(self, request, pk=None):
        item = get_object_or_404(Item, pk=pk)
        serializer = RespostaItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(item=item, aluno=request.user.usuario.aluno)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AreaViewSet(viewsets.ModelViewSet):
    queryset = Area.objects.all()
    serializer_class = AreaSerializer
    permissions_classes = [IsElaborador | IsAluno]


class AvaliacaoViewSet(viewsets.ModelViewSet):
    queryset = Avaliacao.objects.none()
    serializer_class = AvaliacaoSerializer

    @action(detail=False, methods=['post'], url_path='elaborador/criar', permission_classes=[IsElaborador])
    def avaliacaoCriar(self, request):
        serializer = AvaliacaoSerializer(data=request.data)
        elaborador = get_object_or_404(
            Elaborador, id=request.user.usuario.elaborador.id)
        if serializer.is_valid():
            serializer.save(elaborador=elaborador)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'], url_path='elaborador/listar', permission_classes=[IsElaborador])
    def avaliacoesElaborador(self, request, pk=None):
        avaliacao = Avaliacao.objects.filter(
            elaborador=request.user.usuario.elaborador)
        serializer = AvaliacaoSerializer(avaliacao, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='aluno/listar', permission_classes=[IsAluno])
    def avaliacoesAluno(self, request, pk=None):
        avaliacao = Avaliacao.objects.filter(
            alunos=request.user.usuario.aluno.id)
        serializer = AvaliacaoSerializer(avaliacao, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'], url_path='detalhe', permission_classes=[IsAlunoOrElaborador])
    def detalhe(self, request, pk=None):
        avaliacao = get_object_or_404(Avaliacao, pk=pk)
        itens_avaliacao = ItemAvaliacao.objects.filter(avaliacao=avaliacao)
        serializer_avaliacao = AvaliacaoSerializer(avaliacao)
        serializer_itens = ItemAvaliacaoSerializer(itens_avaliacao, many=True)
        return Response({'avaliacao': serializer_avaliacao.data, 'itens': serializer_itens.data})

    @action(detail=False, methods=['post'], url_path='responder', permission_classes=[IsAluno])
    def responder(self, request):
        serializer = RespostaAvaliacaoSerializer(data=request.data, many=True)

        if serializer.is_valid():
            for resposta in serializer.validated_data:
                item_avaliacao = get_object_or_404(
                    ItemAvaliacao, pk=resposta['item_avaliacao'].id)
                resposta['aluno'] = request.user.usuario.aluno
                resposta['data_hora'] = datetime.now()
                resposta['item'] = item_avaliacao.item
                # Verifica se item_avaliacao é de múltipla escolha
                if item_avaliacao.item.tipo == 'ME':
                    if resposta['resposta'].upper() == item_avaliacao.item.alternativa_correta.upper():
                        resposta['nota_obtida'] = item_avaliacao.nota_item

                Resposta.objects.create(**resposta)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'], url_path='(?P<avaliacao_id>[^/.]+)/respostas', permission_classes=[IsElaborador])
    def RespostaAvaliacaoListagemSerializer(self, request, avaliacao_id):
        avaliacao = get_object_or_404(Avaliacao, id=avaliacao_id)
        alunos = avaliacao.alunos.all()
        itens_avaliacao = ItemAvaliacao.objects.filter(
            avaliacao=avaliacao).order_by("numero_item")
        respostas = []
        contexto = {}

        for aluno in alunos:
            for item in itens_avaliacao:
                respostas = Resposta.objects.filter(
                    item_avaliacao=item).filter(aluno=aluno)
                serializer = RespostaAvaliacaoSerializer(respostas, many=True)
                contexto_atual = {
                    "aluno": aluno.user.username, "respostas": serializer.data
                }
                if aluno.user.username in contexto:
                    contexto[aluno.user.username]['respostas'] += contexto_atual['respostas']
                else:
                    contexto[aluno.user.username] = contexto_atual
        return Response(contexto)

    @action(detail=False, methods=['get'], url_path='(?P<avaliacao_id>[^/.]+)/aluno/(?P<aluno_id>[^/.]+)/respostas', permission_classes=[IsAlunoOrElaborador])
    def RespostaAvaliacaoIndividualSerializer(self, request, avaliacao_id, aluno_id):
        avaliacao = get_object_or_404(Avaliacao, id=avaliacao_id)
        aluno = get_object_or_404(Aluno, id=aluno_id)
        itens_avaliacao = ItemAvaliacao.objects.filter(
            avaliacao=avaliacao).order_by("numero_item")
        respostas = []
        contexto = {}

        for item in itens_avaliacao:
            respostas = Resposta.objects.filter(
                item_avaliacao=item).filter(aluno=aluno)
            serializer = RespostaAvaliacaoSerializer(respostas, many=True)
            contexto_atual = {
                "aluno": aluno.user.username, "respostas": serializer.data
            }
            if "resposta" in contexto:
                contexto["resposta"]['respostas'] += contexto_atual['respostas']
            else:
                contexto["resposta"] = contexto_atual
        return Response(contexto)

    @action(detail=False, methods=['get'], url_path='(?P<avaliacao_id>[^/.]+)/aluno/respostas', permission_classes=[IsAluno])
    def RespostaAvaliacaoAlunoSerializer(self, request, avaliacao_id):
        avaliacao = get_object_or_404(Avaliacao, id=avaliacao_id)
        itens_avaliacao = ItemAvaliacao.objects.filter(avaliacao=avaliacao)
        respostas = Resposta.objects.filter(aluno=request.user.usuario.aluno).filter(
            item_avaliacao__in=itens_avaliacao)
        serializer = RespostaAvaliacaoSerializer(respostas, many=True)
        return Response(serializer.data)


class RespostaItemViewSet(viewsets.ModelViewSet):
    queryset = Resposta.objects.all()
    serializer_class = RespostaItemSerializer

    @action(detail=False, methods=['get'], url_path='item/(?P<item_id>[^/.]+)', permission_classes=[IsAluno])
    def resposta(self, request, pk=None, item_id=None):
        item = get_object_or_404(Item, pk=item_id)
        respostas = Resposta.objects.filter(
            item=item, aluno=request.user.usuario.aluno).order_by("data_hora")
        serializer = RespostaItemSerializer(respostas, many=True)
        return Response(serializer.data)


class TagViewSet(viewsets.ModelViewSet):
    permission_classes = [IsElaborador]
    queryset = Tag.objects.none()
    serializer_class = TagSerializer

    @action(detail=False, methods=['get', 'post'], url_path='item/(?P<item_id>[^/.]+)')
    def tag(self, request, pk=None, item_id=None):
        if request.method == 'GET':
            # Visualizar as tags de um item
            item = get_object_or_404(Item, pk=item_id)
            tags = Tag.objects.filter(item=item)
            serializer = TagSerializer(tags, many=True)
            return Response(serializer.data)
        else:
            # Criar tags para um item
            item = get_object_or_404(Item, pk=item_id)
            serializer = TagSerializer(data=request.data, many=True)
            if serializer.is_valid():
                serializer.save(item=item)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
