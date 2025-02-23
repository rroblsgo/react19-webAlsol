import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PropertiesList from './components/PropertiesList';
import PropertyDetail from './components/PropertyDetail';
import Cards from './components/Cards';
import ApiRest from './components/ApiRest';
import { fetchProperties } from './utils/fetchProperties';
import { fetchPropertiesAlsol } from './utils/fetchPropertiesAlsol';
import { Property } from './utils/parseProperties_Gica';
import { FilterProvider } from './context/FilterContext';
// import DisplayImages from './components/DisplayImages';

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
  const isFetched = useRef(false); // ✅ Prevents double fetching

  // Fetch the first set of properties immediately
  useEffect(() => {
    const getPropertiesAlsol = async () => {
      try {
        const fetchedPropertiesAlsol = await fetchPropertiesAlsol();
        setProperties(fetchedPropertiesAlsol);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    getPropertiesAlsol();
  }, []);

  // Fetch the second set in the background
  useEffect(() => {
    const getPropertiesGica = async () => {
      if (isFetched.current) return; // ✅ Prevent double fetch
      isFetched.current = true;
      try {
        const fetchedPropertiesGica = await fetchProperties();
        setProperties((prev) => [...prev, ...fetchedPropertiesGica]); // ✅ Merge properties
      } catch (err) {
        setError((err as Error).message);
      }
    };
    getPropertiesGica();
  }, []);
  // console.log('Properties count:', properties.length);
  // console.log(properties);

  if (error) return <div>Error: {error}</div>;

  const provincias = getProvincias(properties);
  // console.log(provincias);
  const ciudadesPorProvincia = getCiudadesPorProvincia(properties);
  // console.log(ciudadesPorProvincia);
  const tipos = getTipos(properties).sort();
  // console.log(tipos);
  const agencias = getAgencias(properties).sort();

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
          <Route
            path="/property/:id"
            element={<PropertyDetail properties={properties} />}
          />
          <Route path="/cards" element={<Cards />} />
          {/* <Route
            path="/property/images/:id"
            element={<DisplayImages properties={properties} />}
          /> */}
          <Route path="/newreq" element={<ApiRest />} />
        </Routes>
      </Router>
    </FilterProvider>
  );
};

export default App;
