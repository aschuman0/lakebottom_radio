from django.contrib import admin

from lake_bottom_web.models import Show

# setup automatic slug creation
class ShowAdmin(admin.ModelAdmin):
    model = Show
    list_display = ('name', 'about',)
    prepopulated_fields = {'slug': ('name',)}

# Register your models here.
admin.site.register(Show, ShowAdmin)