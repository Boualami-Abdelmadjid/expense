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
      expenseModel.objects.create(expense=itemObjectName, value=itemObjectNumber)
    return redirect('getExpenses', month=month)

@api_view(['GET',])
def getExepenses(request, month):
   if request.method == 'GET':
      expenses = expenseModel.objects.raw(f'SELECT * from expenses_expensemodel where "time" BETWEEN date("2022-{month}-01") And date("2022-{month}-31") ORDER BY -"time"')
      serializer = itemsSerializer(expenses, many=True)
      return Response(serializer.data)

def deleteItem(request, month):
  if request.method == 'POST':
    itemObject = json.loads(request.body)
    itemObjectName = itemObject['name']
    itemObjectNumber = itemObject['number']
    itemObjectDate = itemObject['time']
    expenseModel.objects.filter(expense = itemObjectName, value= itemObjectNumber, time=itemObjectDate).delete()
  return redirect('getExpenses', month=month)
    


