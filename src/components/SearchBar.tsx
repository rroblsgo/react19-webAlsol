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
  tipos: string[];
  selectedTipo: string;
  agencias: string[];
  selectedAgencia: string;
  onProvinciaChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onReferenceChange: (value: string) => void;
  onTipoChange: (value: string) => void;
  onAgenciaChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  totalProps,
  provincias,
  ciudadesPorProvincia,
  selectedProvincia,
  selectedCity,
  minPrice,
  maxPrice,
  reference,
  tipos,
  selectedTipo,
  agencias,
  selectedAgencia,
  onProvinciaChange,
  onCityChange,
  onMinPriceChange,
  onMaxPriceChange,
  onReferenceChange,
  onTipoChange,
  onAgenciaChange,
}) => {
  return (
    // <div className="h-custom-search flex items-center justify-center">
    <div
      className="h-custom-search bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: "url('/menu-fondo.jpg')" }}
    >
      <div className="p-4 border border-amber-500 rounded-md shadow-md  max-w-6xl mx-auto">
        <img src="/cropped-Logotipo-RE-Claim.png" alt="" />
        <span className="text-xl font-light mb-4 flex flex-row justify-between">
          <p>Seleccionar Criterios de Búsqueda</p>
          {totalProps > 0 ? (
            <p className="font-semibold">Total {totalProps}</p>
          ) : (
            <p>buscando / no encontradas</p>
          )}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Provincia Dropdown */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Provincia</label>
            <select
              value={selectedProvincia}
              // onChange={(e) => onProvinciaChange(e.target.value)}
              onChange={(e) => {
                const provincia = e.target.value;
                onProvinciaChange(provincia);
                onCityChange(''); // ✅ Reset city when provincia changes
              }}
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
            <label className="block font-medium mb-1">Población</label>
            <select
              value={selectedCity}
              onChange={(e) => onCityChange(e.target.value)}
              className="border rounded-md p-2 w-full"
              disabled={!selectedProvincia}
            >
              <option value="">Seleccione Población</option>
              {selectedProvincia &&
                ciudadesPorProvincia[selectedProvincia]?.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          </div>
          {/* zona Dropdown (Filtered by city) */}
          {/* <div className="mb-4">
            <label className="block font-medium mb-1">Ciudad(contiene)</label>
            <input
              type="text"
              value={city}
              placeholder="Ciudad"
              onChange={(e) => onCityChange(e.target.value)}
              className="border rounded-md p-2 w-full"
            />
          </div> */}
          {/* Referencia contiene */}
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
          {/* Price Range */}
          <div className="mb-4">
            <label className="block font-medium mb-1">
              Rango Precios de Venta
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
          {/* Tipo Dropdown */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Tipo Propiedad</label>
            <select
              value={selectedTipo}
              onChange={(e) => onTipoChange(e.target.value)}
              className="border rounded-md p-2 w-full"
            >
              <option value="">Seleccione Tipo</option>
              {tipos.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>
          {/* Agencia Dropdown */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Agencia</label>
            <select
              value={selectedAgencia}
              onChange={(e) => onAgenciaChange(e.target.value)}
              className="border rounded-md p-2 w-full"
            >
              <option value="">Seleccione Agencia</option>
              {agencias.map((agencia) => (
                <option key={agencia} value={agencia}>
                  {agencia}
                </option>
              ))}
            </select>
          </div>
          {totalProps === 0 && (
            <p className="text-red-500 font-semibold mb-4">
              Revisando los criterios de selección / Buscando
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
