from rest_framework import viewsets

from lake_bottom_web.models import Show, Song
from lake_bottom_web.serializers import ShowSerializer, SongSerializer


class SongsView(viewsets.ModelViewSet):
    queryset = Song.objects.all().order_by("-artist")
    serializer_class = SongSerializer
    lookup_field = "slug"


class ShowsViews(viewsets.ModelViewSet):
    queryset = Show.objects.all().order_by("-date_created")
    serializer_class = ShowSerializer
    lookup_field = "slug"
