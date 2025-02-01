import React, { useState } from 'react';

interface Image {
  url: string;
  tag: string;
}

interface ImageCarouselProps {
  images: Image[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const numFotos = images.length;

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (images.length === 0) {
    return <p className="text-center text-gray-500">No images available.</p>;
  }

  return (
    <div className="relative w-full h-max mx-auto">
      <img
        src={images[currentIndex].url}
        alt={images[currentIndex].tag || 'Property Image'}
        className="w-full h-full object-cover rounded-lg"
      />
      {images[currentIndex].tag && (
        <p className="text-center text-sm text-gray-500 mt-2">
          {numFotos} - {currentIndex + 1} - {images[currentIndex].tag}
        </p>
      )}

      {/* Left Arrow */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
        aria-label="Previous image"
      >
        ❮
      </button>

      {/* Right Arrow */}
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
        aria-label="Next image"
      >
        ❯
      </button>
    </div>
  );
};

export default ImageCarousel;
