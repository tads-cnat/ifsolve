from rest_framework import permissions

class IsElaborador(permissions.BasePermission):
    """
    Permissão para elaboradores.
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated and hasattr(request.user.usuario, 'elaborador')

class IsAluno(permissions.BasePermission):
    """
    Permissão para alunos.
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated and hasattr(request.user.usuario, 'aluno')

class AllowAny(permissions.BasePermission):
    """
    Permissão para qualquer usuário.
    """

    def has_permission(self, request, view):
        return True