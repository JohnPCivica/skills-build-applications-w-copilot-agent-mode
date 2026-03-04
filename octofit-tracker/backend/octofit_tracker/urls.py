"""octofit_tracker URL Configuration."""

import os

from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path
from rest_framework import routers


codespace_name = os.environ.get('CODESPACE_NAME')
if codespace_name:
    base_url = f"https://{codespace_name}-8000.app.github.dev"
else:
    base_url = "http://localhost:8000"


router = routers.DefaultRouter()


def api_root(request):
    return JsonResponse(
        {
            "message": "Welcome to the OctoFit Tracker API",
            "base_url": base_url,
            "endpoints": {
                "api_root": f"{base_url}/api/",
                "admin": f"{base_url}/admin/",
            },
        }
    )

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_root, name='api-root'),
    path('api/', include(router.urls)),
]
