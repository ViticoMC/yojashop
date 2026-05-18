
interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

export function SearchBar({ className = "max-w-100", placeholder = "Buscar aquí" }: SearchBarProps) {
    return (
        <div className={`flex bg-app-card rounded-full p-1.5 pl-6 mb-8 border border-gray-200 dark:border-gray-700 shadow-md ${className}`}>
            <input 
              type="text" 
              placeholder={placeholder} 
              className="border-none bg-transparent flex-1 outline-none text-base text-app-text font-medium" 
            />
            <button className="bg-primary border-none w-11.25 h-11.25 rounded-full color-white cursor-pointer flex items-center justify-center text-white hover:bg-secondary hover:text-black transition-all active:scale-95 shadow-sm">
              <span className="text-xl">🔍</span>
            </button>
        </div>
    )
}
