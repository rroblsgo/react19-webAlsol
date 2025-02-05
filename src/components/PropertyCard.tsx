import { Link } from 'react-router-dom';
import React from 'react';
import { Property } from '../utils/parseProperties';
import { FaBed, FaBath, FaHome } from 'react-icons/fa';
import { priceFormat } from '../utils/priceFormat';

const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <Link to={`/property/${property.id}`} state={{ property }}>
        <img
          className="w-96 h-64 object-cover"
          src={property.image}
          alt={property.title}
        />
        <div className="relative">
          {property.accion != 'Alquilar' ? (
            <div className="absolute top-0 right-0 bg-indigo-400 px-4 py-2 text-white text-sm hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
              {property.accion}
            </div>
          ) : (
            <div className="absolute top-0 right-0 bg-green-400 px-4 py-2 text-white text-sm hover:bg-white hover:text-green-600 transition duration-500 ease-in-out">
              {property.accion}
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mt-4">
            <h2 className="text-lg font-semibold">{property.tipo_ofer}</h2>
            <h2 className="text-lg font-semibold">
              {property.precio_alquiler != '0'
                ? priceFormat(Number(property.precio_alquiler)) + ' /mes'
                : priceFormat(Number(property.price))}
            </h2>
          </div>
          <h2 className="text-lg font-semibold">{property.city}</h2>
          <p className="text-sm mt-2 font-semibold">{property.zona}</p>
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">
              Ref. {property.ref}
            </span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <FaBed className="mr-2 text-blue-500" />
              <span>
                {property.habdobles} D, {property.habsimples} S
              </span>
            </div>
            <div className="flex items-center">
              <FaBath className="mr-2 text-blue-500" />
              <span>{property.banyos}</span>
            </div>

            <div className="flex items-center">
              <FaHome className="mr-2 text-blue-500" />
              <span>
                {property.m_cons} m<sup>2</sup>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;
