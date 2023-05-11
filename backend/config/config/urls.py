"""
Arquivo de configuração de URL para o projeto IFSolve.
"""

from drf_yasg import openapi
from drf_yasg.views import get_schema_view as swagger_get_schema_view
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from ifsolve import views
from ifsolve.permissions import AllowAny


APP_NAME = "ifsolve"

SchemaView = swagger_get_schema_view(
    openapi.Info(
        title="IFSolve API",
        default_version='1.0.0',
        description="API para o projeto IFSolve",
    ),
    public=True,
    permission_classes=(AllowAny,),
)

router = routers.DefaultRouter()
router.register(r'auth', views.AuthViewSet, basename='auth')
router.register(r'item', views.ItemViewSet, basename='item')
router.register(r'avaliacao', views.AvaliacaoViewSet, basename='avaliacao')
router.register(r'resposta', views.RespostaItemViewSet, basename='resposta')
router.register(r'aluno', views.AlunoViewSet, basename='aluno')
router.register(r'elaborador', views.ElaboradorViewSet, basename='elaborador')
router.register(r'tag', views.TagViewSet, basename='tag')
router.register(r'area', views.AreaViewSet, basename='area')


urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('swagger/', SchemaView.with_ui('swagger',
         cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', SchemaView.with_ui('redoc',
         cache_timeout=0), name='schema-redoc'),
]
