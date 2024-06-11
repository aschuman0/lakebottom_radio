import csv
import io
import uuid

from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db import transaction
from rest_framework import viewsets
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from lake_bottom_web.models import Live, Page, Show, ShowSongs, Song
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

        with transaction.atomic():
            show = Show(
                name=data.get("title"),
                about=data.get("about"),
                published=data.get("published"),
                slug=uuid.uuid4(),
            )
            show.save()

            if isinstance(data.get("file"), InMemoryUploadedFile):
                order = 0
                file = (  # normalize the weird iTunes format
                    data.get("file")
                    .read()
                    .decode("utf-8")
                    .replace("\r\n", "\n")
                    .replace("\r", "\n")
                )
                encoded_file = io.StringIO(file)
                song_dict = csv.DictReader(encoded_file, delimiter="\t")

                for song in song_dict:
                    title = song.get("Name")
                    artist = song.get("Artist")
                    album = song.get("Album")
                    year = song.get("Year")
                    genre = song.get("Genre")

                    # if the song matches, get Song obj from db
                    if Song.objects.filter(
                        title=title, artist=artist, album=album, year=year
                    ).exists():
                        target_song = Song.objects.filter(
                            title=title, artist=artist, album=album, year=year
                        ).first()
                    # otherwise, create a new Song obj
                    else:
                        target_song = Song(
                            title=title,
                            artist=artist,
                            album=album,
                            year=year,
                            genre=genre,
                            notes="",
                            slug=str(uuid.uuid4()),
                        )
                        target_song.save()

                    # create song to show association in intermediate table
                    association = ShowSongs(song=target_song, show=show, order=order)
                    association.save()
                    order += 1

                # show.save()
            else:
                return Response({"error": "Uploaded file could not be read."})

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
