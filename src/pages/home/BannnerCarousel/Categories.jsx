import { Link } from "react-router-dom";

const Categories = () => {

  const categories = [
    { id: 1, name: "Motherboard", path: "motherboard", image: "../../../assets/categoriesPhoto/motherboard.png" },
    { id: 2, name: "CPU", path: "cpu", image: "../../../assets/categoriesPhoto/cpu.png" },
    { id: 3, name: "GPU", path: 'gpu', image: "../../../assets/categoriesPhoto/gpu.png" },
    { id: 4, name: "Microphone", path: 'microphone', image: "../../../assets/categoriesPhoto/cpu.png" },
    { id: 5, name: "Monitor", path: 'monitor', image: "../../../assets/categoriesPhoto/cpu.png" },
    { id: 6, name: "RAM", path: 'ram', image: "../../../assets/categoriesPhoto/cpu.png" },
    { id: 7, name: "Speaker", path: 'speaker', image: "../../../assets/categoriesPhoto/cpu.png" },
    { id: 8, name: "SSD", path: 'ssd', image: "../../../assets/categoriesPhoto/cpu.png" },
    { id: 9, name: "Thermal Paste", path: 'thermal-paste', image: "../../../assets/categoriesPhoto/cpu.png" },
    // { id: 10, name: "CPU",path:cpu ,image: "../../../assets/categoriesPhoto/cpu.png" },

  ];
  return (

    <div className="container mx-auto">


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 p-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`categories/${category.path}`}
            className="flex flex-col items-center bg-white shadow-md hover:shadow-lg rounded-lg p-4 transition-shadow duration-200"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-20 h-20 object-cover mb-3"
            />
            <h2 className="text-lg font-semibold text-gray-800">{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
