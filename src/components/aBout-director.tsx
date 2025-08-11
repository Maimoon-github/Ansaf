import React from "react";

// Import your images
import director1 from "@/assets/director1.png";
import director2 from "@/assets/director2.png";
import director3 from "@/assets/director3.png";

const directors = [
  {
    name: "Judith Howard",
    title: "CEO/Owner",
    image: director1,
  },
  {
    name: "Judith Howard",
    title: "CEO/Owner",
    image: director2,
  },
  {
    name: "Judith Howard",
    title: "CEO/Owner",
    image: director3,
  },
];

const BoardOfDirectors = () => {
  return (
    <section className="py-16 bg-white px-9">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-12 items-start">
        
        {/* === Left Text Column === */}
        <div className="flex-1">
          <h4 className="text-blue-700 font-semibold mb-2">Leadership</h4>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Board Of Director</h2>
          <div className="h-1 w-16 bg-orange-400 mb-4" />
          <p className="text-gray-600">
            We follow starting from the pre-construction, budgeting and conceptual phase and carrying through the final project documentation
          </p>
        </div>

        {/* === Director Cards === */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {directors.map((director, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={director.image}
                alt={director.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold text-lg">{director.name}</h4>
                <p className="text-sm text-gray-500">{director.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BoardOfDirectors;
