from django.urls import path
from .views import OrderCreateAPIView

app_name = 'orders'  # Define app_name for namespacing

urlpatterns = [
    path('create/', OrderCreateAPIView.as_view(), name='order-create'),  # Ensure this path is correct

]
