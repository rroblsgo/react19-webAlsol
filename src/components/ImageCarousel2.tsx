import React from 'react';

interface Image {
  url: string;
  tag: string;
}

interface ImageCarouselProps {
  images: Image[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  return (
    <div className="relative h-full max-w-6xl">
      <div className="flex overflow-x-scroll space-x-4 p-4">
        {images.map((image, index) => (
          <div key={index} className="flex-shrink-0">
            <img
              src={image.url}
              alt={image.tag || 'Property Image'}
              className="w-full h-96 object-cover rounded-lg"
            />
            {image.tag && (
              <p className="text-center text-sm text-gray-500 mt-2">
                {image.tag}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
