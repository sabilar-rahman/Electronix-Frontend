import { Link } from "react-router-dom";
import motherboardImage from "../../../assets/categoriesPhoto/motherboard.png";
import cpuImage from "../../../assets/categoriesPhoto/cpu.png";
import gpuImage from "../../../assets/categoriesPhoto/gpu.png";
import microphoneImage from "../../../assets/categoriesPhoto/microphone.png";
import monitorImage from "../../../assets/categoriesPhoto/monitor.png";
import ramImage from "../../../assets/categoriesPhoto/ram.png";
import speakerImage from "../../../assets/categoriesPhoto/speaker.png";
import ssdImage from "../../../assets/categoriesPhoto/ssd.png";
import thermalPasteImage from "../../../assets/categoriesPhoto/thermalPaste.png";
const Categories = () => {


  const categories = [
    {
      id: 1,
      name: "Motherboard",
      path: "motherboard",
      image: motherboardImage,
    },
    { id: 2, name: "CPU", path: "cpu", image: cpuImage },
    { id: 3, name: "GPU", path: "gpu", image: gpuImage },
    { id: 4, name: "Microphone", path: "microphone", image: microphoneImage },
    { id: 5, name: "Monitor", path: "monitor", image: monitorImage },
    { id: 6, name: "RAM", path: "ram", image: ramImage },
    { id: 7, name: "Speaker", path: "speaker", image: speakerImage },
    { id: 8, name: "SSD", path: "ssd", image: ssdImage },
    {
      id: 9,
      name: "Thermal Paste",
      path: "thermal-paste",
      image: thermalPasteImage,
    },
  ];
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 p-2">
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
            <h2 className="text-lg font-semibold text-gray-800 hover:text-red-500  ">
              {category.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
