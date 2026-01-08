const CategoryPills = () => {
    const categories = ["Computer Science", "Chemistry", "Mathematics", "Physics", "Botany", "Zoology", "Microbiology"];

    return (
        <section className="px-4 sm:px-6 lg:px-8 mb-20 bg-black">
            <div className="max-w-7xl mx-auto flex justify-center">
                <div className="flex flex-wrap gap-2 justify-center">
                    {categories.map((cat, i) => (
                        <button key={i} className="px-5 py-2 rounded-full bg-gray-900 text-gray-400 border border-gray-800 hover:border-gray-600 hover:text-white hover:bg-gray-800 font-light text-sm transition-all duration-300">
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryPills;
