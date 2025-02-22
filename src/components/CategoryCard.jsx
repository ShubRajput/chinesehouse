export default function CategoryCard({ category, items, onCategoryClick }) {
  const getImageForCategory = (category) => {
    const images = {
      starters: "https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=400",
      soups: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400",
      rice: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
      noodles: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=400",
      combos: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400"
    };
    return images[category] || images.starters;
  };

  return (
    <div 
      onClick={() => onCategoryClick(category)}
      className="relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"/>
      <img 
        src={getImageForCategory(category)} 
        alt={category}
        className="w-full h-64 object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
        <h3 className="text-2xl font-bold capitalize mb-2">{category}</h3>
        <p className="text-sm opacity-90">{items.length} items</p>
      </div>
    </div>
  );
}