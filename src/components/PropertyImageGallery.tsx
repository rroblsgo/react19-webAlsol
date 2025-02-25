import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface PropertyImage {
  url: string;
  tag: string;
}

interface PropertyImageGalleryProps {
  images: PropertyImage[];
  propertyTitle: string;
}

const PropertyImageGallery: React.FC<PropertyImageGalleryProps> = ({
  images,
  propertyTitle,
}) => {
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  const nextImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const closeLightbox = useCallback(() => {
    setShowLightbox(false);
  }, []);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showLightbox) return;

      switch (e.key) {
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'Escape':
          closeLightbox();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showLightbox, nextImage, prevImage, closeLightbox]);

  if (images.length === 0) {
    return <div className="text-gray-500">No images available</div>;
  }

  const handleShowAllPhotos = () => {
    setShowFullGallery(true);
  };

  const handleCloseGallery = () => {
    setShowFullGallery(false);
  };

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
    setShowLightbox(true);
  };

  // Preview Gallery Component (shown first)
  const PreviewGallery = () => (
    <div className="relative overflow-hidden rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 aspect-[16/9]">
        {/* <div className="grid grid-cols-2  gap-2 "> */}
        {/* Main large image */}
        <div
          className="relative md:col-span-2 md:row-span-2 cursor-pointer aspect-square md:aspect-auto"
          // className="relative md:col-span-2 cursor-pointer  aspect-[4/3]"
          onClick={() => openLightbox(0)}
        >
          <img
            src={images[0].url}
            alt={images[0].tag}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Smaller preview images */}
        {images.slice(1, 5).map((image, index) => (
          <div
            key={image.url}
            className="relative cursor-pointer overflow-hidden aspect-square md:aspect-auto"
            // className="relative cursor-pointer overflow-hidden aspect-square"
            onClick={() => openLightbox(index + 1)}
          >
            <img
              src={image.url}
              alt={image.tag}
              className="hidden md:block absolute inset-0 h-full w-full object-cover transition duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* See all photos button */}
      {images.length > 5 && (
        <button
          onClick={handleShowAllPhotos}
          className="absolute bottom-4 right-4 rounded-md bg-white px-4 py-2 font-medium text-gray-900 shadow-md transition hover:bg-gray-100"
        >
          Ver las {images.length} fotos
        </button>
      )}
    </div>
  );

  // Full Gallery Component with new layout
  const FullGallery = () => (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      {/* Fixed header */}
      <div className="sticky top-0 z-10 flex flex-col md:flex-row h-28 md:h-16 mt-4 md:mt-2  items-center justify-evenly border-b bg-white px-4">
        <button
          onClick={handleCloseGallery}
          className="flex items-center font-medium text-blue-600 text-lg"
        >
          <ChevronLeft className="mr-1 h-5 w-5" />
          Volver a Detalle
        </button>

        <div className="flex items-center">
          {/* <h1 className="mr-4 font-semibold">{propertyTitle}</h1> */}
          <h1 className="font-raleway text-lg md:text-xl  font-bold  mb-4 text-green-800">
            {propertyTitle}
          </h1>
          {/* <button className="mr-4 rounded-full border p-2">Save</button>
          <button className="mr-4 rounded-full border p-2">Share</button> */}
          {/* <button
            onClick={handleCloseGallery}
            className="rounded-full border p-2"
          >
            <X className="h-5 w-5" />
          </button> */}
        </div>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1250px] p-4">
          <div className="flex flex-col gap-4">
            {/* Process images in groups of 3 */}
            {images.reduce((acc: React.ReactNode[], _, index) => {
              if (index % 3 === 0) {
                const groupImages = images.slice(index, index + 3);
                acc.push(
                  <div key={index} className="flex flex-col gap-4">
                    {/* Large image */}
                    <div
                      className="h-[350px] md:h-[700px] w-full cursor-pointer overflow-hidden rounded-lg"
                      onClick={() => openLightbox(index)}
                    >
                      <img
                        src={groupImages[0].url}
                        alt={groupImages[0].tag}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Two smaller images */}
                    {groupImages.length > 1 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {groupImages.slice(1).map((image, i) => (
                          <div
                            key={image.url}
                            className="h-[350px] cursor-pointer overflow-hidden rounded-lg"
                            onClick={() => openLightbox(index + i + 1)}
                          >
                            <img
                              src={image.url}
                              alt={image.tag}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return acc;
            }, [])}
          </div>
        </div>
      </div>
    </div>
  );

  // Lightbox for individual image viewing
  const Lightbox = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <button
        onClick={closeLightbox}
        className="absolute right-4 top-4 text-white transition hover:opacity-80 "
        aria-label="Close lightbox"
      >
        <X className="h-8 w-8" />
      </button>

      <button
        onClick={prevImage}
        className="absolute left-4 text-white transition hover:opacity-80"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-10 w-10" />
      </button>

      <img
        src={images[activeImageIndex].url}
        alt={images[activeImageIndex].tag}
        className="max-h-screen max-w-screen-lg object-contain"
      />

      <button
        onClick={nextImage}
        className="absolute right-4 text-white transition hover:opacity-80"
        aria-label="Next image"
      >
        <ChevronRight className="h-10 w-10" />
      </button>

      <div className="absolute bottom-4 text-white">
        {activeImageIndex + 1} / {images.length}
      </div>
    </div>
  );

  return (
    <div className="property-image-gallery">
      {!showFullGallery && <PreviewGallery />}
      {showFullGallery && <FullGallery />}
      {showLightbox && <Lightbox />}
    </div>
  );
};

export default PropertyImageGallery;
