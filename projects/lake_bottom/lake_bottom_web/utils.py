import csv
import uuid

from lake_bottom_web.models import Song


def parse_show_songs(show, file_data, remove=False):
    tmp_list = []

    if remove:  # clears all songs on show
        show.songs.clear()

    for chunk in file_data.chunks():
        tmp_list.append(chunk.decode('utf-8'))
    try:
        encoded_file = '\r'.join(tmp_list).split('\r')
        reader = csv.DictReader(encoded_file, delimiter='\t')
        for song in reader:
            if Song.objects.filter(title=song['Name'],
                                   artist=song['Artist'],
                                   album=song['Album'],
                                   year=song['Year']).exists():
                new_song = Song.objects.filter(title=song['Name'],
                                               artist=song['Artist'],
                                               album=song['Album'],
                                               year=song['Year']).first()
            else:
                new_song = Song(title=song['Name'],
                                artist=song['Artist'],
                                album=song['Album'],
                                year=song['Year'],
                                genre=song['Genre'],
                                notes='',
                                slug=str(uuid.uuid4()))
                new_song.save()

            show.songs.add(new_song)

        show.save()

        return True

    except Exception as e:
        print('Exception when adding show: {}'.format(e))

        return False
