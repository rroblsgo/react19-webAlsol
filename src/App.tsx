import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PropertiesList from './components/PropertiesList';
import PropertyDetail from './components/PropertyDetail';
import Cards from './components/Cards';
import ApiRest from './components/ApiRest';
import { fetchProperties } from './utils/fetchProperties';
import { Property } from './utils/parseProperties';
import { FilterProvider } from './context/FilterContext';

function getProvincias(properties: Property[]) {
  const provincias = properties.map((property) => property.provincia);
  return [...new Set(provincias)];
}

function getCiudades(properties: Property[]) {
  const ciudades = properties.map((property) => property.city);
  return [...new Set(ciudades)];
}

const App: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProperties = async () => {
      try {
        const fetchedProperties = await fetchProperties();
        setProperties(fetchedProperties);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    getProperties();
  }, []);

  if (loading) return <div>Loading properties...</div>;
  if (error) return <div>Error: {error}</div>;

  const provincias = getProvincias(properties);
  console.log(provincias);

  const ciudades = getCiudades(properties);
  console.log(ciudades);

  return (
    <FilterProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<PropertiesList properties={properties} />}
          />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/newreq" element={<ApiRest />} />
        </Routes>
      </Router>
    </FilterProvider>
  );
};

export default App;
