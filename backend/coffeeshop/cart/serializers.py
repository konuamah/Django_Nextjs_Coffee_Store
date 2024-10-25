# serializers.py
from rest_framework import serializers

class CartAddProductSerializer(serializers.Serializer):
    quantity = serializers.IntegerField(min_value=1, default=1)
    override = serializers.BooleanField(default=False)