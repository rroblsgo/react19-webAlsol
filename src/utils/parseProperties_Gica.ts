export interface Property {
  id: string;
  ref: string;
  accion: string;
  title: string;
  description: string;
  price: string;
  precio_alquiler: string;
  provincia: string;
  city: string;
  zona: string;
  image: string;
  habdobles: string;
  habitaciones: string;
  banyos: string;
  aseos: string;
  m_cons: string;
  m_uties: string;
  m_parcela: string;
  m_terraza: string;
  conservacion: string;
  orientacion: string;
  tipo_ofer: string;
  num_fotos: number;
  agente: string;
  email_agente: string;
  tlf_agente: string;
  latitud: string;
  altitud: string;
  images: { url: string; tag: string }[];
  // [key: string]: string;
}

function getImages(node: Element) {
  // console.log('node:', node);
  const images: { url: string; tag: string }[] = [];
  const numFotos = 50;
  // const numFotos = node.getElementsByTagName('numfotos')[0].textContent || '5';

  for (let i = 1; i <= numFotos; i++) {
    const fotoKey = `foto${i}`;
    if (node.getElementsByTagName(fotoKey)[0]) {
      images.push({
        url: node.getElementsByTagName(fotoKey)[0].textContent || '',
        tag: node.getElementsByTagName(fotoKey)[0].getAttribute('eti') || ' ',
      });
    } else break;
  }
  return images; //
}

export const parseProperties = (xml: string): Property[] => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, 'text/xml');
  const propertyNodes = xmlDoc.getElementsByTagName('propiedad');
  // console.log('propertyNodes:', propertyNodes);

  const data = Array.from(propertyNodes).map((node) => ({
    id: node.getElementsByTagName('unico')[0]?.textContent || '',
    accion: node.getElementsByTagName('accion')[0]?.textContent || 'Vender',
    title: node.getElementsByTagName('titulo')[0]?.textContent?.trim() || '',
    description:
      node.getElementsByTagName('descripcion')[0]?.textContent?.trim() || '',
    price: node.getElementsByTagName('precioventa')[0]?.textContent || '',
    precio_alquiler:
      node.getElementsByTagName('precioalquiler')[0]?.textContent || '',
    provincia: node.getElementsByTagName('provincia')[0]?.textContent || '',
    city: node.getElementsByTagName('ciudad')[0]?.textContent || '',
    zona: node.getElementsByTagName('zona')[0]?.textContent || '',
    image: node.getElementsByTagName('foto1')[0]?.textContent || '',
    habdobles: node.getElementsByTagName('habdobles')[0]?.textContent || '',
    habitaciones: node.getElementsByTagName('habsimples')[0]?.textContent || '',
    m_cons: node.getElementsByTagName('mconstruidos')[0]?.textContent || '',
    m_uties: node.getElementsByTagName('mutiles')[0]?.textContent || '',
    m_parcela: node.getElementsByTagName('mparcela')[0]?.textContent || '',
    m_terraza: node.getElementsByTagName('mterraza')[0]?.textContent || '',
    banyos: node.getElementsByTagName('banos')[0]?.textContent || '',
    aseos: node.getElementsByTagName('aseos')[0]?.textContent || '0',
    ref: node.getElementsByTagName('referencia')[0]?.textContent || '',
    conservacion:
      node.getElementsByTagName('estadopropiedad')[0]?.textContent || '',
    orientacion: node.getElementsByTagName('orientacion')[0]?.textContent || '',
    tipo_ofer: node.getElementsByTagName('tipo')[0]?.textContent || '',
    agente: node.getElementsByTagName('agencia')[0]?.textContent || '',
    email_agente:
      node.getElementsByTagName('email_agente')[0]?.textContent || '',
    tlf_agente: node.getElementsByTagName('numagencia')[0]?.textContent || '',
    latitud: node.getElementsByTagName('latitud')[0]?.textContent || '',
    altitud: node.getElementsByTagName('longitud')[0]?.textContent || '',
    num_fotos:
      Number(node.getElementsByTagName('numfotos')[0]?.textContent) || 5,
    images: getImages(node),
  }));
  // console.log('data:', data);
  return data;
};
