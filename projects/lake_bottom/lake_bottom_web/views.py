import datetime
import csv

import requests
from django.shortcuts import render, redirect
from django.template.defaultfilters import slugify
from django.contrib.auth.decorators import login_required

from lake_bottom_web.models import Show
from lake_bottom_web.forms import ShowForm

# Create your views here.
def index(request):
    # this is the main view
    if request.user.is_authenticated():
        # If loggged in show most recent 10 shows
        shows = Show.objects.all().order_by('date_created').reverse()[:10]
    else:
        # if not logged in show 5 most recent published shows
        shows = Show.objects.filter(published=True).order_by('date_created').reverse()[:5]

    media_url = 'http://lakebottom48.hopto.org/listen.m3u'

    # Check to see if the media_url can be hit if so render page with playbar.
    is_live = False

    try:
        r = requests.get(media_url)
        is_live = True
    except Exception as e:
        print('could not connect: %s' % e)
        pass

    # is_live = True # for testing
    if is_live:
        return render(request, 'live_index.html', {
            'shows': shows,
            'media_url': media_url,
        })
    else:
        return render(request, 'index.html', {
            'shows': shows,
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
    playlist = None

    if show.playlist_file:
        with open(show.playlist_file.path, 'rU') as f:
            playlist = list(csv.DictReader(f,delimiter="\t",dialect=csv.excel_tab))

    return render(request, 'shows/show_detail.html', {
        'show': show, 'playlist': playlist,
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
            #save new data
            form.save()
            return redirect('show_detail', slug=show.slug)
    # otherwise, just create the form
    else:
        form = form_class(instance=show)

    # then render the template
    return render(request, 'shows/edit_show.html', {
        'show': show,
        'form': form,
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
            show.slug = slugify(show.name)
            show.date_created = datetime.datetime.utcnow()
            # now with the proper slug, we can save the new object
            show.save()
            # redirect to the new show page
            return redirect('show_detail', slug=show.slug)

    # if just a GET, create the form
    else:
        form = form_class()
    
    return render(request, 'shows/create_show.html', {'form': form})
