import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PropertiesList from './components/PropertiesList';
import PropertyDetail from './components/PropertyDetail';
import Cards from './components/Cards';
import ApiRest from './components/ApiRest';
import { fetchProperties } from './utils/fetchProperties';
import { fetchPropertiesAlsol } from './utils/fetchPropertiesAlsol';
import { Property } from './utils/parseProperties_Gica';
import { FilterProvider } from './context/FilterContext';

function getProvincias(properties: Property[]) {
  const provincias = properties.map((property) => property.provincia);
  return [...new Set(provincias)];
}

function getCiudadesPorProvincia(properties: Property[]) {
  const ciudadesPorProvincia: Record<string, string[]> = {};

  properties.forEach((property) => {
    if (!ciudadesPorProvincia[property.provincia]) {
      ciudadesPorProvincia[property.provincia] = [];
    }
    if (!ciudadesPorProvincia[property.provincia].includes(property.city)) {
      ciudadesPorProvincia[property.provincia].push(property.city);
    }
  });

  return ciudadesPorProvincia;
}

function getTipos(properties: Property[]) {
  const tipos = properties.map((property) => property.tipo_ofer);
  return [...new Set(tipos)];
}

function getAgencias(properties: Property[]) {
  const agencias = properties.map((property) => property.agencia);
  return [...new Set(agencias)];
}

const App: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProperties = async () => {
      try {
        const fetchedProperties = await fetchProperties();
        const fetchedPropertiesAlsol = await fetchPropertiesAlsol();

        setProperties(fetchedProperties.concat(fetchedPropertiesAlsol));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    getProperties();
  }, []);
  // console.log(properties);
  if (error) return <div>Error: {error}</div>;

  const provincias = getProvincias(properties);
  // console.log(provincias);
  const ciudadesPorProvincia = getCiudadesPorProvincia(properties);
  // console.log(ciudadesPorProvincia);
  const tipos = getTipos(properties).sort();
  // console.log(tipos);
  const agencias = getAgencias(properties).sort();
  // console.log(agencias);

  return (
    <FilterProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PropertiesList
                properties={properties}
                provincias={provincias}
                ciudadesPorProvincia={ciudadesPorProvincia}
                tipos={tipos}
                agencias={agencias}
                loading={loading}
              />
            }
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
