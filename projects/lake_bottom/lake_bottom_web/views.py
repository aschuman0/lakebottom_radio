import datetime
import uuid

from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import Http404
from django.contrib import messages

from lake_bottom_web.models import Show, Page, Live, Song
from lake_bottom_web.forms import ShowForm, PageForm, LiveForm, SongForm
from lake_bottom_web.utils import parse_show_songs


# Create your views here.
def index(request):
    # this is the main view
    if request.user.is_authenticated():
        # If loggged in show most recent 10 shows
        shows = Show.objects.all().order_by('date_created').reverse()[:10]
    else:
        # if not logged in show 5 most recent published shows
        shows = Show.objects.filter(published=True).order_by('date_created').reverse()[:5]

    try:
        stream_info = Live.objects.get(name='main')
    except Exception as e:
        print('error getting live obj: %s' % e)

    if stream_info.is_live:
        return render(request, 'live_index.html', {
            'shows': shows,
            'media_url': stream_info.stream_url,
            'heading': stream_info.heading,
            'subheading': stream_info.subheading
        })

    return render(request, 'index.html', {
        'shows': shows,
        'heading': stream_info.heading,
        'subheading': stream_info.subheading
    })


def list_shows(request):
    if request.user.is_authenticated():
        # If loggged in show most recent 10 shows
        shows = Show.objects.all().order_by('date_created').reverse()
    else:
        # if not logged in show 5 most recent published shows
        shows = Show.objects.filter(published=True).order_by('date_created').reverse()

    return render(request, 'shows/show_list.html', {
        'shows': shows,
    })


def show_detail(request, slug):
    show = Show.objects.get(slug=slug)
    stream_info = Live.objects.get(name='main')
    playlist = show.songs.all()

    if stream_info.is_live:
        return render(request, 'shows/live_show.html', {
            'show': show,
            'playlist': playlist,
            'media_url': stream_info.stream_url
        })

    return render(request, 'shows/show_detail.html', {
        'show': show, 'playlist': playlist,
    })


def song_detail(request, slug):
    song = Song.objects.get(slug=slug)
    shows = song.show_set.all()

    return render(request, 'shows/song_detail.html', {
        'song': song, 'shows': shows
    })


def page_detail(request, slug):
    try:
        page = Page.objects.get(page_name=slug)
    except Exception as e:
        raise Http404(e.message)

    return render(request, 'pages/page.html', {'page': page})


@login_required
def edit_song(request, slug):
    song = Song.objects.get(slug=slug)

    form_class = SongForm

    if request.method == 'POST':
        form = form_class(data=request.POST, instance=song)
        if form.is_valid():
            form.save()
            messages.success(request, 'Show changes saved.')

            return redirect('song_detail', slug=song.slug)
    else:
        form = form_class(instance=song)

    return render(request, 'shows/edit_song.html', {
        'song': song, 'form': form
    })


@login_required
def edit_show(request, slug):
    # get the object realted to the passed in slug
    show = Show.objects.get(slug=slug)

    # set the form being used
    form_class = ShowForm

    # if we ae coming to this view from a submitted form...
    if request.method == 'POST':
        # get the data from the submitted for and apply to the form
        form = form_class(data=request.POST, instance=show)
        if form.is_valid():
            show = form.save(commit=False)
            
            show.save()

            # load the show's newly saved file to get songs
            if len(request.FILES) > 0:
                file = request.FILES['playlist_file']
            else:
                file = None
            
            if file:
                if parse_show_songs(show=show, file_data=file, remove=True):
                    messages.success(request, 'Show Changes Saved.')
                else:
                    messages.success(request,
                                     'Problem changing songs. Please try again or edit show.')

            return redirect('show_detail', slug=show.slug)
    
    # otherwise, just create the form
    else:
        form = form_class(instance=show)

    # then render the template
    return render(request, 'shows/edit_show.html', {
        'show': show, 'form': form,
    })


@login_required
def create_show(request):

    form_class = ShowForm

    # if we are coming from a submitted form, do this
    if request.method == 'POST':
        form = form_class(request.POST, request.FILES)
        if form.is_valid():
            # create a show instance, but do not yet save
            show = form.save(commit=False)
            # create the slug
            show.slug = str(uuid.uuid4())
            show.date_created = datetime.datetime.utcnow()
            # now with the proper slug, we can save the new object
            show.save()

            # load the show's newly saved file to get songs
            file = request.FILES['playlist_file']
            
            if parse_show_songs(show=show, file_data=file):
                messages.success(request, 'New Show Added.')
            else:
                messages.success(request, 'Problem adding songs to show. Please try again or edit show.')
            
            return redirect('show_detail', slug=show.slug)

    # if just a GET, create the form
    else:
        form = form_class()

    return render(request, 'shows/create_show.html', {'form': form})


@login_required
def edit_page(request, slug):
    try:
        page = Page.objects.get(page_name=slug)
    except Exception as e:
        print('error on edit_page: %s' % e)
        raise Http404()

    form_class = PageForm

    if request.method == 'POST':
        form = form_class(data=request.POST, instance=page)
        if form.is_valid():
            form.save()
            messages.success(request, 'Page Chages Saved.')
            return redirect('page_detail', slug=page.page_name)
    else:
        form = form_class(instance=page)

    return render(request, 'pages/edit_page.html', {
        'page': page, 'form': form
    })


@login_required
def edit_live(request):
    try:
        live_info = Live.objects.get(name='main')
    except Exception as e:
        print('could not load live_info to edit: %s' % e)

    form_class = LiveForm

    if request.method == 'POST':
        form = form_class(data=request.POST, instance=live_info)
        if form.is_valid():
            form.save()
            
            return redirect('home')
    else:
        form = form_class(instance=live_info)

    return render(request, 'edit_live.html', {
        'form': form
    })
