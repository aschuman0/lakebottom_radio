from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated

from lake_bottom_web.models import Live, Page, Show, Song
from lake_bottom_web.serializers import (
    LiveSerializer,
    PageSerializer,
    ShowDetailSerializer,
    ShowSerializer,
    SongSerializer,
)


class SongsView(viewsets.ModelViewSet):
    # permission_classes = [AllowAny]
    queryset = Song.objects.all().order_by("artist")
    serializer_class = SongSerializer
    lookup_field = "slug"


class ShowsViews(viewsets.ModelViewSet):
    # permission_classes = [AllowAny]
    queryset = Show.objects.all().order_by("date_created")
    serializer_class = ShowSerializer
    lookup_field = "slug"


class ShowsDetailView(viewsets.ModelViewSet):
    # permission_classes = [AllowAny]
    queryset = Show.objects.all().order_by("date_created")
    serializer_class = ShowDetailSerializer
    lookup_field = "slug"


class PageView(viewsets.ModelViewSet):
    # permission_classes = [AllowAny]
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    lookup_field = "page_name"


class LiveView(viewsets.ModelViewSet):
    # permission_classes = [AllowAny]
    queryset = Live.objects.all()
    serializer_class = LiveSerializer
    lookup_field = "name"
