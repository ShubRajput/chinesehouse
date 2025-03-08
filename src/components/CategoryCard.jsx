export default function CategoryCard({ categoryName, imageUrl, items, onCategoryClick }) {
  return (
    <div 
      onClick={onCategoryClick} // No need to pass category, it's already handled in App.jsx
      className="relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"/>
      <img 
        src={imageUrl} 
        alt={categoryName} // Use categoryName instead of category.name
        className="w-full h-64 object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
        <h3 className="text-2xl font-bold capitalize mb-2">{categoryName}</h3> {/* Fix here */}
        <p className="text-sm opacity-90">{items.length} items</p>
      </div>
    </div>
  );
}
