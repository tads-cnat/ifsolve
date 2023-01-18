from django.http import request
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authtoken.models import Token
from .permissions import IsElaborador, IsAluno, AllowAny, IsNotAuthenticated, IsAlunoOrElaborador
from .models import (Alternativa, Aluno, Area, Avaliacao, Elaborador, Item, ItemAvaliacao, Resposta, Tag, Usuario)
from .serializers import (AlternativaSerializer, AlunoSerializer, AreaSerializer, AvaliacaoSerializer, ElaboradorSerializer, 
                        ItemSerializer, ItemAvaliacaoSerializer, RespostaItemSerializer, RespostaAvaliacaoSerializer,  TagSerializer, UsuarioSerializer, 
                        LoginSerializer, UserSerializer)

class AuthViewSet(viewsets.GenericViewSet):
    permission_classes = []
    serializer_class = None

    @action(detail=False, methods=['post'], serializer_class=LoginSerializer, permission_classes=[IsNotAuthenticated])
    def login(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        user = User.objects.filter(email=email)

        if not user.exists():
            user = User.objects.filter(username=username)

        if not user.exists():
            return Response({'error': 'Credenciais inválidas'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = user.first()
        if not user.check_password(password):
            return Response({'error': 'Credenciais inválidas'}, status=status.HTTP_400_BAD_REQUEST)
        
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
    
    @action(detail=False, methods=['get'], url_path = "listar", permission_classes = [IsElaborador])
    def listarAlunos(self, request):
        lista_alunos = Aluno.objects.all()
        serializer = AlunoSerializer(lista_alunos, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'], url_path = "cadastro", permission_classes = [IsNotAuthenticated])
    def post(self, request):
        serializer = AlunoSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ElaboradorViewSet(viewsets.ModelViewSet):
    queryset = Elaborador.objects.none()
    serializer_class = ElaboradorSerializer
    
    @action(detail=False, methods=['post'], url_path = "cadastro", permission_classes = [AllowAny])
    def post(self, request):
        serializer = ElaboradorSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.none()
    serializer_class = ItemSerializer

    @action(detail=False, methods=['get'], url_path='elaborador/(?P<elaborador_id>[^/.]+)', permission_classes=[IsElaborador])
    def itensElaborador(self, request, elaborador_id):
        # View para o elaborador ver os itens que ele criou
        elaborador = get_object_or_404(Elaborador, pk=elaborador_id)
        item = Item.objects.filter(elaborador=elaborador).order_by("data_publicacao")
        serializer = ItemSerializer(item, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='(?P<item_id>[^/.]+)', permission_classes=[IsAlunoOrElaborador])
    def visualizarItem(self, request, item_id):
        if(hasattr(request.user.usuario, 'aluno')):
            queryset = Item.objects.filter(visibilidade = 'PU')

        elif(hasattr(request.user.usuario, 'elaborador')):
            queryset = Item.objects.filter(elaborador=request.user.usuario.elaborador) | Item.objects.filter(visibilidade = 'PU')
       
        item = get_object_or_404(queryset, pk=item_id)
        serializer = ItemSerializer(item)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='publico', permission_classes=[IsAlunoOrElaborador])
    def itensPublicos(self, request, pk = None):
        #View para o aluno ou elaborador ver todos os itens públicos
        item = Item.objects.filter(visibilidade = 'PU').order_by("data_publicacao") # Ordenar também pela data crescente
        serializer = ItemSerializer(item, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'], url_path='criar', permission_classes=[IsElaborador])
    def itemCriar(self, request):
        # View para o elaborador criar um item
        elaborador = get_object_or_404(Elaborador, id=request.user.usuario.elaborador.id)
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(elaborador=elaborador)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='(?P<item_id>[^/.]+)/responder', permission_classes=[IsAluno])
    def responder(self, request, pk=None, item_id=None):
        item = get_object_or_404(Item, pk=item_id)
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
        elaborador = get_object_or_404(Elaborador, id=request.user.usuario.elaborador.id)
        if serializer.is_valid():
            serializer.save(elaborador=elaborador)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='(?P<avaliacao_id>[^/.]+)/responder', permission_classes=[IsAluno])
    def avaliacaoResponder(self, request, avaliacao_id):
        serializer = RespostaAvaliacaoSerializer(data=request.data, many=True)
        avaliacao = get_object_or_404(Avaliacao, pk = avaliacao_id)
        if serializer.is_valid():
            serializer.save(avaliacao=avaliacao, aluno=request.user.usuario.aluno)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=False, methods=['get'], url_path='elaborador/listar', permission_classes=[IsElaborador])
    def AvaliacoesElaborador(self, request, pk = None):
        avaliacao = Avaliacao.objects.filter(elaborador=request.user.usuario.elaborador)
        serializer = AvaliacaoSerializer(avaliacao, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='(?P<avaliacao_id>[^/.]+)', permission_classes=[IsAlunoOrElaborador])
    def VisualizarAvaliacao(self, request, avaliacao_id):
        avaliacao = get_object_or_404(Avaliacao, id = avaliacao_id)
        itens_avaliacao = ItemAvaliacao.objects.filter(avaliacao = avaliacao)
        serializer_avaliacao = AvaliacaoSerializer(avaliacao)
        serializer = ItemAvaliacaoSerializer(itens_avaliacao, many=True)
        contexto = {
            'avaliacao': serializer_avaliacao.data, 'itens' : serializer.data
        }
        return Response(contexto)

    @action(detail=False, methods=['get'], url_path='(?P<avaliacao_id>[^/.]+)/respostas', permission_classes=[IsAlunoOrElaborador])
    def RespostasAvaliacao(self, request, avaliacao_id):
        avaliacao = get_object_or_404(Avaliacao, id = avaliacao_id)
        itens_avaliacao = ItemAvaliacao.objects.filter(avaliacao = avaliacao)
        respostas_itens = []

        for item_av in itens_avaliacao:
            respostas_itens += Resposta.objects.filter(item_avaliacao = item_av)

        serializer = RespostaAvaliacaoSerializer(respostas_itens, many = True)
        return Response(serializer.data)

class RespostaItemViewSet(viewsets.ModelViewSet):
    queryset = Resposta.objects.none()
    serializer_class = RespostaItemSerializer

    @action(detail=False, methods=['get'], url_path='item/(?P<item_id>[^/.]+)', permission_classes=[IsAluno])
    def resposta(self, request, pk=None, item_id=None):
        item = get_object_or_404(Item, pk=item_id)
        respostas = Resposta.objects.filter(item=item, aluno=request.user.usuario.aluno).order_by("data_hora")
        serializer = RespostaItemSerializer(respostas, many=True)
        return Response(serializer.data)

class TagViewSet(viewsets.ModelViewSet):
    permission_classes = [IsElaborador]
    queryset = Tag.objects.none()
    serializer_class = TagSerializer

    @action(detail=False, methods=['get','post'], url_path='item/(?P<item_id>[^/.]+)')
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
        