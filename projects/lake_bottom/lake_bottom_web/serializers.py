from rest_framework.serializers import (
    HyperlinkedModelSerializer,
    ReadOnlyField,
)

from lake_bottom_web.models import Live, Page, Show, ShowSongs, Song


class SongSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Song
        fields = ["title", "artist", "album", "year", "genre", "notes", "slug"]


class ShowSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Show
        fields = ["slug", "name", "about", "date_created", "published"]


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


class ShowDetailSerializer(HyperlinkedModelSerializer):
    songs = ShowSongsSerializer(source="showsongs_set", many=True)

    class Meta:
        model = Show
        fields = ["slug", "name", "about", "date_created", "published", "songs"]


class PageSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Page
        fields = ("title", "page_body", "last_updated", "page_name")


class LiveSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Live
        fields = ("name", "heading", "subheading")
