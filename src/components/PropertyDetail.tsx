import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { parseProperties, Property } from '../utils/parseProperties_Gica';
import ImageCarousel from './ImageCarousel';
import { newDescription } from '../utils/formatDescription';
import { priceFormat } from '../utils/priceFormat';
import PropertyMap from './PropertyMap';

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [property, setProperty] = React.useState<Property | null>(
    location.state?.property || null
  );
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch('/api/properties');
        if (!response.ok) {
          throw new Error(`Failed to fetch properties: ${response.status}`);
        }
        const xmlText = await response.text();
        const properties = parseProperties(xmlText);
        const foundProperty = properties.find((p) => p.id === id) || null;
        setProperty(foundProperty);
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!property) {
      fetchProperty();
    } else {
      setLoading(false);
    }
  }, [id, property]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!property) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-bold">Propiedad No encontrada</h2>
        <p>La propiedad que busca no existe.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => navigate('/')}
        >
          Volver a la lista de propiedades
        </button>
      </div>
    );
  }

  // console.log(property);

  if (!property) {
    return <div className="text-center">Loading property details...</div>;
  }
  const latitude = parseFloat(property.latitud);
  const longitude = parseFloat(property.altitud);
  // console.log(latitude, longitude);

  return (
    <div>
      <div className="max-w-5xl mx-auto p-4">
        <h1 className="text-3xl font-bold mt-4 mb-4 text-green-800">
          {property.title}
        </h1>
        <ImageCarousel images={property.images} />
        <h1 className="text-2xl font-bold mt-4 mb-2 text-green-800">
          {property.title}
        </h1>

        <div>
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-2xl">
            <div className="description">
              {newDescription(property.description)
                .split('\n')
                .map((line, index) => (
                  <div>
                    <p key={index}>{line}</p>
                    <br></br>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mt-4 mb-2 text-green-800">
            Características
          </h2>
          <div className=" p-8 bg-white border border-gray-200 rounded-lg shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <ul className="list-disc ml-10  text-gray-600">
                <li>Tipo propiedad: {property.tipo_ofer}</li>
                <li>Id: {property.id}</li>
                <li>Ref: {property.ref}</li>
                <li>Provincia: {property.provincia}</li>
                <li>Localidad: {property.city}</li>
                <li>Zona: {property.zona}</li>
              </ul>
              <ul className="list-disc ml-10 mt-2 text-gray-600">
                <li>Conservación: {property.conservacion}</li>
                <li>Orientación: {property.orientacion}</li>
                <li>M.Construidos: {property.m_cons} m²</li>
                <li>M.Útiles: {property.m_uties} m²</li>
                {property.m_parcela != '0' ? (
                  <li>M.Parcela: {property.m_parcela} m²</li>
                ) : null}
                {property.m_terraza != '0.00' ? (
                  <li>M.Terraza: {property.m_terraza} m²</li>
                ) : null}
                <li>
                  Rooms: {property.habdobles} dobles, {property.habitaciones}{' '}
                  simples
                </li>
                <li>
                  Baños: {property.banyos} baños, {property.aseos} aseos
                </li>
              </ul>
              <ul className="list-disc ml-10 mt-2 text-gray-600">
                <li>Acción: {property.accion}</li>
                {property.accion === 'Vender' ? (
                  <li>Precio: {priceFormat(Number(property.price))}</li>
                ) : (
                  <li>
                    Precio_Alq: {priceFormat(Number(property.precio_alquiler))}{' '}
                    / mes
                  </li>
                )}
                <li>Agente: {property.agente}</li>
                <li>Email_Agente: {property.email_agente}</li>
                <li>Tlf_Agente: {property.tlf_agente}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mt-4 mb-2 text-green-800">
            Contacto
          </h2>
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-2xl max-4xl mx-auto">
            <form className="mt-4 space-y-4">
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Your Email"
                required
              />
              <textarea
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Your Message"
                rows={4}
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="mt-4 max-w-5xl mx-auto mb-10">
        <h2 className="text-2xl font-bold mt-8 mb-2 text-green-800 ml-4 ">
          Mapa de situación
        </h2>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-2xl">
          <PropertyMap latitude={latitude} longitude={longitude} />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
