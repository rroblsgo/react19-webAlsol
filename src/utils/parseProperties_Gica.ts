export interface Property {
  id: string;
  ref: string;
  numagencia: string;
  agencia: string;
  antiguedad: string;
  fechaact: string;
  tipo_ofer: string;
  conservacion: string;
  orientacion: string;
  accion: string;
  provincia: string;
  city: string;
  zona: string;
  cp: string;
  calle: string;
  planta: string;
  numplanta: string;
  plaza_garaje: string;
  price: string;
  precio_alquiler: string;
  gastos_comunidad: string;
  ibi: string;
  outlet: string;
  m_parcela: string;
  m_uties: string;
  m_cons: string;
  m_terraza: string;
  salon: string;
  habsimples: string;
  habdobles: string;
  banyos: string;
  aseos: string;
  longitud: string;
  latitud: string;
  title: string;
  description: string;
  image: string;
  num_fotos: number;
  images: { url: string; tag: string }[];
  exclusiva: string;
  reservado: string;
  estadoficha: string;
  destacado: string;
  opcioncompra: string;
  agente: string;
  email_agente: string;
  tlf_agente: string;
  letra_ener: string;
  letra_emi: string;
  ener_valor: string;
  emi_valor: string;
  extras: { key: string; value: string }[];
  entorno: { key: string; value: string }[];
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

function getExtras(node: Element) {
  // console.log('node:', node);
  const extras_keys = [
    'Luminoso',
    'Urbanización',
    'Trastero',
    'Aire Acondicionado',
    'Alarma',
    'Ascensor',
    'Balcón',
    'Jardín',
    'Calefacción',
    'Electrodomésticos',
    'Gas Ciudad',
    'Amueblado',
    'Puerta Blindada',
    'Terraza',
    'Vistas al mar',
    'Armarios Empotrados',
    'Carpinteria Interior',
    'Carpinteria Exterior',
    'Piscina',
    'Tipo Cocina',
    'Primera línea',
    'Tipo suelo',
    'Cocina Equipada',
    'Altura',
    'Tour Virtual',
    'Electricidad',
    'Garaje',
  ];
  const extras_base = [
    'luminoso',
    'urbanizacion',
    'trastero',
    'aire_acon',
    'alarma',
    'ascensor',
    'balcon',
    'jardin',
    'calefaccion',
    'electro',
    'gasciudad',
    'muebles',
    'puerta_blin',
    'terraza',
    'vistasalmar',
    'armario_empotrado',
    'carpinteria_interior',
    'carpinteria_exterior',
    'piscina',
    'tipo_cocina',
    'primeralinea',
    'tiposuelo',
    'cocina_equipada',
    'altura',
    'tourvirtual',
    'keyelectricidad',
    'garaje',
  ];
  const extras: { key: string; value: string }[] = [];
  // const numFotos = node.getElementsByTagName('numfotos')[0].textContent || '5';

  for (let i = 0; i <= extras_keys.length - 1; i++) {
    if (node.getElementsByTagName(extras_base[i])[0]) {
      extras.push({
        key: extras_keys[i],
        value: node.getElementsByTagName(extras_base[i])[0].textContent || ' ',
      });
    }
  }
  return extras; //
}

function getEntorno(node: Element) {
  const entorno_keys = [
    'Rural',
    'Arboleda',
    'Montaña',
    'Costa',
    'Mirador',
    'Vallado',
    'Golf',
    'Zonas Infantiles',
    'Centros Comerciales',
    'Colegios',
    'Hospitales',
    'Autobuses',
    'Tren',
    'Metro',
  ];
  const entorno_base = [
    'rural',
    'arboles',
    'montana',
    'costa',
    'mirador',
    'vallado',
    'golf',
    'zonas_infantiles',
    'centros_comerciales',
    'colegios',
    'hospitales',
    'autobuses',
    'tren',
    'metro',
  ];

  const entorno: { key: string; value: string }[] = [];

  for (let i = 0; i <= entorno_keys.length - 1; i++) {
    if (node.getElementsByTagName(entorno_base[i])[0]) {
      entorno.push({
        key: entorno_keys[i],
        value: node.getElementsByTagName(entorno_base[i])[0].textContent || ' ',
      });
    }
  }
  return entorno;
}

export const parseProperties = (xml: string): Property[] => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, 'text/xml');
  const propertyNodes = xmlDoc.getElementsByTagName('propiedad');

  const data = Array.from(propertyNodes).map((node) => ({
    id: node.getElementsByTagName('unico')[0]?.textContent || '',
    ref: node.getElementsByTagName('referencia')[0]?.textContent || '',
    numagencia: node.getElementsByTagName('numagencia')[0]?.textContent || '',
    agencia: node.getElementsByTagName('agencia')[0]?.textContent || '',
    antiguedad: node.getElementsByTagName('antiguedad')[0]?.textContent || '',
    fechaact: node.getElementsByTagName('fechaact')[0]?.textContent || '',
    tipo_ofer: node.getElementsByTagName('tipo')[0]?.textContent || '',
    conservacion:
      node.getElementsByTagName('estadopropiedad')[0]?.textContent || '',
    orientacion: node.getElementsByTagName('orientacion')[0]?.textContent || '',

    provincia: node.getElementsByTagName('provincia')[0]?.textContent || '',
    city: node.getElementsByTagName('ciudad')[0]?.textContent || '',
    zona: node.getElementsByTagName('zona')[0]?.textContent || '',
    cp: node.getElementsByTagName('cp')[0]?.textContent || '',
    calle: node.getElementsByTagName('calle')[0]?.textContent || '',
    planta: node.getElementsByTagName('planta')[0]?.textContent || '',
    numplanta: node.getElementsByTagName('numplanta')[0]?.textContent || '',
    plaza_garaje: node.getElementsByTagName('garaje')[0]?.textContent || '',

    price: node.getElementsByTagName('precioventa')[0]?.textContent || '',
    precio_alquiler:
      node.getElementsByTagName('precioalquiler')[0]?.textContent || '',
    gastos_comunidad:
      node.getElementsByTagName('gastos_comunidad')[0]?.textContent || '',
    ibi: node.getElementsByTagName('ibi')[0]?.textContent || '',
    outlet: node.getElementsByTagName('outlet')[0]?.textContent || '',

    m_cons: node.getElementsByTagName('mconstruidos')[0]?.textContent || '',
    m_uties: node.getElementsByTagName('mutiles')[0]?.textContent || '',
    m_parcela: node.getElementsByTagName('parcela')[0]?.textContent || '',
    m_terraza: node.getElementsByTagName('m_terraza')[0]?.textContent || '',
    salon: node.getElementsByTagName('salon')[0]?.textContent || '',

    habsimples: node.getElementsByTagName('habsimples')[0]?.textContent || '',
    habdobles: node.getElementsByTagName('habdobles')[0]?.textContent || '',
    banyos: node.getElementsByTagName('banos')[0]?.textContent || '',
    aseos: node.getElementsByTagName('aseos')[0]?.textContent || '0',

    longitud: node.getElementsByTagName('longitud')[0]?.textContent || '',
    latitud: node.getElementsByTagName('latitud')[0]?.textContent || '',

    title: node.getElementsByTagName('titulo')[0]?.textContent?.trim() || '',
    description:
      node.getElementsByTagName('descripcion')[0]?.textContent?.trim() || '',
    image: node.getElementsByTagName('foto1')[0]?.textContent || '',
    num_fotos:
      Number(node.getElementsByTagName('numfotos')[0]?.textContent) || 50,

    exclusiva: node.getElementsByTagName('exclu')[0]?.textContent || '',
    reservado: node.getElementsByTagName('reservado')[0]?.textContent || '',
    estadoficha: node.getElementsByTagName('estadoficha')[0]?.textContent || '',
    destacado: node.getElementsByTagName('destacado')[0]?.textContent || '',
    opcioncompra:
      node.getElementsByTagName('opcioncompra')[0]?.textContent || '',

    agente: node.getElementsByTagName('agente')[0]?.textContent || '',
    email_agente:
      node.getElementsByTagName('email_agente')[0]?.textContent || '',
    tlf_agente: node.getElementsByTagName('tlf_agente')[0]?.textContent || '',

    letra_ener:
      node.getElementsByTagName('calificacion_energetica')[0]?.textContent ||
      '',
    letra_emi:
      node.getElementsByTagName('calificacionemisiones')[0]?.textContent || '',
    ener_valor:
      node.getElementsByTagName('prestacion_energetica')[0]?.textContent || '',
    emi_valor: node.getElementsByTagName('emisiones')[0]?.textContent || '',

    images: getImages(node),
    accion: getAccion(node),
    extras: getExtras(node),
    entorno: getEntorno(node),
  }));

  return data;
};
