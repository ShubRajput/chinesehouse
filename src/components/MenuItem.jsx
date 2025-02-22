export default function MenuItem({ item, onAddToCart }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
      <div className="mt-2">
        {item.price && (
          <p className="text-gray-600">
            Half: ₹{item.price}
            {item.priceFull && ` | Full: ₹${item.priceFull}`}
            {item.priceGravy && ` | Gravy: ₹${item.priceGravy}`}
          </p>
        )}
        {item.description && (
          <p className="text-sm text-gray-500 mt-1">{item.description}</p>
        )}
      </div>
      <button
        onClick={() => onAddToCart(item)}
        className="mt-3 bg-orange-gradient hover:bg-orange-gradient-hover text-white px-4 py-2 rounded transition-all duration-300"
      >
        Add to Cart
      </button>
    </div>
  );
}