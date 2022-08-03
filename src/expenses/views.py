import json
from django.http.response import HttpResponse, JsonResponse
from rest_framework.response import Response
from .models import expenseModel 
from rest_framework.decorators import api_view  
from .serializers import itemsSerializer
from django.shortcuts import redirect


def addItem(request, month):
    if request.method == 'POST':
      itemObject = json.loads(request.body)
      itemObjectName = itemObject['name']
      itemObjectNumber = itemObject['number']
      itemObjectType = itemObject['type']
      expenseModel.objects.create(expense=itemObjectName, value=itemObjectNumber, TransType=itemObjectType)
    return redirect('getExpenses', month=month)

@api_view(['GET',])
def getExepenses(request, month):
   if request.method == 'GET':
      expenses = expenseModel.objects.raw(f'SELECT * from expenses_expensemodel where "time" BETWEEN date("2022-{month}-01") And date("2022-{month}-31") ORDER BY time DESC')
      serializer = itemsSerializer(expenses, many=True)
      return Response(serializer.data)

def deleteItem(request, month):
  if request.method == 'POST':
    itemObject = json.loads(request.body)
    itemObjectId = itemObject['id']
    expenseModel.objects.filter(id = itemObjectId).delete()
  return redirect('getExpenses', month=month)
    


