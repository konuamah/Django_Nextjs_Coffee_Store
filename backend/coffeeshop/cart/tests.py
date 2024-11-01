from django.test import TestCase, Client
from .models import Product, Category  # Ensure you import your models

class CartTests(TestCase):
    def setUp(self):
        self.client = Client()
        # Create a category for the product
        self.category = Category.objects.create(name="Beverages", slug="beverages")
        # Create a product associated with the category
        self.product = Product.objects.create(
            category=self.category,  # Assign the category here
            name="Espresso",
            slug="espresso",
            price="20.00"
        )

    def test_cart_add(self):
        # Your test code for adding to the cart
        response = self.client.post('/cart/add/1/', {'quantity': 10, 'override': False})
        self.assertEqual(response.status_code, 200)
        self.assertIn('Espresso', response.content.decode())

    def test_cart_detail(self):
        # Your test code for viewing the cart
        response = self.client.get('/cart/detail/')
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Espresso')
