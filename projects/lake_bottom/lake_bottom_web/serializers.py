from rest_framework.serializers import HyperlinkedModelSerializer

from lake_bottom_web.models import Show, Song


class SongSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Song
        fields = ["title", "artist", "album", "year", "genre", "notes"]


class ShowSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Show
        fields = ["name", "about", "songs", "date_created", "published"]
