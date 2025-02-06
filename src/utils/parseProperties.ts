export interface Property {
  id: string;
  ref: string;
  accion: string;
  title: string;
  description: string;
  antiguedad: string;
  price: string;
  precio_alquiler: string;
  gastos_comunidad: string;
  ibi: string;
  provincia: string;
  city: string;
  zona: string;
  cp: string;
  calle: string;
  planta: string;
  image: string;
  habdobles: string;
  habsimples: string;
  banyos: string;
  aseos: string;
  salon: string;
  m_cons: string;
  m_uties: string;
  m_parcela: string;
  m_terraza: string;
  conservacion: string;
  orientacion: string;
  tipo_ofer: string;
  num_fotos: number;
  exclusiva: string;
  reservado: string;
  estadoficha: string;
  agente: string;
  email_agente: string;
  tlf_agente: string;
  latitud: string;
  longitud: string;
  agencia: string;
  numagencia: string;
  letra_ener: string;
  letra_emi: string;
  ener_valor: string;
  emi_valor: string;
  plaza_garaje: string;
  opcioncompra: string;
  destacado: string;
  fechaact: string;
  numplanta: string;
  outlet: string;
  tiposuelo: string;
  cocina_equipada: string;
  altura: string;
  images: { url: string; tag: string }[];
}

function getAccion(node: Element) {
  let precioVenta = 0;
  let precioAlquiler = 0;
  let accion = '';
  if (node.getElementsByTagName('precioinmo')[0]) {
    precioVenta =
      Number(node.getElementsByTagName('precioinmo')[0].textContent) || 0;
  }
  if (node.getElementsByTagName('precioalq')[0]) {
    precioAlquiler =
      Number(node.getElementsByTagName('precioalq')[0].textContent) || 0;
  }
  if (precioVenta > 0 && precioAlquiler > 0) {
    accion = 'Vender/Alquilar';
  } else if (precioVenta > 0) {
    accion = 'Vender';
  } else if (precioAlquiler > 0) {
    accion = 'Alquilar';
  }
  return accion;
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
    title: node.getElementsByTagName('titulo1')[0]?.textContent?.trim() || '',
    description:
      node.getElementsByTagName('descrip1')[0]?.textContent?.trim() || '',
    antiguedad: node.getElementsByTagName('antiguedad')[0]?.textContent || '',
    price: node.getElementsByTagName('precioinmo')[0]?.textContent || '',
    precio_alquiler:
      node.getElementsByTagName('precioalq')[0]?.textContent || '',
    gastos_comunidad:
      node.getElementsByTagName('gastos_com')[0]?.textContent || '',
    ibi: node.getElementsByTagName('ibi')[0]?.textContent || '',
    provincia: node.getElementsByTagName('provincia')[0]?.textContent || '',
    city: node.getElementsByTagName('ciudad')[0]?.textContent || '',
    zona: node.getElementsByTagName('zona')[0]?.textContent || '',
    cp: node.getElementsByTagName('cp')[0]?.textContent || '',
    calle: node.getElementsByTagName('calle')[0]?.textContent || '',
    planta: node.getElementsByTagName('planta')[0]?.textContent || '',
    image: node.getElementsByTagName('foto1')[0]?.textContent || '',
    habdobles: node.getElementsByTagName('habdobles')[0]?.textContent || '',
    habsimples: node.getElementsByTagName('habitaciones')[0]?.textContent || '',
    m_cons: node.getElementsByTagName('m_cons')[0]?.textContent || '',
    m_uties: node.getElementsByTagName('m_uties')[0]?.textContent || '',
    m_parcela: node.getElementsByTagName('m_parcela')[0]?.textContent || '',
    m_terraza: node.getElementsByTagName('m_terraza')[0]?.textContent || '',
    banyos: node.getElementsByTagName('banyos')[0]?.textContent || '',
    aseos: node.getElementsByTagName('aseos')[0]?.textContent || '0',
    salon: node.getElementsByTagName('salon')[0]?.textContent || '',
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
    agencia: node.getElementsByTagName('agencia')[0]?.textContent || 'Alsol',
    numagencia: node.getElementsByTagName('numagencia')[0]?.textContent || '',
    exclusiva: node.getElementsByTagName('exclu')[0]?.textContent || '',
    reservado: node.getElementsByTagName('reservado')[0]?.textContent || '',
    estadoficha: node.getElementsByTagName('estadoficha')[0]?.textContent || '',
    letra_ener: node.getElementsByTagName('energialetra')[0]?.textContent || '',
    letra_emi:
      node.getElementsByTagName('emisionesletra')[0]?.textContent || '',
    ener_valor: node.getElementsByTagName('energiavalor')[0]?.textContent || '',
    emi_valor:
      node.getElementsByTagName('emisionesvalor')[0]?.textContent || '',
    plaza_garaje: node.getElementsByTagName('plaza_gara')[0]?.textContent || '',
    opcioncompra:
      node.getElementsByTagName('opcioncompra')[0]?.textContent || '',
    num_fotos:
      Number(node.getElementsByTagName('numfotos')[0]?.textContent) || 0,
    destacado: node.getElementsByTagName('destacado')[0]?.textContent || '',
    fechaact: node.getElementsByTagName('fechaact')[0]?.textContent || '',
    numplanta: node.getElementsByTagName('numplanta')[0]?.textContent || '',
    outlet: node.getElementsByTagName('outlet')[0]?.textContent || '',
    tiposuelo: node.getElementsByTagName('tiposuelo')[0]?.textContent || '',
    cocina_equipada:
      node.getElementsByTagName('cocina_equipada')[0]?.textContent || '',
    altura: node.getElementsByTagName('altura')[0]?.textContent || '',
    images: getImages(node),
    accion: getAccion(node),
  }));

  return data;
};
