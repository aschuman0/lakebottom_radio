from django.contrib import admin

from lake_bottom_web.models import Show, Page, Live, Song


# setup automatic slug creation
class ShowAdmin(admin.ModelAdmin):
    model = Show
    list_display = ('name', 'about', 'songs')
    prepopulated_fields = {'slug': ('name',)}


class PageAdmin(admin.ModelAdmin):
    model = Page
    list_display = ('page_name', 'title', 'page_body', 'last_updated')


class LiveAdmin(admin.ModelAdmin):
    model = Live
    list_display = ('name','is_live')


class SongAdmin(admin.ModelAdmin):
    model = Song
    list_display = ('title', 'artist, album','year')


# Register your models here.
admin.site.register(Show)
admin.site.register(Page)
admin.site.register(Live)
admin.site.register(Song)
