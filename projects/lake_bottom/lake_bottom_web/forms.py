from django.forms import ModelForm

from lake_bottom_web.models import Show, Page, Live, Song


class ShowForm(ModelForm):
    class Meta:
        model = Show
        fields = ('name', 'about', 'show_type', 'spotify_uri',
                  'playlist_file', 'published')


class PageForm(ModelForm):
    class Meta:
        model = Page
        fields = ('title', 'page_body')


class LiveForm(ModelForm):
    class Meta:
        model = Live
        fields = ('heading', 'subheading', 'is_live')


class SongForm(ModelForm):
    class Meta:
        model = Song
        fields = ('title', 'artist', 'album', 'year', 'genre', 'notes')
