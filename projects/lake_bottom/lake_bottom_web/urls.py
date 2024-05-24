# from django.urls import path
from rest_framework import routers

import lake_bottom_web.views as api_views

router = routers.SimpleRouter()
router.register("song", api_views.SongsView)
router.register("show", api_views.ShowsViews)
router.register("page", api_views.PageView)
router.register("live", api_views.LiveView)
router.register("show_detail", api_views.ShowsDetailView)
