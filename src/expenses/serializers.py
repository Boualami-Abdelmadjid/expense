from rest_framework import serializers

from .models import expenseModel

class itemsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = expenseModel
        fields = ['id','expense','value','time', 'TransType']
