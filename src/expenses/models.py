from django.db import models

class expenseModel(models.Model):
    expense = models.CharField( max_length=30)
    value = models.IntegerField(null=False)
    time = models.DateField(auto_now_add=True)