from django.contrib import admin
from .models import expenseModel

class itemsAdmin(admin.ModelAdmin):
    list_display= ['expense', 'value','time']

admin.site.register(expenseModel, itemsAdmin)

