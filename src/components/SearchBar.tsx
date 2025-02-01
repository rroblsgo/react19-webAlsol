import React from 'react';

interface SearchBarProps {
  totalProps: number;
  city: string;
  minPrice: string;
  maxPrice: string;
  reference: string;
  onCityChange: (value: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onReferenceChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  totalProps,
  city,
  minPrice,
  maxPrice,
  reference,
  onCityChange,
  onMinPriceChange,
  onMaxPriceChange,
  onReferenceChange,
}) => {
  return (
    <div className="bg-gray-100 ">
      <div className="p-4 rounded-md shadow-md  max-w-6xl mx-auto">
        <span className="text-2xl font-bold mb-4 flex flex-row justify-between">
          <p>Seleccionar Propiedades</p>
          <p>Total {totalProps}</p>
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="mb-4">
            <label className="block font-medium mb-1">Ciudad(contiene)</label>
            <input
              type="text"
              value={city}
              placeholder="Ciudad"
              onChange={(e) => onCityChange(e.target.value)}
              className="border rounded-md p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">
              Rango de precios de venta
            </label>
            <div className="flex space-x-4">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => onMinPriceChange(e.target.value)}
                className="border rounded-md p-2 w-1/2"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => onMaxPriceChange(e.target.value)}
                className="border rounded-md p-2 w-1/2"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Referencia (contiene)
            </label>
            <input
              type="text"
              value={reference}
              placeholder="Referencia"
              onChange={(e) => onReferenceChange(e.target.value)}
              className="border rounded-md p-2 w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
