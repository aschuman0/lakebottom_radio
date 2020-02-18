import csv
import uuid
import os

from spotipy import SpotifyClientCredentials, Spotify

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


def show_from_spotify_uri(show, uri):
    # make client
    sp_id = os.getenv('SPOTIFY_ID')
    sp_secret = os.getenv('SPOTIFY_SECRET')
    creds_manager = SpotifyClientCredentials(client_id=sp_id,
                                             client_secret=sp_secret)
    sp_client = Spotify(client_credentials_manager=creds_manager)

    # get playlist information
    sp_playlist = sp_client.playlist(uri)
    
    # create list of dicts from playlist
    songs = sp_playlist.get('tracks', {}).get('items')

    show_songs = []
    for song in songs:
        track = song.get('track')
        name = track.get('name')
        artist = track.get('artists')[0].get('name')
        album = track.get('album', {}).get('name')
        year = track.get('album', {}).get('release_date')[:4]
        genre = ''  # looks like this is not in the api return :(

        show_song = {
            'Name': name,
            'Artist': artist,
            'Album': album,
            'Year': year,
            'Genre': genre
        }
        show_songs.append(show_song)

    # pass to add_show() which returns to the calling view
    return add_show(show=show, song_dict=show_songs)


def show_from_file(show, file_data):
    tmp_list = []
    song_order = 0

    for chunk in file_data.chunks():
        tmp_list.append(chunk.decode('utf-8'))
        encoded_file = '\r'.join(tmp_list).split('\r')
        reader = csv.DictReader(encoded_file, delimiter='\t')

        return add_show(show=show, song_dict=reader)
