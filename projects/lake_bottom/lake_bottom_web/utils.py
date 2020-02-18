import csv
import uuid

import spotipy

from lake_bottom_web.models import Song, ShowSongs


def add_show(show, song_dict):
    order = 0

    try:
        for song in song_dict:
            title = song.get('Name')
            artist = song.get('Artist')
            album = song.get('Album')
            year = song.get('Year')
            genre = song.get('Genre')

            # if the song matches, get Song obj from db
            if Song.objects.filter(title=title,
                                   artist=artist,
                                   album=album,
                                   year=year).exists():
                target_song = Song.objects.filter(title=title,
                                                  artist=artist,
                                                  album=album,
                                                  year=year).first()
            # otherwise, create a new Song obj
            else:
                target_song = Song(title=title,
                                   artist=artist,
                                   album=album,
                                   year=year,
                                   genre=genre,
                                   notes='',
                                   slug=str(uuid.uuid4()))
                target_song.save()

            # create song to show association in intermediate table
            association = ShowSongs(
                song=target_song,
                show=show,
                order=order
            )
            association.save()
            order += 1

        show.save()

        return True
    except Exception as e:
        print('Exception when adding show: {}'.format(e))

        return False


def show_from_spotify_uri(show, uri, remove=False):
    pass


def show_from_file(show, file_data, remove=False):
    tmp_list = []
    song_order = 0

    if remove:  # clears all songs on show
        show.songs.clear()

    for chunk in file_data.chunks():
        tmp_list.append(chunk.decode('utf-8'))
        encoded_file = '\r'.join(tmp_list).split('\r')
        reader = csv.DictReader(encoded_file, delimiter='\t')

        return add_show(show=show, song_dict=reader)
