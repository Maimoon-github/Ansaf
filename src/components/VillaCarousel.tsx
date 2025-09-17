import React, { useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const ImageSlider = ({ slides = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!slides.length) return null; // Prevent crash if no data

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full flex justify-center items-center bg-white py-[4rem]">
      {/* Background Image */}
      <img
        src={slides[currentIndex].image}
        alt={slides[currentIndex].title}
        className="w-[90%] h-auto object-cover rounded-[0.5rem]"
      />

      {/* Left Arrow */}
      <div
        className="absolute left-[6%] top-[50%] translate-y-[-50%] cursor-pointer z-10"
        onClick={prevSlide}
      >
        <div className="bg-white rounded-full p-[0.75rem] shadow-lg">
          <FaArrowLeft size="1.2rem" className="text-gray-600" />
        </div>
      </div>

      {/* Right Arrow */}
      <div
        className="absolute right-[6%] top-[50%] translate-y-[-50%] cursor-pointer z-10"
        onClick={nextSlide}
      >
        <div className="bg-white rounded-full p-[0.75rem] shadow-lg">
          <FaArrowRight size="1.2rem" className="text-gray-600" />
        </div>
      </div>

      {/* Info Card */}
      <div className="absolute bottom-[-3rem] bg-white shadow-xl rounded-[0.5rem] px-[2rem] py-[1.5rem] w-[90%] max-w-[30rem] text-center z-20">
        <h3 className="text-[1.125rem] font-semibold mb-[0.5rem]">
          {slides[currentIndex].title}
        </h3>
        <p className="text-[0.875rem] text-gray-600 leading-[1.4rem] mb-[1rem]">
          {slides[currentIndex].desc}
        </p>
        <button className="border border-gray-400 px-[1rem] py-[0.5rem] text-[0.875rem] font-medium hover:bg-gray-100 transition duration-200">
          REQUEST A QUOTE →
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-[-5.5rem] flex gap-[0.5rem] z-20">
        {slides.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-[0.75rem] h-[0.75rem] rounded-full cursor-pointer ${
              currentIndex === idx ? "bg-gray-800" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
