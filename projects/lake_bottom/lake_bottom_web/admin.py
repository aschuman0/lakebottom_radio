from django.contrib import admin

from lake_bottom_web.models import Show, Page, Live, Song, ShowSongs


class ShowSongsInline(admin.TabularInline):
    model = ShowSongs
    extra = 1


# setup automatic slug creation
class ShowAdmin(admin.ModelAdmin):
    model = Show
    list_display = ("name", "about")
    inlines = (ShowSongsInline,)
    prepopulated_fields = {"slug": ("name",)}


class PageAdmin(admin.ModelAdmin):
    model = Page
    list_display = ("page_name", "title", "page_body", "last_updated")


class LiveAdmin(admin.ModelAdmin):
    model = Live
    list_display = ("name", "heading", "subheading", "stream_url", "is_live")


class SongAdmin(admin.ModelAdmin):
    model = Song
    list_display = ("title", "artist", "album", "year", "genre", "notes", "slug")


# Register your models here.
admin.site.register(Show, ShowAdmin)
admin.site.register(Page, PageAdmin)
admin.site.register(Live, LiveAdmin)
admin.site.register(Song, SongAdmin)
