import React, { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Property } from '../utils/parseProperties_Gica';
import ImageCarousel from './ImageCarousel';
import { newDescription } from '../utils/formatDescription';
import { priceFormat } from '../utils/priceFormat';
import PropertyMap from './PropertyMap';
import { FaCheck } from 'react-icons/fa';
import EnergyEfficiencyGraph from './EnergyEfficiencyGraph';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import PropertyPDF from './PropertyPdf';
import ContactForm from './ContactForm';
import { toPng } from 'html-to-image';
import { transformExtras } from '../utils/extrasConvert';
import info from '../utils/info_keys.json';

const PropertyDetail: React.FC<{ properties: Property[] }> = ({
  properties,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = React.useState<Property | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const componentRef2 = useRef<HTMLDivElement>(null);
  const [imageData, setImageData] = React.useState<string | null>(null);
  const [imageData2, setImageData2] = React.useState<string | null>(null);
  const [showPdf, setShowPdf] = useState(false);

  const togglePdfViewer = () => {
    setShowPdf((prev) => !prev); // Toggle visibility
  };

  React.useEffect(() => {
    const foundProperty = properties.find((p) => p.id === id) || null;
    if (foundProperty) {
      // Transform extras before setting state
      const transformedExtras = transformExtras(foundProperty.extras, info);
      setProperty({ ...foundProperty, extras: transformedExtras });
    }
    // console.log('Property:', property);
  }, [id, properties]);

  // Capture image only when property is loaded
  useEffect(() => {
    if (property && componentRef.current) {
      // Wait for the DOM to update
      setTimeout(() => {
        toPng(componentRef.current as HTMLElement)
          .then((dataUrl) => {
            // console.log('Captured Image Data:', dataUrl);
            setImageData(dataUrl);
          })
          .catch((err) => console.error('Error capturing image:', err));
      }, 500); // ✅ Wait 500ms to ensure DOM is fully rendered
    }
  }, [property]); // ✅ Only run when property is set

  // Capture image only when property is loaded
  useEffect(() => {
    if (property && componentRef2.current) {
      // Wait for the DOM to update
      setTimeout(() => {
        toPng(componentRef2.current as HTMLElement)
          .then((dataUrl) => {
            // console.log('Captured Image Data:', dataUrl);
            setImageData2(dataUrl);
          })
          .catch((err) => console.error('Error capturing image:', err));
      }, 500); // ✅ Wait 500ms to ensure DOM is fully rendered
    }
  }, [property]); // ✅ Only run when property is set

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
  // console.log('extras:', property.extras);

  const extras = [];
  let extras1: { key: string; value: string }[] = [];
  let extras2: { key: string; value: string }[] = [];
  // console.log('extras:', property.extras);
  if (property.extras.length > 0) {
    for (let i = 0; i < property.extras.length; i++) {
      if (
        property.extras[i].value !== '_' &&
        property.extras[i].value !== '0' &&
        property.extras[i].value !== ' '
      ) {
        extras.push(property.extras[i]);
      }
    }
    extras1 = extras.slice(0, Math.ceil(extras.length / 2));
    extras2 = extras.slice(Math.ceil(extras.length / 2));
    console.log('extras:', extras);
    console.log('extras1:', extras1);
    console.log('extras2:', extras2);
  }
  console.log('entorno', property.entorno);
  let has_entorno = false;
  if (property.entorno.length > 0) {
    for (let i = 0; i < property.entorno.length; i++) {
      if (property.entorno[i].value === '1') {
        has_entorno = true;
        break;
      }
    }
  }

  return (
    <div>
      <div className="max-w-2xl md:max-w-5xl mx-auto p-4">
        <h1 className="text-3xl font-bold mt-4 mb-4 text-green-800">
          {property.title}
        </h1>
        {property.estadoficha === '7' && (
          <p className=" bg-red-400 p-4 text-white text-center text-2xl font-bold mb-2 ">
            RESERVADO
          </p>
        )}
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

        <div ref={componentRef}>
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
                <div className="grid grid-cols-1 md:grid-cols-2 justify-between">
                  <ul className="list-none ml-10 mt-2 text-gray-600">
                    {extras1
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
                          {extra.key === 'Parking' && Number(extra.value) > 0
                            ? extra.value + ' plazas'
                            : null}
                          {extra.key === 'Distancia al mar' &&
                          Number(extra.value) > 0
                            ? extra.value + ' m'
                            : null}
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
                  <ul className="list-none ml-10 mt-2 text-gray-600">
                    {extras2
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
                          {extra.key === 'Parking' && Number(extra.value) > 0
                            ? extra.value + ' plazas'
                            : null}
                          {extra.key === 'Distancia al mar' &&
                          Number(extra.value) > 0
                            ? extra.value + ' m'
                            : null}
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
                </div>
              }
              {property.entorno.length > 0 && has_entorno && (
                <ul className="list-none ml-10 mt-2 text-gray-600">
                  <p className="text-xl py-2 border border-gray-500 border-b-1 border-r-0 border-t-0 border-l-0 w-[250px] md:w-[400px]">
                    Entorno
                  </p>
                  {property.entorno
                    .filter(
                      (item) =>
                        item.value !== '_' &&
                        item.value !== '0' &&
                        item.value !== ' '
                    )
                    .map((item, index) => (
                      <li
                        key={index}
                        className="py-2 border border-gray-500 border-b-1 border-r-0 border-t-0 border-l-0 flex justify-between w-[250px] md:w-[400px]"
                      >
                        <div>{item.key}</div>
                        {item.value === 'X' ||
                        item.value === '1' ||
                        Number(item.value) > 1 ? (
                          <FaCheck />
                        ) : (
                          <div>{item.value}</div>
                        )}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Imprimir mapa */}
        <div ref={componentRef2}>
          <div className="mt-4 max-w-5xl mx-auto mb-10">
            <h2 className="text-2xl font-bold mt-8 mb-2 text-green-800 ml-4 ">
              Mapa de situación
            </h2>
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-2xl">
              <PropertyMap latitud={latitude} longitud={longitud} />
            </div>
          </div>

          {/* Imprimir EnergyEfficiencyGraph */}
          <div className="mt-4 max-w-5xl mx-auto mb-2">
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
      </div>

      {/* Imprimir contacto */}
      <div className="mt-4">
        <div className="max-w-2xl md:max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold mt-4 mb-2 px-4 text-green-800">
            Formulario de Contacto
          </h2>
          <div className="p-2 md:p-8 bg-white border border-gray-200 rounded-lg shadow-2xl">
            <ContactForm property={property} />
          </div>
        </div>
      </div>

      {/* Download PDF Button */}
      <div className="max-w-2xl md:max-w-2xl mx-auto px-4 flex flex-col items-center">
        <div className="hidden  mt-6 md:flex justify-center w-[90%] md:w-[110%]  px-2 py-2 bg-blue-500 text-white rounded-md border border-blue-500">
          <PDFDownloadLink
            document={
              <PropertyPDF
                property={property}
                imageData={imageData}
                imageData2={imageData2}
              />
            }
            fileName={`property_${property.id}.pdf`}
          >
            {({ loading }) => (loading ? 'Generando PDF...' : 'Descargar PDF')}
          </PDFDownloadLink>
        </div>
        {/* Toggle Button */}
        <button
          onClick={togglePdfViewer}
          className="hidden md:block md:w-[110%] mt-2 mb-2  px-2 py-2 bg-blue-500 text-white rounded-md border border-blue-500"
        >
          {showPdf ? 'Ocultar PDF' : 'Ver PDF'}
        </button>

        {/* Conditionally Render PDF Viewer */}
        <div className="">
          {showPdf && (
            <PDFViewer width="700px" height="800">
              <PropertyPDF
                property={property}
                imageData={imageData}
                imageData2={imageData2}
              />
            </PDFViewer>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
