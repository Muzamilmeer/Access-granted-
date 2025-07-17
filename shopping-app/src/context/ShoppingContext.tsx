import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, CartItem, User, ShoppingContextType } from '../types';

const ShoppingContext = createContext<ShoppingContextType | undefined>(undefined);

export const useShoppingContext = () => {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error('useShoppingContext must be used within a ShoppingProvider');
  }
  return context;
};

interface ShoppingProviderProps {
  children: ReactNode;
}

export const ShoppingProvider: React.FC<ShoppingProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user] = useState<User | null>({
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com'
  });

  // Sample products data
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      description: 'Premium wireless headphones with noise cancellation and 30-hour battery life.',
      category: 'Electronics',
      rating: 4.8,
      inStock: true
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      description: 'Advanced smartwatch with health monitoring, GPS, and water resistance.',
      category: 'Electronics',
      rating: 4.6,
      inStock: true
    },
    {
      id: 3,
      name: 'Leather Backpack',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
      description: 'Vintage leather backpack perfect for work and travel.',
      category: 'Fashion',
      rating: 4.7,
      inStock: true
    },
    {
      id: 4,
      name: 'Coffee Maker',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=500&h=500&fit=crop',
      description: 'Programmable coffee maker with built-in grinder and thermal carafe.',
      category: 'Home',
      rating: 4.5,
      inStock: true
    },
    {
      id: 5,
      name: 'Running Shoes',
      price: 119.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
      description: 'Comfortable running shoes with advanced cushioning technology.',
      category: 'Sports',
      rating: 4.9,
      inStock: true
    },
    {
      id: 6,
      name: 'Wireless Speaker',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
      description: 'Portable wireless speaker with 360-degree sound and waterproof design.',
      category: 'Electronics',
      rating: 4.4,
      inStock: false
    },
    {
      id: 7,
      name: 'Yoga Mat',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop',
      description: 'Premium non-slip yoga mat with excellent grip and cushioning.',
      category: 'Sports',
      rating: 4.6,
      inStock: true
    },
    {
      id: 8,
      name: 'Sunglasses',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
      description: 'Stylish sunglasses with UV protection and polarized lenses.',
      category: 'Fashion',
      rating: 4.3,
      inStock: true
    }
  ]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const value: ShoppingContextType = {
    products,
    cart,
    user,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  };

  return (
    <ShoppingContext.Provider value={value}>
      {children}
    </ShoppingContext.Provider>
  );
};