# urls.py (inside your Django app)

from django.urls import path
from .views import ProductList, ProductDetail, CategoryList
app_name = 'shop'  # Set the app_name for the namespace

urlpatterns = [
    path('api/categories/', CategoryList.as_view(), name='category-list'),
    path('api/products/', ProductList.as_view(), name='product-list'),
    path('api/products/<int:id>/<slug:slug>/', ProductDetail.as_view(), name='product-detail'),
    path('api/products/category/<slug:category_slug>/', ProductList.as_view(), name='product-list-by-category'),
]
