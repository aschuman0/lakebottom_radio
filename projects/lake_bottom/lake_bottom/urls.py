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
from django.urls import include, re_path
from django.contrib import admin

# from django.contrib.auth.views import (
#     PasswordResetView,
#     PasswordResetDoneView,
#     PasswordResetCompleteView,
#     PasswordResetConfirmView,
# )

from lake_bottom_web import views

urlpatterns = [
    re_path(r"^$", views.index, name="home"),
    re_path(r"^shows/$", views.list_shows, name="list_shows"),
    re_path(r"^shows/create/$", views.create_show, name="create_show"),
    re_path(r"^shows/(?P<slug>[-\w]+)/$", views.show_detail, name="show_detail"),
    re_path(r"^shows/(?P<slug>[-\w]+)/edit/$", views.edit_show, name="edit_show"),
    re_path(r"^songs/(?P<slug>[-\w]+)/$", views.song_detail, name="song_detail"),
    re_path(r"^songs/(?P<slug>[-\w]+)/edit/$", views.edit_song, name="edit_song"),
    re_path(r"^p/(?P<slug>[-\w]+)/$", views.page_detail, name="page_detail"),
    re_path(r"^p/(?P<slug>[-\w]+)/edit/$", views.edit_page, name="edit_page"),
    re_path(r"^live/$", views.edit_live, name="edit_live"),
    # re_path(r'^accounts/password/reset/$', password_reset,
    #     {'template_name': 'registration/password_reset_Form.html'},
    #     name="password_reset"),
    # re_path(r'^accounts/password/reset/done/$', password_reset_done,
    #     {'template_name': 'registration/password_reset_done.html'},
    #     name="password_reset_done"),
    # re_path(r'^accounts/password/reset/(?P<uidb64>[0-9A-Za-z]+)-(?P<token>.+)/$',password_reset_confirm,
    #     {'template_name': 'registration/password_reset_confirm.html'},
    #     name="password_reset_confirm"),
    # re_path(r'^accounts/password/done/$', password_reset_complete,
    #     {'template_name': 'registration/password_reset_complete.html'},
    #     name="password_reset_complete"),
    re_path(r"^accounts/", include("registration.backends.simple.urls")),
    re_path(r"^admin/", admin.site.urls),
]
