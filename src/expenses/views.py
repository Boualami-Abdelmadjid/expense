import json
from django.http.response import HttpResponse, JsonResponse
from rest_framework.response import Response
from .models import expenseModel 
from rest_framework.decorators import api_view  
from .serializers import itemsSerializer


def addItem(request):
    if request.method == 'POST':
      itemObject = json.loads(request.body)
      itemObjectName = itemObject['name']
      itemObjectNumber = itemObject['number']
      expenseModel.objects.create(expense=itemObjectName, value=itemObjectNumber)
    return HttpResponse('This is for communication only')

@api_view(['GET',])
def getExepenses(request, month):
   if request.method == 'GET':
      expenses = expenseModel.objects.raw(f'SELECT * from expenses_expensemodel where "time" BETWEEN date("2022-{month}-01") And date("2022-{month}-31") ORDER BY -"time"')
      serializer = itemsSerializer(expenses, many=True)
      return Response(serializer.data)

def deleteItem(request):
  if request.method == 'POST':
    itemObject = json.loads(request.body)
    itemObjectName = itemObject['name']
    itemObjectNumber = itemObject['number']
    itemObjectDate = itemObject['time']
    expenseModel.objects.filter(expense = itemObjectName, value= itemObjectNumber, time=itemObjectDate).delete()
  return HttpResponse('This is for communication only')
    


