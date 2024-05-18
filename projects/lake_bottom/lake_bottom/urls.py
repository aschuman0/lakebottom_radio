"""lake_bottom URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  re_path(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  re_path(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  re_path(r'^blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import re_path
from frontend import views as fe_views

# from django.contrib.auth.views import (
#     PasswordResetView,
#     PasswordResetDoneView,
#     PasswordResetCompleteView,
#     PasswordResetConfirmView,
# )
from lake_bottom_web import views as api_views  # TODO change for new fe

urlpatterns = [
    re_path(
        r"^api/", api_views.index, name="api_base"
    ),  # TODO this should be namespaced with include once drf apis exist
    re_path(r"^admin/", admin.site.urls),
    re_path(r"^.*$", fe_views.spa_index, name="spa_index"),
]
