# project/urls.py (the main project directory)

from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('cart/', include('cart.urls', namespace='cart')),
    path('api/orders/', include('orders.urls', namespace='orders')),
    path('', include('shop.urls', namespace='shop')),  # Replace 'your_app_name' with the actual name of your app
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)