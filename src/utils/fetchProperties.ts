import { parseProperties, Property } from './parseProperties_Gica';

export const fetchProperties = async (): Promise<Property[]> => {
  const response = await fetch('/api/properties');
  // const response = await fetch('properties.xml');

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const xmlText = await response.text();
  // console.log(xmlText);
  const parsedProperties = await parseProperties(xmlText);
  // console.log(parsedProperties);

  // Sort properties by provincia and then by city
  const sortedProperties = parsedProperties.sort((a, b) => {
    const provinceComparison = a.provincia.localeCompare(
      b.provincia,
      undefined,
      {
        sensitivity: 'base',
      }
    );
    if (provinceComparison !== 0) {
      return provinceComparison;
    }
    return a.city.localeCompare(b.city, undefined, { sensitivity: 'base' });
  });
  // console.log(sortedProperties);
  return sortedProperties;
};
