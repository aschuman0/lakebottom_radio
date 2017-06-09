from django.shortcuts import render, redirect

from lake_bottom_web.models import Show
from lake_bottom_web.forms import ShowForm

# Create your views here.
def index(request):
    # this is the main view
    shows = Show.objects.all()
    return render(request, 'index.html', {
        'shows': shows,
    })

def show_detail(request, slug):
    show = Show.objects.get(slug=slug)
    # TODO handle empty show with 404 response here
    
    return render(request, 'shows/show_detail.html', {
        'show': show,
    })

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