from django.contrib import admin

from lake_bottom_web.models import Show, Page, Live

# setup automatic slug creation
class ShowAdmin(admin.ModelAdmin):
    model = Show
    list_display = ('name', 'about',)
    prepopulated_fields = {'slug': ('name',)}

class PageAdmin(admin.ModelAdmin):
    model = Page
    list_display = ('name', 'title', 'page_body', 'last_updated')

class LiveAdmin(admin.ModelAdmin):
    model = Live
    list_display = ('name','is_live')

# Register your models here.
admin.site.register(Show)
admin.site.register(Page)
admin.site.register(Live)