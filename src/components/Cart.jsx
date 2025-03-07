import { useEffect, useState } from "react";
import { API } from "../api/methods";

export default function Cart({
  sessionToken,
  onClose,
  onPlaceOrder
}) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!sessionToken) return;
        const response = await API.cart.fetchFromCart({ sessionToken });
        console.log("Respins efrom caer isn ",response);
        
        setCartItems(response.cart);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, [sessionToken]);

  useEffect(() => {
     console.log("cart item is :::::::", cartItems);
     
  }, [cartItems])

  const handleAddToCart = async (item) => {
    if (!sessionToken) {
      console.error("Session token is missing. Cannot add to cart.");
      return;
    }

    try {
      const response = await API.cart.addToCart({
        sessionToken,
        menuId: item.menuId,
        quantity: "1", // Default to 1, modify as needed
      });

      console.log("Added to cart successfully:", response);
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.menuId === item.menuId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleRemoveFromCart = async (item) => {
    if (!sessionToken) {
      console.error("Session token is missing. Cannot add to cart.");
      return;
    }

    try {
      const response = await API.cart.removeFromCart({
        sessionToken,
        menuId: item.menuId,
      });

      console.log("removed to cart successfully:", response);
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.menuId === item.menuId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleQuantityChange = async (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity < 1) return; // Prevent quantity going below 1

    try {
      const response = await API.cart.updateCart({
        sessionToken,
        menuId: item._id,
        quantity: newQuantity,
      });

      if (response.success) {
        setCartItems((prevItems) =>
          prevItems.map((cartItem) =>
            cartItem._id === item._id
              ? { ...cartItem, quantity: newQuantity }
              : cartItem
          )
        );
        updateCartCount(
          cartItems.reduce(
            (sum, item) =>
              sum + (item._id === item._id ? newQuantity : item.quantity),
            0
          )
        );
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">₹{item.price}</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded-lg"
                      onClick={() => handleRemoveFromCart(item)}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded-lg"
                      onClick={() => handleAddToCart(item)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-lg">₹{total}</span>
              </div>

              <button
                onClick={onPlaceOrder}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition-all duration-300"
              >
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
