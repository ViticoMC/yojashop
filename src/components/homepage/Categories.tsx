const categories = [
  {
    id: 1,
    title: 'Comestibles',
    description: 'Productos básicos de alimentación para tu despensa diaria.',
    icon: '🍎'
  },
  {
    id: 2,
    title: 'Dulcería',
    description: 'Una amplia variedad de golosinas y postres para endulzar tus momentos.',
    icon: '🍬'
  },
  {
    id: 3,
    title: 'Higiene',
    description: 'Cuidado personal y artículos de aseo para toda la familia.',
    icon: '🧼'
  },
  {
    id: 4,
    title: 'Limpieza',
    description: 'Todo lo necesario para mantener tu hogar impecable y reluciente.',
    icon: '✨'
  },
  {
    id: 5,
    title: 'Farmacia',
    description: 'Medicamentos básicos y productos de salud para tu bienestar.',
    icon: '💊'
  }
];

export const Categories = () => {
  return (
    <section className="py-16 max-w-[1200px] mx-auto">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8 px-4 lg:px-0">
        {categories.map(cat => (
          <div key={cat.id} className="text-center p-4 group cursor-pointer">
            <div className="text-5xl mb-6 h-20 flex items-center justify-center bg-app-card rounded-2xl transition-all group-hover:scale-105 border border-transparent hover:border-secondary/30 shadow-sm group-hover:shadow-md">
              {cat.icon}
            </div>
            <h3 className="text-[1.1rem] font-bold mb-2 text-app-text">{cat.title}</h3>
            <p className="text-[0.85rem] text-gray-500 dark:text-gray-400 leading-relaxed">{cat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
