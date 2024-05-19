# from django.urls import path
from rest_framework import routers

import lake_bottom_web.views as api_views

router = routers.SimpleRouter()
router.register("song", api_views.SongsView)
router.register("show", api_views.ShowsViews)

# urlpatterns = [
#     path("song", api_views.SongsView.as_view(), name="songs_listing"),
#     path("show", api_views.ShowsViews.as_view(), name="shows_listing"),
# ]
