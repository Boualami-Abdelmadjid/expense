from django.db import models

class expenseModel(models.Model):
    
    id = models.AutoField(primary_key=True)
    expense = models.CharField( max_length=30)
    value = models.IntegerField(null=False)
    time = models.DateTimeField(auto_now_add=True)
    TransType = models.CharField(default= 'expense', max_length=30)
