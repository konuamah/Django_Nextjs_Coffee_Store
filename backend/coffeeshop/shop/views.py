# views.py
from rest_framework import generics
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer
from rest_framework.response import Response
from django.urls import reverse

class ProductList(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        category_slug = self.kwargs.get('category_slug')
        products = Product.objects.filter(available=True)
        if category_slug:
            products = products.filter(category__slug=category_slug)
        return products

class ProductDetail(generics.RetrieveAPIView):
    queryset = Product.objects.filter(available=True)
    serializer_class = ProductSerializer

    def get_object(self):
        id = self.kwargs.get('id')
        slug = self.kwargs.get('slug')
        return get_object_or_404(Product, id=id, slug=slug, available=True)

class CategoryList(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
