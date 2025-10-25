from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import CurrentUserView, ProductViewSet, CartViewSet, CartItemViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')

router.register(r'cart', CartViewSet, basename='cart')
router.register(r'cart-items', CartItemViewSet, basename='cart-items')

urlpatterns = [
    path('me/', CurrentUserView.as_view(), name='current_user_data'),
    path('', include(router.urls))
]