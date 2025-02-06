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
  if (node.getElementsByTagName('precioventa')[0]) {
    precioVenta =
      Number(node.getElementsByTagName('precioventa')[0].textContent) || 0;
  }
  if (node.getElementsByTagName('precioalquiler')[0]) {
    precioAlquiler =
      Number(node.getElementsByTagName('precioalquiler')[0].textContent) || 0;
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

  const data = Array.from(propertyNodes).map((node) => ({
    id: node.getElementsByTagName('unico')[0]?.textContent || '',
    title: node.getElementsByTagName('titulo')[0]?.textContent?.trim() || '',
    description:
      node.getElementsByTagName('descripcion')[0]?.textContent?.trim() || '',
    antiguedad: node.getElementsByTagName('antiguedad')[0]?.textContent || '',
    price: node.getElementsByTagName('precioventa')[0]?.textContent || '',
    precio_alquiler:
      node.getElementsByTagName('precioalquiler')[0]?.textContent || '',
    gastos_comunidad:
      node.getElementsByTagName('gastos_comunidad')[0]?.textContent || '',
    ibi: node.getElementsByTagName('ibi')[0]?.textContent || '',
    provincia: node.getElementsByTagName('provincia')[0]?.textContent || '',
    city: node.getElementsByTagName('ciudad')[0]?.textContent || '',
    zona: node.getElementsByTagName('zona')[0]?.textContent || '',
    cp: node.getElementsByTagName('cp')[0]?.textContent || '',
    calle: node.getElementsByTagName('calle')[0]?.textContent || '',
    planta: node.getElementsByTagName('planta')[0]?.textContent || '',
    image: node.getElementsByTagName('foto1')[0]?.textContent || '',
    habdobles: node.getElementsByTagName('habdobles')[0]?.textContent || '',
    habsimples: node.getElementsByTagName('habsimples')[0]?.textContent || '',
    m_cons: node.getElementsByTagName('mconstruidos')[0]?.textContent || '',
    m_uties: node.getElementsByTagName('mutiles')[0]?.textContent || '',
    m_parcela: node.getElementsByTagName('parcela')[0]?.textContent || '',
    m_terraza: node.getElementsByTagName('m_terraza')[0]?.textContent || '',
    banyos: node.getElementsByTagName('banos')[0]?.textContent || '',
    aseos: node.getElementsByTagName('aseos')[0]?.textContent || '0',
    salon: node.getElementsByTagName('salon')[0]?.textContent || '',
    ref: node.getElementsByTagName('referencia')[0]?.textContent || '',
    conservacion:
      node.getElementsByTagName('estadopropiedad')[0]?.textContent || '',
    orientacion: node.getElementsByTagName('orientacion')[0]?.textContent || '',
    tipo_ofer: node.getElementsByTagName('tipo')[0]?.textContent || '',
    agente: node.getElementsByTagName('agente')[0]?.textContent || '',
    email_agente:
      node.getElementsByTagName('email_agente')[0]?.textContent || '',
    tlf_agente: node.getElementsByTagName('tlf_agente')[0]?.textContent || '',
    latitud: node.getElementsByTagName('latitud')[0]?.textContent || '',
    longitud: node.getElementsByTagName('longitud')[0]?.textContent || '',
    agencia: node.getElementsByTagName('agencia')[0]?.textContent || '',
    numagencia: node.getElementsByTagName('numagencia')[0]?.textContent || '',
    exclusiva: node.getElementsByTagName('exclu')[0]?.textContent || '',
    reservado: node.getElementsByTagName('reservado')[0]?.textContent || '',
    estadoficha: node.getElementsByTagName('estadoficha')[0]?.textContent || '',
    letra_ener:
      node.getElementsByTagName('calificacion_energetica')[0]?.textContent ||
      '',
    letra_emi:
      node.getElementsByTagName('calificacionemisiones')[0]?.textContent || '',
    ener_valor:
      node.getElementsByTagName('prestacion_energetica')[0]?.textContent || '',
    emi_valor: node.getElementsByTagName('emisiones')[0]?.textContent || '',
    plaza_garaje: node.getElementsByTagName('garaje')[0]?.textContent || '',
    num_fotos:
      Number(node.getElementsByTagName('numfotos')[0]?.textContent) || 50,
    opcioncompra:
      node.getElementsByTagName('opcioncompra')[0]?.textContent || '',
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
