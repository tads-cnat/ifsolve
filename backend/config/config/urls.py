from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from ifsolve import views
from drf_yasg import openapi
from drf_yasg.views import get_schema_view as swagger_get_schema_view
from ifsolve.permissions import AllowAny
from rest_framework_simplejwt.views import TokenVerifyView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

app_name = "ifsolve"

schema_view = swagger_get_schema_view(
    openapi.Info(
        title = "IFSolve API",
        default_version = '1.0.0',
        description = "API para o projeto IFSolve",
    ),
    public = True,
    permission_classes = (AllowAny,),   
)

router = routers.DefaultRouter()
router.register(r'item', views.ItemViewSet)
router.register(r'resposta', views.RespostaItemViewSet)
router.register(r'aluno', views.CadastroAlunoViewSet)
router.register(r'elaborador', views.CadastroElaboradorViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]