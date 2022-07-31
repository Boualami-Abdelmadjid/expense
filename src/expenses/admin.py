from django.contrib import admin
from .models import expenseModel

class itemsAdmin(admin.ModelAdmin):
    list_display= ['id','expense', 'value','time','TransType']

admin.site.register(expenseModel, itemsAdmin)

