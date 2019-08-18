from django.forms import ModelForm

from lake_bottom_web.models import Show, Page, Live


class ShowForm(ModelForm):
    class Meta:
        model = Show
        fields = ('name', 'about', 'playlist_file', 'published')


class PageForm(ModelForm):
    class Meta:
        model = Page
        fields = ('title', 'page_body')


class LiveForm(ModelForm):
    class Meta:
        model = Live
        fields = ('is_live', 'stream_url')
