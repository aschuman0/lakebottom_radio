from rest_framework.serializers import (
    HyperlinkedModelSerializer,
    ReadOnlyField,
)

from lake_bottom_web.models import Show, ShowSongs, Song


class SongSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Song
        fields = ["title", "artist", "album", "year", "genre", "notes", "slug"]


class ShowSongsSerializer(HyperlinkedModelSerializer):
    title = ReadOnlyField(source="song.title")
    artist = ReadOnlyField(source="song.artist")
    album = ReadOnlyField(source="song.album")
    year = ReadOnlyField(source="song.year")
    genre = ReadOnlyField(source="song.genre")
    notes = ReadOnlyField(source="song.notes")
    slug = ReadOnlyField(source="song.slug")

    class Meta:
        model = ShowSongs
        fields = [
            "title",
            "artist",
            "album",
            "year",
            "genre",
            "notes",
            "slug",
            "order",
        ]


class ShowSerializer(HyperlinkedModelSerializer):
    songs = ShowSongsSerializer(source="showsongs_set", many=True)

    class Meta:
        model = Show
        fields = ["slug", "name", "about", "date_created", "published", "songs"]
