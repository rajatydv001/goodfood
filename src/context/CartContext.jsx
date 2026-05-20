import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const loadCartFromStorage = () => {
  try {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveCartToStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.findIndex(
        item => item.item.id === action.payload.item.id &&
        JSON.stringify(item.customizations) === JSON.stringify(action.payload.customizations)
      );
      
      if (existingIndex >= 0) {
        const newState = [...state];
        newState[existingIndex].quantity += action.payload.quantity;
        return newState;
      }
      return [...state, action.payload];
    }
    case 'REMOVE_ITEM':
      return state.filter((_, index) => index !== action.payload);
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return state.filter((_, index) => index !== action.payload.index);
      }
      const newState = [...state];
      newState[action.payload.index].quantity = action.payload.quantity;
      return newState;
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], loadCartFromStorage);

  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  const addItem = (item, quantity = 1, customizations = {}) => {
    dispatch({ type: 'ADD_ITEM', payload: { item, quantity, customizations } });
  };

  const removeItem = (index) => {
    dispatch({ type: 'REMOVE_ITEM', payload: index });
  };

  const updateQuantity = (index, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { index, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};