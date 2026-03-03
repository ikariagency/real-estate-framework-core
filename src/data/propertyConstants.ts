export const PROVINCES = [
  'A Coruña', 'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila',
  'Badajoz', 'Baleares', 'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria',
  'Castellón', 'Ceuta', 'Ciudad Real', 'Córdoba', 'Cuenca', 'Girona', 'Granada',
  'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca', 'Jaén', 'La Rioja', 'Las Palmas',
  'León', 'Lleida', 'Lugo', 'Madrid', 'Málaga', 'Melilla', 'Murcia', 'Navarra',
  'Orense', 'Palencia', 'Pontevedra', 'Salamanca', 'Segovia', 'Sevilla', 'Soria',
  'Tarragona', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza',
];

export const PROPERTY_TYPES = [
  'Piso', 'Apartamento', 'Ático', 'Ático Dúplex', 'Dúplex', 'Planta Baja', 'Estudio',
  'Casa', 'Chalet', 'Adosado', 'Villa', 'Villa de Lujo', 'Casa de Pueblo',
  'Finca Rústica', 'Masía', 'Edificio',
  'Local Comercial', 'Nave Industrial', 'Parking', 'Trastero',
  'Parcela', 'Solar', 'Terreno',
];

export const PROPERTY_TYPE_SLUGS: Record<string, string> = {
  'Piso': 'piso', 'Apartamento': 'apartamento', 'Ático': 'atico',
  'Estudio': 'estudio', 'Local Comercial': 'local', 'Dúplex': 'duplex',
  'Chalet': 'chalet', 'Loft': 'loft',
};

export const CONDITIONS = [
  'A reformar', 'Original', 'Parcialmente reformado', 'Buen estado',
  'Reformado', 'Semi-nuevo', 'Obra nueva', 'En construcción',
];

export const INTERIOR_CARPENTRY = ['Aluminio', 'Madera', 'PVC', 'Cristal', 'Roble', 'Pino', 'Nogal', 'Haya'];
export const EXTERIOR_CARPENTRY = ['Aluminio', 'Aluminio Lacado', 'Aluminio/Climalit', 'Climalit', 'Doble Acristalamiento', 'Hierro', 'Madera', 'PVC', 'PVC Climalit'];
export const VIEWS_OPTIONS = ['Calle', 'Piscina', 'Playa', 'Mar', 'Mar y Montaña', 'Parque', 'Río', 'Avenida', 'Exterior', 'Jardín', 'Montaña', 'Panorámica', 'Patio', 'Plaza', 'Valle'];

export const EXTRAS_LIST = [
  'Agua', 'Aire acondicionado', 'Aire acondicionado central', 'Alarma', 'Alarma incendios',
  'Alarma robo', 'Apartamento independiente', 'Armarios empotrados', 'Ascensor', 'Balcón',
  'Bar', 'Barbacoa', 'Buhardilla', 'Caja fuerte', 'Calefacción', 'Calefacción central',
  'Chimenea', 'Cocina independiente', 'Depósito de agua', 'Electrodomésticos',
  'Galería', 'Gas central', 'Gimnasio', 'Sala de juegos', 'Jacuzzi', 'Jardín',
  'Lavandería', 'Línea telefónica', 'Electricidad', 'Cenador', 'Amueblado', 'Mirilla',
  'Parking', 'Patio', 'Pérgola', 'Piscina comunitaria', 'Piscina privada', 'Garaje',
  'Portero físico', 'Primera línea', 'Puerta de seguridad', 'Puertas automáticas',
  'Riego automático', 'Satélite', 'Sauna', 'Solárium', 'Pista de tenis',
  'Terraza', 'Terraza acristalada', 'Todo exterior', 'Trastero', 'TV',
  'Urbanización', 'Armarios', 'Videoportero',
];

export const RENT_CATEGORIES = [
  { value: 'temporary', label: 'Temporal' },
  { value: 'long_term', label: 'Larga duración' },
  { value: 'room', label: 'Habitación' },
];

export const ZONES_MADRID = [
  'Arganzuela', 'Barajas', 'Carabanchel', 'Centro', 'Chamartín', 'Chamberí',
  'Ciudad Lineal', 'Fuencarral-El Pardo', 'Hortaleza', 'Latina', 'Moncloa-Aravaca',
  'Moratalaz', 'Puente de Vallecas', 'Retiro', 'Salamanca', 'San Blas-Canillejas',
  'Tetuán', 'Usera', 'Vicálvaro', 'Villa de Vallecas', 'Villaverde',
];
