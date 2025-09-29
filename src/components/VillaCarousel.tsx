import React, { useState, useEffect } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const ImageSlider = ({ slides = [], autoSlide = true, interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // stabilize navigation functions so they can be safely used in effects
  const prevSlide = React.useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const nextSlide = React.useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  // Auto slide effect (hooks must run unconditionally)
  useEffect(() => {
    if (!autoSlide || slides.length === 0) return;
    const slideInterval = setInterval(nextSlide, interval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, interval, nextSlide, slides.length]);

  if (!slides.length) return null;

  // Handle swipe gestures
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      nextSlide(); // swipe left
    } else if (diff < -50) {
      prevSlide(); // swipe right
    }

    setTouchStartX(null);
  };

  return (
    <div className="relative w-full flex flex-col justify-center items-center bg-white py-8 sm:py-12">
      {/* Slider Container */}
      <div
        className="relative w-[92%] sm:w-[85%] lg:w-[75%] overflow-hidden rounded-xl shadow-md"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides Wrapper (Sliding Effect) */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, idx) => (
            <div key={idx} className="w-full flex-shrink-0 relative">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-[240px] sm:h-[400px] lg:h-[520px] object-cover"
              />

              {/* Overlay Info Card */}
              <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white px-4 sm:px-6 py-4 sm:py-6 backdrop-blur-sm">
                <h3 className="font-semibold mb-2 text-sm sm:text-lg lg:text-xl">
                  {slide.title}
                </h3>
                <p className="text-gray-200 leading-relaxed mb-3 text-xs sm:text-sm lg:text-base">
                  {slide.desc}
                </p>
                <Link to={"/Contact-us"}>
                  <button className="border border-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium hover:bg-white hover:text-black transition duration-300 rounded">
                    REQUEST A QUOTE →
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Left Arrow (Hidden on mobile) */}
        <div
          className="hidden sm:flex absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 cursor-pointer z-10"
          onClick={prevSlide}
        >
          <div className="bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition">
            <FaArrowLeft size="1.2rem" className="text-gray-700" />
          </div>
        </div>

        {/* Right Arrow (Hidden on mobile) */}
        <div
          className="hidden sm:flex absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 cursor-pointer z-10"
          onClick={nextSlide}
        >
          <div className="bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition">
            <FaArrowRight size="1.2rem" className="text-gray-700" />
          </div>
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="mt-4 flex gap-2 sm:gap-3">
        {slides.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer transition ${
              currentIndex === idx ? "bg-gray-800 scale-110" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
