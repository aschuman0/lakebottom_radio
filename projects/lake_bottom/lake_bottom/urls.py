"""lake_bottom URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.auth.views import (
    password_reset,
    password_reset_done,
    password_reset_confirm,
    password_reset_complete
)

from lake_bottom_web import views

urlpatterns = [
    url(r'^$', views.index, name='home'),
    url(r'^shows/$', views.list_shows, name='list_shows'),
    url(r'^shows/create/$', views.create_show, name='create_show'),
    url(r'^shows/(?P<slug>[-\w]+)/$', views.show_detail,
        name='show_detail'),
    url(r'^shows/(?P<slug>[-\w]+)/edit/$', views.edit_show,
        name='edit_show'),
    url(r'^songs/(?P<slug>[-\w]+)/$', views.song_detail,
        name='song_detail'),
    url(r'^songs/(?P<slug>[-\w]+)/edit/$', views.edit_song,
        name='edit_song'),
    url(r'^p/(?P<slug>[-\w]+)/$', views.page_detail,
        name='page_detail'),
    url(r'^p/(?P<slug>[-\w]+)/edit/$', views.edit_page,
        name='edit_page'),
    url(r'^live/$', views.edit_live, name='edit_live'),
    url(r'^accounts/password/reset/$', password_reset,
        {'template_name': 'registration/password_reset_Form.html'},
        name="password_reset"),
    url(r'^accounts/password/reset/done/$', password_reset_done,
        {'template_name': 'registration/password_reset_done.html'},
        name="password_reset_done"),
    url(r'^accounts/password/reset/(?P<uidb64>[0-9A-Za-z]+)-(?P<token>.+)/$',password_reset_confirm, 
        {'template_name': 'registration/password_reset_confirm.html'},
        name="password_reset_confirm"),
    url(r'^accounts/password/done/$', password_reset_complete,
        {'template_name': 'registration/password_reset_complete.html'},
        name="password_reset_complete"),
    url(r'^accounts/', include('registration.backends.simple.urls')),
    url(r'^admin/', admin.site.urls),
]
