import uuid

from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db import transaction
from rest_framework import viewsets
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from lake_bottom_web.models import Live, Page, Show, Song
from lake_bottom_web.serializers import (
    LiveSerializer,
    PageSerializer,
    ShowDetailSerializer,
    ShowSerializer,
    SongSerializer,
)


class SongsView(viewsets.ModelViewSet):
    queryset = Song.objects.all().order_by("artist")
    serializer_class = SongSerializer
    lookup_field = "slug"


class ShowsViews(viewsets.ModelViewSet):
    queryset = Show.objects.all().order_by("date_created")
    serializer_class = ShowSerializer
    lookup_field = "slug"

    @permission_classes([IsAuthenticated])
    def create(self, request: Request) -> Response:
        data = request.data

        if isinstance(data.get("file"), InMemoryUploadedFile):
            pass
        else:
            return Response({"error": "Uploaded file could not be read."})

        with transaction.atomic():
            show = Show(
                name=data.get("title"),
                about=data.get("about"),
                published=data.get("published"),
                playlist_file=data.get("file"),
                slug=uuid.uuid4(),
            )
            show.save()

        return Response({}, 200)


class ShowsDetailView(viewsets.ModelViewSet):
    queryset = Show.objects.all().order_by("date_created")
    serializer_class = ShowDetailSerializer
    lookup_field = "slug"


class PageView(viewsets.ModelViewSet):
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    lookup_field = "page_name"


class LiveView(viewsets.ModelViewSet):
    queryset = Live.objects.all()
    serializer_class = LiveSerializer
    lookup_field = "name"
