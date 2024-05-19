from django.contrib import admin
from django.urls import include, re_path
from frontend import views as fe_views
from lake_bottom_web.urls import router as api_router

urlpatterns = [
    re_path(r"^api/", include(api_router.urls), name="api_base"),
    re_path(r"^admin/", admin.site.urls, name="django_admin"),
    re_path(r"^.*$", fe_views.spa_index, name="spa_index"),
]
