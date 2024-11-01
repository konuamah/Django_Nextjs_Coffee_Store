from rest_framework import serializers
from .models import Order, OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product', 'price', 'quantity']

class OrderCreateSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['first_name', 'last_name', 'email', 'address', 'city', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)  # Optionally include items in the order details

    class Meta:
        model = Order
        fields = ['id', 'first_name', 'last_name', 'email', 'address', 'city', 'items']
