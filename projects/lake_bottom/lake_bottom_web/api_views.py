from models import Show, Song
from rest_framework import viewsets
from serializers import ShowSerializer, SongSerializer


class SongsView(viewsets.ModelViewSet):
    queryset = Song.objects.all().order_by("-artist")
    serializer_class = SongSerializer


class ShowsViews(viewsets.ModelViewSet):
    queryset = Show.objects.all().order_by("-date_created")
    serializer_class = ShowSerializer
