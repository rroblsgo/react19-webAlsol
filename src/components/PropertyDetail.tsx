import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Property } from '../utils/parseProperties_Gica';
import ImageCarousel from './ImageCarousel';
import { newDescription } from '../utils/formatDescription';
import { priceFormat } from '../utils/priceFormat';
import PropertyMap from './PropertyMap';
import { FaCheck } from 'react-icons/fa';
import EnergyEfficiencyGraph from './EnergyEfficiencyGraph';
// import { PDFDownloadLink } from '@react-pdf/renderer';
// import PropertyPDF from './PropertyPdf';
import ContactForm from './ContactForm';

const PropertyDetail: React.FC<{ properties: Property[] }> = ({
  properties,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = React.useState<Property | null>(null);

  React.useEffect(() => {
    const foundProperty = properties.find((p) => p.id === id) || null;
    setProperty(foundProperty); // ✅ Now setting state inside useEffect
  }, [id, properties]);

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

  const latitude = parseFloat(property?.latitud);
  const longitud = parseFloat(property?.longitud);
  // console.log(latitude, longitude);

  return (
    <div>
      <div className="max-w-2xl md:max-w-5xl mx-auto p-4">
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

        {/* Imprimir características */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mt-4 mb-2 text-green-800">
            Características
          </h2>
          <div className="p-2 md:p-8 bg-white border border-gray-200 rounded-lg shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 justify-between">
              <ul className="list-none ml-10 mt-2 text-gray-600">
                <li className="char_list">
                  <p>Id</p>
                  <p className="font-semibold">{property.id}</p>
                </li>
                <li className="char_list">
                  <p>Referencia</p>
                  <p className="font-semibold">{property.ref}</p>
                </li>
                <li className="char_list">
                  <p>Tipo propiedad</p>
                  <p className="font-semibold">{property.tipo_ofer}</p>
                </li>
                {property.antiguedad != '' ? (
                  <li className="char_list">
                    <p>Antigüedad</p>
                    <p className="font-semibold">{property.antiguedad}</p>
                  </li>
                ) : null}
                <li className="char_list">
                  <p>Provincia</p>
                  <p className="font-semibold">{property.provincia}</p>
                </li>
                <li className="char_list">
                  <p>Población</p>
                  <p className="font-semibold">{property.city}</p>
                </li>
                <li className="char_list">
                  <p>Zona</p>
                  <p className="font-semibold">{property.zona}</p>
                </li>
                <li className="char_list">
                  <p>m² Construidos</p>
                  <p className="font-semibold">{property.m_cons} m²</p>
                </li>
                <li className="char_list">
                  <p>m² Útiles</p>
                  <p className="font-semibold">{property.m_uties} m²</p>
                </li>
                {property.m_parcela != '0' ? (
                  <li className="char_list">
                    <p>m² Parcela</p>
                    <p className="font-semibold">{property.m_parcela} m²</p>
                  </li>
                ) : null}
                {property.m_terraza != '0' && property.m_terraza != '' ? (
                  <li className="char_list">
                    <p>m² Terraza</p>
                    <p className="font-semibold">{property.m_terraza} m²</p>
                  </li>
                ) : null}
              </ul>
              <ul className="list-none ml-10 mt-2 text-gray-600">
                <li className="char_list">
                  <p>Acción</p>
                  <p className="font-semibold">
                    {property.accion.toUpperCase()}
                  </p>
                </li>
                {Number(property.price) > 0 ? (
                  <li className="char_list">
                    <p>Precio venta </p>
                    <p className="font-semibold text-red-500">
                      {priceFormat(Number(property.price))}
                    </p>
                  </li>
                ) : null}
                {Number(property.precio_alquiler) > 0 ? (
                  <li className="char_list">
                    <p>Precio Alquiler</p>
                    <p className="font-semibold text-red-500">
                      {priceFormat(Number(property.precio_alquiler))} / mes
                    </p>
                  </li>
                ) : null}
                {Number(property.gastos_comunidad) > 0 ? (
                  <li className="char_list">
                    <p>Gastos Comunidad</p>
                    <p className="font-semibold">
                      {priceFormat(Number(property.gastos_comunidad))} / mes
                    </p>
                  </li>
                ) : null}
                {Number(property.ibi) > 0 ? (
                  <li className="char_list">
                    <p>IBI</p>
                    <p className="font-semibold">
                      {priceFormat(Number(property.ibi))}
                    </p>
                  </li>
                ) : null}
                {Number(property.planta) > 0 ? (
                  <li className="char_list">
                    <p>Planta</p>
                    <p className="font-semibold">{property.planta}</p>
                  </li>
                ) : null}
                {Number(property.numplanta) > 0 ? (
                  <li className="char_list">
                    <p>Plantas</p>
                    <p className="font-semibold">{property.numplanta}</p>
                  </li>
                ) : null}
                <li className="char_list">
                  <p>Conservación</p>
                  <p className="font-semibold">{property.conservacion}</p>
                </li>
                {property.orientacion != '' ? (
                  <li className="char_list">
                    <p>Orientación</p>
                    <p className="font-semibold">{property.orientacion}</p>
                  </li>
                ) : null}
                {Number(property.plaza_garaje) > 0 ? (
                  <li className="char_list">
                    <p>Plaza Garaje</p>
                    <p className="font-semibold">{property.plaza_garaje}</p>
                  </li>
                ) : null}
                {Number(property.habsimples) > 0 ? (
                  <li className="char_list">
                    <p>Dormitorios Simples</p>
                    <p className="font-semibold">{property.habsimples}</p>
                  </li>
                ) : null}
                {Number(property.habdobles) > 0 ? (
                  <li className="char_list">
                    <p>Dormitorios Dobles</p>
                    <p className="font-semibold">{property.habdobles}</p>
                  </li>
                ) : null}
                {Number(property.banyos) > 0 ? (
                  <li className="char_list">
                    <p>Baños</p>
                    <p className="font-semibold">{property.banyos}</p>
                  </li>
                ) : null}
                {Number(property.aseos) > 0 ? (
                  <li className="char_list">
                    <p>Aseos</p>
                    <p className="font-semibold">{property.aseos}</p>
                  </li>
                ) : null}
                {property.agente.length > 3 ? (
                  <li className="char_list">
                    <p>Agente</p>
                    <p className="font-semibold">{property.agente}</p>
                  </li>
                ) : null}
                {property.email_agente.length > 3 ? (
                  <li className="char_list">
                    <p>Email Agente</p>
                    <p className="font-semibold">{property.email_agente}</p>
                  </li>
                ) : null}
                {property.tlf_agente.length > 3 ? (
                  <li className="char_list">
                    <p>Teléfono Agente</p>
                    <p className="font-semibold">{property.tlf_agente}</p>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>

        {/* Imprimir extras */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mt-4 mb-2 text-green-800">
            Extras
          </h2>
          <div className="p-2 md:p-8 bg-white border border-gray-200 rounded-lg shadow-2xl">
            {
              <ul className="list-none ml-10 mt-2 text-gray-600">
                {property.extras
                  .filter(
                    (extra) =>
                      extra.value !== '_' &&
                      extra.value !== '0' &&
                      extra.value !== ' '
                  )
                  .map((extra, index) => (
                    <li
                      key={index}
                      className="py-2 border border-gray-500 border-b-1 border-r-0 border-t-0 border-l-0 flex justify-between w-[250px] md:w-[400px]"
                    >
                      <div>{extra.key}</div>
                      {extra.value === 'X' ||
                      extra.value === '1' ||
                      Number(extra.value) > 1 ? (
                        <FaCheck />
                      ) : (
                        <div>{extra.value}</div>
                      )}
                    </li>
                  ))}
              </ul>
            }
          </div>
        </div>

        {/* Download PDF Button */}
        {/* <PDFDownloadLink
          document={<PropertyPDF property={property} />}
          fileName={`property_${property.id}.pdf`}
        >
          {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
        </PDFDownloadLink> */}

        {/* Imprimir contacto */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mt-4 mb-2 text-green-800">
            Formulario de Contacto
          </h2>
          {/* <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-2xl max-4xl mx-auto">
            <form className="mt-4 space-y-4">
              <input
                type="text"
                name="nombre"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Su Nombre"
                required
              />
              <div className="flex flex-col md:flex-row  justify-between">
                <input
                  type="email"
                  name="email"
                  className="w-full md:w-[70%] px-4 py-2 border rounded-lg"
                  placeholder="Su Email"
                  required
                />
                <input
                  type="text"
                  name="telefono"
                  className="w-full md:w-[30%] px-4 py-2 border rounded-lg"
                  placeholder="Su Teléfono"
                  required
                />
              </div>

              <textarea
                className="w-full px-4 py-2 border rounded-lg"
                name="message"
                placeholder="Su mensaje"
                rows={4}
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Enviar mensaje
              </button>
            </form>
          </div> */}
          <ContactForm property={property} />
        </div>
      </div>

      {/* Imprimir mapa */}
      <div className="mt-4 max-w-5xl mx-auto mb-10">
        <h2 className="text-2xl font-bold mt-8 mb-2 text-green-800 ml-4 ">
          Mapa de situación
        </h2>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-2xl">
          <PropertyMap latitud={latitude} longitud={longitud} />
        </div>
      </div>

      {/* Imprimir EnergyEfficiencyGraph */}
      <div className="mt-4 max-w-5xl mx-auto mb-10">
        <h2 className="text-2xl font-bold mt-4 mb-2 text-green-800 ml-4">
          Cuadro Energético
        </h2>
        <EnergyEfficiencyGraph
          energyLetter={property.letra_ener} // Replace with property.energyLetter
          energyValue={Number(property.ener_valor)} // Replace with property.energyValue
          emissionsLetter={property.letra_emi} // Replace with property.emissionsLetter
          emissionsValue={Number(property.emi_valor)} // Replace with property.emissionsValue
        />
      </div>
    </div>
  );
};

export default PropertyDetail;
