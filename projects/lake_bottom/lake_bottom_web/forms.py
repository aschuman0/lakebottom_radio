from django.forms import ModelForm

from lake_bottom_web.models import Show

class ShowForm(ModelForm):
    class Meta:
        model = Show
        fields = ('name', 'about', 'playlist_file', 'published')