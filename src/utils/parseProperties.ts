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
  habsimples: string;
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
  longitud: string;
  agencia: string;
  images: { url: string; tag: string }[];
}

function getImages(node: Element) {
  const images: { url: string; tag: string }[] = [];
  const numFotos = node.getElementsByTagName('numfotos')[0].textContent || 0;

  for (let i = 1; i <= Number(numFotos); i++) {
    const fotoKey = `foto${i}`;
    if (node.getElementsByTagName(fotoKey)[0]) {
      images.push({
        url: node.getElementsByTagName(fotoKey)[0].textContent || '',
        tag:
          node.getElementsByTagName(fotoKey)[0].getAttribute('eti') ||
          'unknown',
      });
    }
  }
  return images; //
}

export const parseProperties = (xml: string): Property[] => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, 'text/xml');
  const propertyNodes = xmlDoc.getElementsByTagName('propiedad');

  const data = Array.from(propertyNodes).map((node) => ({
    id: node.getElementsByTagName('id')[0]?.textContent || '',
    accion: node.getElementsByTagName('accion')[0]?.textContent || '',
    title: node.getElementsByTagName('titulo1')[0]?.textContent?.trim() || '',
    description:
      node.getElementsByTagName('descrip1')[0]?.textContent?.trim() || '',
    price: node.getElementsByTagName('precioinmo')[0]?.textContent || '',
    precio_alquiler:
      node.getElementsByTagName('precioalq')[0]?.textContent || '',
    provincia: node.getElementsByTagName('provincia')[0]?.textContent || '',
    city: node.getElementsByTagName('ciudad')[0]?.textContent || '',
    zona: node.getElementsByTagName('zona')[0]?.textContent || '',
    image: node.getElementsByTagName('foto1')[0]?.textContent || '',
    habdobles: node.getElementsByTagName('habdobles')[0]?.textContent || '',
    habsimples: node.getElementsByTagName('habitaciones')[0]?.textContent || '',
    m_cons: node.getElementsByTagName('m_cons')[0]?.textContent || '',
    m_uties: node.getElementsByTagName('m_uties')[0]?.textContent || '',
    m_parcela: node.getElementsByTagName('m_parcela')[0]?.textContent || '',
    m_terraza: node.getElementsByTagName('m_terraza')[0]?.textContent || '',
    banyos: node.getElementsByTagName('banyos')[0]?.textContent || '',
    aseos: node.getElementsByTagName('aseos')[0]?.textContent || '0',
    ref: node.getElementsByTagName('ref')[0]?.textContent || '',
    conservacion:
      node.getElementsByTagName('conservacion')[0]?.textContent || '',
    orientacion: node.getElementsByTagName('orientacion')[0]?.textContent || '',
    tipo_ofer: node.getElementsByTagName('tipo_ofer')[0]?.textContent || '',
    agente: node.getElementsByTagName('agente')[0]?.textContent || '',
    email_agente:
      node.getElementsByTagName('email_agente')[0]?.textContent || '',
    tlf_agente: node.getElementsByTagName('tlf_agente')[0]?.textContent || '',
    latitud: node.getElementsByTagName('latitud')[0]?.textContent || '',
    longitud: node.getElementsByTagName('altitud')[0]?.textContent || '',
    num_fotos:
      Number(node.getElementsByTagName('numfotos')[0]?.textContent) || 0,
    agencia: node.getElementsByTagName('agencia')[0]?.textContent || '',
    images: getImages(node),
  }));

  return data;
};
