import React from 'react';

interface SearchBarProps {
  totalProps: number;
  provincias: string[];
  ciudadesPorProvincia: Record<string, string[]>;
  selectedProvincia: string;
  selectedCity: string;
  city: string;
  minPrice: string;
  maxPrice: string;
  reference: string;
  onProvinciaChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onReferenceChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  totalProps,
  provincias,
  ciudadesPorProvincia,
  selectedProvincia,
  selectedCity,
  city,
  minPrice,
  maxPrice,
  reference,
  onProvinciaChange,
  onCityChange,
  onMinPriceChange,
  onMaxPriceChange,
  onReferenceChange,
}) => {
  return (
    <div className="h-custom-search flex items-center justify-center">
      <div className="p-4 rounded-md shadow-md  max-w-6xl mx-auto">
        <span className="text-2xl font-bold mb-4 flex flex-row justify-between">
          <p>Seleccionar Propiedades</p>
          <p>Total {totalProps}</p>
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Provincia Dropdown */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Provincia</label>
            <select
              value={selectedProvincia}
              onChange={(e) => onProvinciaChange(e.target.value)}
              className="border rounded-md p-2 w-full"
            >
              <option value="">Seleccione Provincia</option>
              {provincias.map((provincia) => (
                <option key={provincia} value={provincia}>
                  {provincia}
                </option>
              ))}
            </select>
          </div>
          {/* City Dropdown (Filtered by Provincia) */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Ciudad</label>
            <select
              value={selectedCity}
              onChange={(e) => onCityChange(e.target.value)}
              className="border rounded-md p-2 w-full"
              disabled={!selectedProvincia}
            >
              <option value="">Seleccione Ciudad</option>
              {selectedProvincia &&
                ciudadesPorProvincia[selectedProvincia]?.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          </div>
          {/* zona Dropdown (Filtered by city) */}
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
          {/* Price Range */}
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
          {/* Referencia cambiar a tipo dropdown */}
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
          {/* Agencia Dropdown  */}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
