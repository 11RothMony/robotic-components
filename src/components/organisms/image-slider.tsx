import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const slides = ["/assets/image-30.png", "/assets/image-31.png"]; // Replace with actual image URLs

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle click to change slide
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-none cursor-pointer"
      onClick={nextSlide}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={slides[current]}
          src={slides[current]}
          alt={`Slide ${current + 1}`}
          className="w-full h-full object-cover "
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
    </div>
  );
}
