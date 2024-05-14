from django.shortcuts import render


# Create your views here.
def spa_index(request):
    return render(request, "index.html")
