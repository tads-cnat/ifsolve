from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from ifsolve import views
from drf_yasg import openapi
from drf_yasg.views import get_schema_view as swagger_get_schema_view

app_name = "ifsolve"

router = routers.DefaultRouter()
router.register(r'item', views.ItemViewSet)

schema_view = swagger_get_schema_view(
    openapi.Info(
        title = "IFSolve API",
        default_version = '1.0.0',
        description = "API para o projeto IFSolve",
    ),
    public = True,
)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]