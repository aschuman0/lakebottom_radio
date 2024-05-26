from django.contrib import admin
from django.urls import include, path, re_path
from frontend import views as fe_views
from lake_bottom_web.urls import router as api_router
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    re_path(r"^api/", include(api_router.urls), name="api_base"),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    re_path(r"^admin/", admin.site.urls, name="django_admin"),
    re_path(r"^.*$", fe_views.spa_index, name="spa_index"),
]
