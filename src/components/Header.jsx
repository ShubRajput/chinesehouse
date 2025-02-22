import { useState, useEffect } from 'react';
import { FaShoppingCart, FaClipboardList } from 'react-icons/fa';

export default function Header({ cartCount, onCartClick, onOrdersClick }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-black'
    }`}>
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="bg-orange-gradient bg-clip-text text-transparent text-2xl font-bold">
          The Great Chinese House & Wok
        </h1>
        <div className="flex gap-4">
          <button 
            onClick={onOrdersClick}
            className="bg-orange-gradient hover:bg-orange-gradient-hover p-2 rounded-full relative transition-all duration-300"
            title="Order Management"
          >
            <FaClipboardList className="text-white text-xl" />
          </button>
          <button 
            onClick={onCartClick}
            className="bg-orange-gradient hover:bg-orange-gradient-hover p-2 rounded-full relative transition-all duration-300"
            title="Shopping Cart"
          >
            <FaShoppingCart className="text-white text-xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}