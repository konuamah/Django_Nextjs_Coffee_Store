import logging
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from django.shortcuts import get_object_or_404
from shop.models import Product
from .cart import Cart
from .serializers import CartAddProductSerializer
from django.utils.decorators import method_decorator

# Set up logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

# Create console handler
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)

# Create formatter
formatter = logging.Formatter('%(asctime)s [%(levelname)s] %(message)s')
console_handler.setFormatter(formatter)

# Add handler to logger
logger.addHandler(console_handler)

def debug_cart_state(request, operation):
    """Helper function to debug cart state"""
    cart_data = request.session.get('cart', {})
    session_key = request.session.session_key
    logger.debug(f"[{operation}] Session Key: {session_key}")
    logger.debug(f"[{operation}] Cart Data in Session: {cart_data}")
    logger.debug(f"[{operation}] Session Modified Flag: {request.session.modified}")
    return {
        'session_key': session_key,
        'cart_data': cart_data,
        'session_modified': request.session.modified
    }

def ensure_session(request):
    """Ensure a valid session exists and is properly configured"""
    if not request.session.session_key:
        request.session.create()
        logger.debug(f"Created new session with key: {request.session.session_key}")
    
    # Ensure session configuration
    request.session.set_expiry(settings.SESSION_COOKIE_AGE)
    
    # Log session state
    logger.debug(f"Session key: {request.session.session_key}")
    logger.debug(f"Session data: {dict(request.session)}")
    return request.session.session_key

def debug_cart_state(request, operation):
    """Helper function to debug cart state"""
    cart_data = request.session.get('cart', {})
    session_key = request.session.session_key
    logger.debug(f"[{operation}] Session Key: {session_key}")
    logger.debug(f"[{operation}] Cart Data in Session: {cart_data}")
    logger.debug(f"[{operation}] Session Modified Flag: {request.session.modified}")
    logger.debug(f"[{operation}] Session Cookie Age: {settings.SESSION_COOKIE_AGE}")
    logger.debug(f"[{operation}] Session Cookie Name: {settings.SESSION_COOKIE_NAME}")
    return {
        'session_key': session_key,
        'cart_data': cart_data,
        'session_modified': request.session.modified
    }

@ensure_csrf_cookie
@api_view(['POST'])
@permission_classes([AllowAny])
def cart_add(request, product_id=None):
    """Add a product to the cart"""
    logger.debug("=== Cart Add Operation Started ===")
    
    # Ensure session exists
    session_key = ensure_session(request)
    
    pre_state = debug_cart_state(request, "PRE-ADD")
    logger.debug(f"→ Cart ADD request received - Product ID: {product_id}")
    
    serializer = CartAddProductSerializer(data=request.data)
    
    if serializer.is_valid():
        cart = Cart(request)
        product_id = product_id or serializer.validated_data.get('product_id')
        
        try:
            product = get_object_or_404(Product, id=product_id)
            quantity = serializer.validated_data['quantity']
            override = serializer.validated_data['override']
            
            cart.add(product=product, quantity=quantity, override_quantity=override)
            request.session.modified = True  # Explicitly mark session as modified
            
            cart_items = list(cart)
            total_price = cart.get_total_price()
            
            post_state = debug_cart_state(request, "POST-ADD")
            logger.debug(f"✅ Product added successfully - Items in cart: {len(cart_items)}")
            
            response = Response({
                'message': 'Product added to cart',
                'cart': cart_items,
                'total_price': total_price,
                'debug_info': {
                    'pre_state': pre_state,
                    'post_state': post_state,
                }
            }, status=status.HTTP_201_CREATED)
            
            # Ensure session cookie is set in response
            if not request.COOKIES.get(settings.SESSION_COOKIE_NAME):
                response.set_cookie(
                    settings.SESSION_COOKIE_NAME,
                    session_key,
                    max_age=settings.SESSION_COOKIE_AGE,
                    httponly=True,
                    samesite='Lax'
                )
            
            return response
            
        except Exception as e:
            logger.error(f"❌ Error adding product: {str(e)}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    logger.warning(f"⚠️ Invalid request data: {serializer.errors}")
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@ensure_csrf_cookie
@api_view(['GET'])
@permission_classes([AllowAny])
def cart_detail(request):
    """Get cart details"""
    logger.debug("=== Cart Detail Operation Started ===")
    
    # Ensure session exists
    session_key = ensure_session(request)
    
    pre_state = debug_cart_state(request, "PRE-DETAIL")
    logger.debug("→ Cart DETAIL request received")
    
    try:
        cart = Cart(request)
        cart_items = list(cart)
        total_price = cart.get_total_price()
        
        post_state = debug_cart_state(request, "POST-DETAIL")
        logger.debug(f"✅ Cart retrieved - Items: {len(cart_items)}, Total: {total_price}")
        
        response = Response({
            'cart': cart_items,
            'total_price': str(total_price),
            'debug_info': {
                'pre_state': pre_state,
                'post_state': post_state,
            }
        }, status=status.HTTP_200_OK)
        
        # Ensure session cookie is set in response
        if not request.COOKIES.get(settings.SESSION_COOKIE_NAME):
            response.set_cookie(
                settings.SESSION_COOKIE_NAME,
                session_key,
                max_age=settings.SESSION_COOKIE_AGE,
                httponly=True,
                samesite='Lax'
            )
        
        return response
        
    except Exception as e:
        logger.error(f"❌ Error getting cart details: {str(e)}")
        return Response({'error': 'Error retrieving cart details'}, 
                       status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@ensure_csrf_cookie
@api_view(['POST'])
@permission_classes([AllowAny])
def cart_remove(request, product_id):
    """Remove a product from the cart"""
    logger.debug("=== Cart Remove Operation Started ===")
    
    # Ensure session exists
    session_key = ensure_session(request)
    
    pre_state = debug_cart_state(request, "PRE-REMOVE")
    logger.debug(f"→ Cart REMOVE request received - Product ID: {product_id}")
    
    try:
        cart = Cart(request)
        product = get_object_or_404(Product, id=product_id)
        
        cart.remove(product)
        request.session.modified = True  # Explicitly mark session as modified
        
        post_state = debug_cart_state(request, "POST-REMOVE")
        logger.debug(f"✅ Product {product_id} removed from cart")
        
        response = Response({
            'message': 'Product removed from cart',
            'debug_info': {
                'pre_state': pre_state,
                'post_state': post_state,
            }
        }, status=status.HTTP_204_NO_CONTENT)
        
        # Ensure session cookie is set in response
        if not request.COOKIES.get(settings.SESSION_COOKIE_NAME):
            response.set_cookie(
                settings.SESSION_COOKIE_NAME,
                session_key,
                max_age=settings.SESSION_COOKIE_AGE,
                httponly=True,
                samesite='Lax'
            )
        
        return response
        
    except Exception as e:
        logger.error(f"❌ Error removing product: {str(e)}")
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)