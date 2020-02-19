from __future__ import unicode_literals

from django.db import models


SHOW_TYPES = [
    ('SURF', 'Surfbear Sez'),
    ('BOOGIE', 'Blacktail Boogie'),
]


# Create your models here.
class Song(models.Model):
    title = models.CharField(max_length=1027)
    artist = models.CharField(max_length=1027)
    album = models.CharField(max_length=1027)
    year = models.CharField(max_length=1027)
    genre = models.CharField(max_length=1027, default=None)
    notes = models.TextField(default=None)
    slug = models.SlugField(default=None)

    def __str__(self):
        return '{} - {}'.format(self.title, self.artist)


class Show(models.Model):
    name = models.CharField(max_length=255)
    about = models.TextField()
    playlist_file = models.FileField(upload_to='/tmp', null=True, blank=True)
    playlist_field = models.TextField()
    spotify_uri = models.CharField(max_length=255, blank=True)
    songs = models.ManyToManyField(
        Song,
        through='ShowSongs'
    )
    date_created = models.DateTimeField()
    published = models.BooleanField(default=True)
    slug = models.SlugField(unique=True)
    show_type = models.CharField(choices=SHOW_TYPES,
                                 max_length=15,
                                 default='SURF')

    class Meta:
        verbose_name = u'Show'

    def song_list(self):
        return [
            songs.song for songs in
            ShowSongs.objects.filter(show=self).order_by('order')
        ]

    def __str__(self):
        return self.name


class ShowSongs(models.Model):
    song = models.ForeignKey(Song)
    show = models.ForeignKey(Show)
    order = models.IntegerField()

    class Meta:
        verbose_name = "Songs for Show"
        ordering = ['order', ]

    def __str__(self):
        return '{} - {} - {}'.format(
            self.show.name,
            self.song.title,
            self.song.artist
        )


class Page(models.Model):
    title = models.CharField(max_length=255)
    page_body = models.TextField()
    last_updated = models.DateTimeField()
    page_name = models.SlugField(unique=True)

    def __str__(self):
        return self.title


class Live(models.Model):
    name = models.CharField(max_length=255)
    stream_url = models.CharField(max_length=1027)
    is_live = models.BooleanField(default=False)
    heading = models.CharField(max_length=255, default='')
    subheading = models.CharField(max_length=255, default='')

    def __str__(self):
        return self.name
