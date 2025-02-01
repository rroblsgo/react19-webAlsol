import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import { Property } from '../utils/parseProperties';
import Pagination from './Pagination';
import { useSearchParams } from 'react-router-dom';
import { useFilterContext } from '../context/FilterContext';
import SearchBar from './SearchBar';

const PropertiesList: React.FC<{ properties: Property[] }> = ({
  properties,
}) => {
  const { filters, setFilters } = useFilterContext();
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Pagination state
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const itemsPerPage = 9;

  // Validate property price as a number
  // const parsePrice = (price: string | number | undefined): number => {
  //   return typeof price === 'number' ? price : parseFloat(price || '0');
  // };

  // Update filtered properties whenever the filters or properties change
  // useEffect(() => {
  //   const filterProperties = () => {
  //     const filtered = properties.filter((property) => {
  //       const matchesCity = city
  //         ? property.city?.toLowerCase().includes(city.toLowerCase())
  //         : true;

  //       const matchesPrice =
  //         (minPrice === '' ||
  //           parsePrice(property.price) >= parseFloat(minPrice)) &&
  //         (maxPrice === '' ||
  //           parsePrice(property.price) <= parseFloat(maxPrice));

  //       const matchesReference = reference
  //         ? property.ref?.toLowerCase().includes(reference.toLowerCase())
  //         : true;

  //       return matchesCity && matchesPrice && matchesReference;
  //     });

  //     setFilteredProperties(filtered);
  //   };

  //   filterProperties();
  // }, [city, minPrice, maxPrice, reference, properties]);
  useEffect(() => {
    const filtered = properties.filter((property) => {
      const matchesCity = filters.city
        ? property.city.toLowerCase().includes(filters.city.toLowerCase())
        : true;

      const matchesPrice =
        (filters.minPrice === '' ||
          Number(property.price) >= parseFloat(filters.minPrice)) &&
        (filters.maxPrice === '' ||
          Number(property.price) <= parseFloat(filters.maxPrice));

      const matchesReference = filters.reference
        ? property.ref?.toLowerCase().includes(filters.reference.toLowerCase())
        : true;

      return matchesCity && matchesPrice && matchesReference;
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
    <div className="bg-gray-100">
      <SearchBar
        totalProps={totalProps}
        city={filters.city}
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        reference={filters.reference}
        onCityChange={(value) =>
          setFilters((prev) => ({ ...prev, city: value }))
        }
        onMinPriceChange={(value) =>
          setFilters((prev) => ({ ...prev, minPrice: value }))
        }
        onMaxPriceChange={(value) =>
          setFilters((prev) => ({ ...prev, maxPrice: value }))
        }
        onReferenceChange={(value) =>
          setFilters((prev) => ({ ...prev, reference: value }))
        }
      />

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
    </div>
  );
};

export default PropertiesList;
