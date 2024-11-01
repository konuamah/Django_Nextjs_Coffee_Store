import requests

# Base URL for the API
BASE_URL = "http://127.0.0.1:8000/cart"

def test_add_to_cart(product_id=1):
    """Test adding an item to the cart"""
    url = f"{BASE_URL}/add/{product_id}/"  # Include product_id in the URL
    headers = {"Content-Type": "application/json"}
    data = {
        "quantity": 2,
        "override": True
    }
    
    response = requests.post(url, json=data, headers=headers)
    
    # Output the response for debugging
    print(f"Response Code: {response.status_code}")
    print(f"Response Content: {response.text}")
    
    # Check the response status code
    if response.status_code in [200, 201]:
        print("Test passed!")
    else:
        print(f"Test failed! Unexpected status code: {response.status_code}")
    
    # Optionally, check the response content if needed
    if response.status_code == 200 or response.status_code == 201:
        response_data = response.json()
        # Check if response data includes product_id and matches the input
        if response_data.get("product_id") == product_id:
            print("Product ID matches.")
        else:
            print("Product ID does not match.")
        
        if response_data.get("quantity") == data["quantity"]:
            print("Quantity matches.")
        else:
            print("Quantity does not match.")
        
        if response_data.get("override") == data["override"]:
            print("Override flag matches.")
        else:
            print("Override flag does not match.")

if __name__ == "__main__":
    test_add_to_cart()
