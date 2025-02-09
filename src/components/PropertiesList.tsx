import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import { Property } from '../utils/parseProperties';
import Pagination from './Pagination';
import { useSearchParams } from 'react-router-dom';
import { useFilterContext } from '../context/FilterContext';
import SearchBar from './SearchBar';

const PropertiesList: React.FC<{
  properties: Property[];
  provincias: string[];
  ciudadesPorProvincia: Record<string, string[]>;
  tipos: string[];
  agencias: string[];
  loading: boolean;
}> = ({
  properties,
  provincias,
  ciudadesPorProvincia,
  tipos,
  agencias,
  loading,
}) => {
  const { filters, setFilters } = useFilterContext();
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Pagination state
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const itemsPerPage = 9;

  useEffect(() => {
    const filtered = properties.filter((property) => {
      // ✅ Show all properties in the selected provincia, even if city is empty
      const matchesProvincia = filters.provincia
        ? property.provincia === filters.provincia
        : true;

      // const matchesCity = filters.city
      //   ? property.city.toLowerCase().includes(filters.city.toLowerCase())
      //   : true;

      const matchesCity = filters.city ? property.city == filters.city : true;

      const matchesTipo = filters.tipo
        ? property.tipo_ofer == filters.tipo
        : true;

      const matchesAgencia = filters.agencia
        ? property.agencia == filters.agencia
        : true;

      const matchesPrice =
        (filters.minPrice === '' ||
          Number(property.price) >= parseFloat(filters.minPrice)) &&
        (filters.maxPrice === '' ||
          Number(property.price) <= parseFloat(filters.maxPrice));

      const matchesReference = filters.reference
        ? property.ref?.toLowerCase().includes(filters.reference.toLowerCase())
        : true;

      return (
        matchesProvincia &&
        matchesCity &&
        matchesPrice &&
        matchesReference &&
        matchesTipo &&
        matchesAgencia
      );
    });

    setFilteredProperties(filtered);
  }, [filters, properties]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProperties = filteredProperties.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalProps = filteredProperties.length;

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  return (
    <div className="bg-top-nav bg-center bg-cover bg-no-repeat">
      {/* <div
      className="bg-cover bg-center bg-no-repeat min-h-[300px] sm:min-h-[400px] flex items-center justify-center"
      style={{ backgroundImage: "url('/menu-fondo.jpg')" }}
    > */}
      <SearchBar
        totalProps={totalProps}
        provincias={provincias}
        ciudadesPorProvincia={ciudadesPorProvincia}
        selectedProvincia={filters.provincia}
        selectedCity={filters.city}
        city={filters.city}
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        reference={filters.reference}
        tipos={tipos}
        selectedTipo={filters.tipo}
        agencias={agencias}
        selectedAgencia={filters.agencia}
        onProvinciaChange={(value) => {
          setFilters((prev) => ({ ...prev, provincia: value, city: '' }));
          setSearchParams({ page: '1' });
        }}
        onCityChange={(value) => {
          setFilters((prev) => ({ ...prev, city: value }));
          setSearchParams({ page: '1' });
        }}
        onMinPriceChange={(value) => {
          setFilters((prev) => ({ ...prev, minPrice: value }));
          setSearchParams({ page: '1' });
        }}
        onMaxPriceChange={(value) => {
          setFilters((prev) => ({ ...prev, maxPrice: value }));
          setSearchParams({ page: '1' });
        }}
        onReferenceChange={(value) => {
          setFilters((prev) => ({ ...prev, reference: value }));
          setSearchParams({ page: '1' });
        }}
        onTipoChange={(value) => {
          setFilters((prev) => ({ ...prev, tipo: value }));
          setSearchParams({ page: '1' });
        }}
        onAgenciaChange={(value) => {
          setFilters((prev) => ({ ...prev, agencia: value }));
          setSearchParams({ page: '1' });
        }}
      />
      {loading ? (
        // 🔹 Show Skeleton Loader Instead of Blank Screen
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-64 bg-gray-300 animate-pulse rounded-lg"
            ></div>
          ))}
        </div>
      ) : currentProperties.length > 0 ? (
        // 🔹 Show Properties Once Fetched
        <div className="bg-gray-100">
          <h1 className="text-2xl font-bold text-center mb-2"></h1>
          <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {currentProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No se encuentran propiedades
        </p>
      )}
    </div>
  );
};

export default PropertiesList;
