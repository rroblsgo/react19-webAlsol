import React from 'react';
import PropertyImageGallery from './PropertyImageGallery';
import { Property } from '../utils/parseProperties_Gica';
import { useNavigate, useParams } from 'react-router-dom';

const DisplayImages: React.FC<{ properties: Property[] }> = ({
  properties,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = React.useState<Property | null>(null);

  React.useEffect(() => {
    const foundProperty = properties.find((p) => p.id === id) || null;
    if (foundProperty) setProperty(foundProperty);
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
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">123 Main Street, Anytown USA</h1>

      <PropertyImageGallery
        images={property.images}
        propertyTitle="123 Main Street, Anytown USA"
      />

      {/* Rest of your property details would go here */}
    </div>
  );
};

export default DisplayImages;
