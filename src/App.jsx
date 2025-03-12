import { useState, useEffect } from "react";
import Header from "./components/Header";
import MenuItem from "./components/MenuItem";
import CategoryCard from "./components/CategoryCard";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import { useSearchParams } from "react-router-dom";
import { API } from "./api/methods";

function App() {
  const [sessionToken, setSessionToken] = useState("");
  const [searchParams] = useSearchParams();
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showOrders, setShowOrders] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleAddToCart = async (item) => {
    if (!sessionToken) {
      console.error("Session token is missing. Cannot add to cart.");
      return;
    }

    try {
      const response = await API.cart.addToCart({
        sessionToken,
        menuId: item._id,
        quantity: "1", // Default to 1, modify as needed
      });

      console.log("Added to cart successfully:", response);
      setCartItems([...cartItems, item]); // Update local state if needed
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  useEffect(() => {
    console.log("ORder state isn ", orders);
  }, [orders]);

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        sessionToken,
      };
      console.log("orderData is", orderData);

      const orderResponse = await API.orders.placeorder(sessionToken);
      console.log("Order placed successfully:", orderResponse);

      setOrders([
        ...orders,
        { id: Date.now(), ...orderData, status: "Pending" },
      ]);
      setCartItems([]); // Clear local cart state
      setIsCartOpen(false);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };



  const fetchOrders = async () => {
    if (!sessionToken) {
      console.error("Session token is missing. Cannot fetch orders.");
      return;
    }

    try {
      const response = await API.orders.getsessionorders({ sessionToken });
      console.log("Fetched orders:", response);
      setOrders(response.orders); // Update the orders state with the fetched orders
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleOrdersClick = async () => {
    setShowOrders(true);
    await fetchOrders(); // Fetch orders when the user opens the orders section
  };

  const createSession = async (tableNumber) => {
    try {
      console.log("Sending table number:", tableNumber);
      const response = await API.session.getSession({ tableNumber });
      console.log("Session Created:", response);
      if (response.sessionToken) {
        setSessionToken(response.sessionToken); // Store sessionToken
        console.log("session token is :---->", sessionToken);
      }
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  useEffect(() => {
    const tableNo = searchParams.get("tableNo");
    if (tableNo && tableNo.trim() !== "") {
      console.log("Creating session with table number:", tableNo);
      createSession(tableNo);
    } else {
      console.error("Table number is missing or invalid");
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await API.categories.getmenu();
        setCategories(response);
      } catch (error) {
        console.log("Error fetching menu:", error);
      }
    };
    fetchMenu();
  }, []);

  useEffect(() => {
    console.log("Updated categories:", categories);
  }, [categories]);

  return (
    <div className="min-h-screen bg-secondary flex flex-col">
      <Header
        cartCount={cartItems.length}
        onCartClick={() => setIsCartOpen(true)}
        onOrdersClick={handleOrdersClick}
      />

      <main className="container mx-auto px-4 py-8 flex-grow">
        {!selectedCategory ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category._id}
                categoryName={category.name} // Pass category name as a separate prop
                imageUrl={category.imageUrl}
                items={category.menuItems}
                onCategoryClick={() => setSelectedCategory(category)}
              />
            ))}
          </div>
        ) : (
          <div>
            <div className="flex items-center mb-8">
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-white hover:text-primary transition-colors"
              >
                ← Back to Categories
              </button>
              <h2 className="text-2xl font-bold text-white ml-4 capitalize">
                {selectedCategory.name}
              </h2>
            </div>

            {selectedCategory.subCategories?.length > 0 ? (
              selectedCategory.subCategories.map((subCategory) => {
                const subCategoryItems =
                  categories
                    .find((cat) => cat._id === selectedCategory._id)
                    ?.menuItems?.filter(
                      (item) => item.subCategory === subCategory._id
                    ) || [];

                // **Only display the subcategory if it has items**
                return subCategoryItems.length > 0 ? (
                  <div key={subCategory._id} className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-4">
                      {subCategory.name}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {subCategoryItems.map((item) => (
                        <MenuItem
                          key={item._id}
                          item={item}
                          onAddToCart={handleAddToCart}
                        />
                      ))}
                    </div>
                  </div>
                ) : null;
              })
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories
                  .find((cat) => cat._id === selectedCategory._id)
                  ?.menuItems?.map((item) => (
                    <MenuItem
                      key={item._id}
                      item={item}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
      {/* Orders Section */}
      {showOrders && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Order Management</h2>
              <button
                onClick={() => setShowOrders(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {orders.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No orders yet</p>
            ) : (
              <div className="space-y-4">
                {(orders || []).map((order, index) => (
                  <div
                    key={order._id}
                    className="bg-white bg-opacity-5 backdrop-blur-lg rounded-lg p-6 border border-gray-200"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">Order #{index + 1}</p>{" "}
                        {/* Show Order Number */}
                        <p className="text-primary">
                          Total: ₹{order.totalPrice}
                        </p>
                        <div className="mt-2">
                          {(order.menuItems || []).map((item, index) => (
                            <p key={index} className="text-sm text-gray-600">
                              {item.item.name} - ₹{item.item.price} x{" "}
                              {item.quantity}
                            </p>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            order.status === "Ready"
                              ? "text-green-500"
                              : order.status === "Preparing"
                              ? "text-yellow-500"
                              : "text-blue-500"
                          }`}
                        ></p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {isCartOpen && (
        <Cart
          sessionToken={sessionToken}
          items={cartItems}
          onClose={() => setIsCartOpen(false)}
          onPlaceOrder={handlePlaceOrder}
        />
      )}
    </div>
  );
}

export default App;
