import { Language } from './translations';

export interface PropertyI18n {
  // Tags / statuses
  reserved: string;
  sold: string;
  available: string;
  // Property page
  propertiesInMadrid: string;
  findNext: string;
  home: string;
  properties: string;
  operation: string;
  allOperations: string;
  sale: string;
  rent: string;
  rentType: string;
  allRentals: string;
  temporary: string;
  longTerm: string;
  rooms: string;
  type: string;
  allTypes: string;
  zone: string;
  allZones: string;
  minPrice: string;
  maxPrice: string;
  filters: string;
  clear: string;
  advancedSearch: string;
  bedrooms: string;
  bathrooms: string;
  allBedrooms: string;
  allBathrooms: string;
  areaFrom: string;
  areaTo: string;
  propertiesFound: string;
  list: string;
  map: string;
  show: string;
  sort: string;
  sortDefault: string;
  sortNewest: string;
  sortOldest: string;
  sortPriceAsc: string;
  sortPriceDesc: string;
  sortAreaDesc: string;
  noProperties: string;
  adjustFilters: string;
  clearFilters: string;
  loadingMap: string;
  applyFilters: string;
  minBedrooms: string;
  statusFilter: string;
  allStatuses: string;
  // Feature filters
  pool: string;
  parking: string;
  elevator: string;
  terrace: string;
  furnished: string;
  gatedCommunity: string;
  newBuild: string;
  views: string;
  // Property types
  typeApartment: string;
  typePenthouse: string;
  typeVilla: string;
  typeStudio: string;
  typeCommercial: string;
  typeRoom: string;
  typeDuplex: string;
  typeLoft: string;
  // Detail page
  notFound: string;
  viewProperties: string;
  backToProperties: string;
  builtArea: string;
  usefulArea: string;
  floor: string;
  condition: string;
  yearBuilt: string;
  features: string;
  basicFeatures: string;
  equipment: string;
  extras: string;
  yes: string;
  no: string;
  garage: string;
  description: string;
  location: string;
  energyCert: string;
  energyConsumption: string;
  requestInfo: string;
  contact: string;
  call: string;
  propertyLocatedIn: string;
  soughtAfterArea: string;
  area: string;
  // Index page
  ourCatalog: string;
  propertiesForSale: string;
  propertiesForRent: string;
  rental: string;
  viewAllSale: string;
  viewAllRent: string;
  years: string;
}

const es: PropertyI18n = {
  reserved: 'Reservado',
  sold: 'Vendido',
  available: 'Disponible',
  propertiesInMadrid: 'Propiedades en Madrid',
  findNext: 'Encuentra tu próxima inversión o vivienda ideal',
  home: 'Inicio',
  properties: 'Propiedades',
  operation: 'Operación',
  allOperations: 'Todas',
  sale: 'Venta',
  rent: 'Alquiler',
  rentType: 'Tipo de alquiler',
  allRentals: 'Todos los alquileres',
  temporary: 'Alquiler temporal',
  longTerm: 'Larga estancia',
  rooms: 'Habitaciones',
  type: 'Tipo',
  allTypes: 'Todos',
  zone: 'Zona',
  allZones: 'Todas',
  minPrice: 'Precio mín.',
  maxPrice: 'Precio máx.',
  filters: 'Filtros',
  clear: 'Limpiar',
  advancedSearch: 'Búsqueda avanzada',
  bedrooms: 'Habitaciones',
  bathrooms: 'Baños',
  allBedrooms: 'Todas',
  allBathrooms: 'Todos',
  areaFrom: 'Superficie desde',
  areaTo: 'Superficie hasta',
  propertiesFound: 'propiedades encontradas',
  list: 'Lista',
  map: 'Mapa',
  show: 'Mostrar:',
  sort: 'Ordenar:',
  sortDefault: 'Por defecto',
  sortNewest: 'Más recientes',
  sortOldest: 'Más antiguos',
  sortPriceAsc: 'Precio: menor a mayor',
  sortPriceDesc: 'Precio: mayor a menor',
  sortAreaDesc: 'Mayor superficie',
  noProperties: 'No se encontraron propiedades',
  adjustFilters: 'Prueba a modificar los filtros',
  clearFilters: 'Limpiar filtros',
  loadingMap: 'Cargando mapa...',
  applyFilters: 'Aplicar filtros',
  minBedrooms: 'Habitaciones mín.',
  statusFilter: 'Estado',
  allStatuses: 'Todos los estados',
  pool: 'Piscina',
  parking: 'Parking',
  elevator: 'Ascensor',
  terrace: 'Terraza',
  furnished: 'Amueblado',
  gatedCommunity: 'Urbanización',
  newBuild: 'Obra Nueva',
  views: 'Vistas',
  typeApartment: 'Piso',
  typePenthouse: 'Ático',
  typeVilla: 'Chalet',
  typeStudio: 'Estudio',
  typeCommercial: 'Local comercial',
  typeRoom: 'Habitación',
  typeDuplex: 'Dúplex',
  typeLoft: 'Loft',
  notFound: 'Propiedad no encontrada',
  viewProperties: 'Ver propiedades',
  backToProperties: 'Volver a propiedades',
  builtArea: 'Superficie construida',
  usefulArea: 'Superficie útil',
  floor: 'Planta',
  condition: 'Estado',
  yearBuilt: 'Año construcción',
  features: 'Características',
  basicFeatures: 'Características básicas',
  equipment: 'Equipamiento',
  extras: 'Extras',
  yes: 'Sí',
  no: 'No',
  garage: 'Garaje',
  description: 'Descripción',
  location: 'Ubicación',
  energyCert: 'Certificación energética',
  energyConsumption: 'Consumo energético',
  requestInfo: 'Solicitar información',
  contact: 'Contactar',
  call: 'Llamar',
  propertyLocatedIn: 'Propiedad ubicada en la zona de',
  soughtAfterArea: 'una de las áreas más demandadas de Madrid.',
  area: 'Superficie',
  ourCatalog: 'Nuestro catálogo',
  propertiesForSale: 'Propiedades en Venta',
  propertiesForRent: 'Propiedades en Alquiler',
  rental: 'Alquiler',
  viewAllSale: 'Ver todas las propiedades en venta',
  viewAllRent: 'Ver todas las propiedades en alquiler',
  years: 'años',
};

const en: PropertyI18n = {
  reserved: 'Reserved',
  sold: 'Sold',
  available: 'Available',
  propertiesInMadrid: 'Properties in Madrid',
  findNext: 'Find your next investment or ideal home',
  home: 'Home',
  properties: 'Properties',
  operation: 'Operation',
  allOperations: 'All',
  sale: 'Sale',
  rent: 'Rent',
  rentType: 'Rent type',
  allRentals: 'All rentals',
  temporary: 'Temporary rental',
  longTerm: 'Long term',
  rooms: 'Rooms',
  type: 'Type',
  allTypes: 'All',
  zone: 'Area',
  allZones: 'All',
  minPrice: 'Min price',
  maxPrice: 'Max price',
  filters: 'Filters',
  clear: 'Clear',
  advancedSearch: 'Advanced search',
  bedrooms: 'Bedrooms',
  bathrooms: 'Bathrooms',
  allBedrooms: 'Any',
  allBathrooms: 'Any',
  areaFrom: 'Area from',
  areaTo: 'Area to',
  propertiesFound: 'properties found',
  list: 'List',
  map: 'Map',
  show: 'Show:',
  sort: 'Sort:',
  sortDefault: 'Default',
  sortNewest: 'Newest first',
  sortOldest: 'Oldest first',
  sortPriceAsc: 'Price: low to high',
  sortPriceDesc: 'Price: high to low',
  sortAreaDesc: 'Largest area',
  noProperties: 'No properties found',
  adjustFilters: 'Try adjusting your filters',
  clearFilters: 'Clear filters',
  loadingMap: 'Loading map...',
  applyFilters: 'Apply filters',
  minBedrooms: 'Min. bedrooms',
  statusFilter: 'Status',
  allStatuses: 'All statuses',
  pool: 'Pool',
  parking: 'Parking',
  elevator: 'Elevator',
  terrace: 'Terrace',
  furnished: 'Furnished',
  gatedCommunity: 'Gated community',
  newBuild: 'New build',
  views: 'Views',
  typeApartment: 'Apartment',
  typePenthouse: 'Penthouse',
  typeVilla: 'Villa',
  typeStudio: 'Studio',
  typeCommercial: 'Commercial space',
  typeRoom: 'Room',
  typeDuplex: 'Duplex',
  typeLoft: 'Loft',
  notFound: 'Property not found',
  viewProperties: 'View properties',
  backToProperties: 'Back to properties',
  builtArea: 'Built area',
  usefulArea: 'Useful area',
  floor: 'Floor',
  condition: 'Condition',
  yearBuilt: 'Year built',
  features: 'Features',
  basicFeatures: 'Basic features',
  equipment: 'Equipment',
  extras: 'Extras',
  yes: 'Yes',
  no: 'No',
  garage: 'Garage',
  description: 'Description',
  location: 'Location',
  energyCert: 'Energy certification',
  energyConsumption: 'Energy consumption',
  requestInfo: 'Request information',
  contact: 'Contact',
  call: 'Call',
  propertyLocatedIn: 'Property located in the',
  soughtAfterArea: "area, one of Madrid's most sought-after areas.",
  area: 'Area',
  ourCatalog: 'Our catalog',
  propertiesForSale: 'Properties for Sale',
  propertiesForRent: 'Properties for Rent',
  rental: 'Rental',
  viewAllSale: 'View all properties for sale',
  viewAllRent: 'View all rental properties',
  years: 'years',
};

const nl: PropertyI18n = {
  ...en,
  reserved: 'Gereserveerd', sold: 'Verkocht', available: 'Beschikbaar',
  propertiesInMadrid: 'Woningen in Madrid', findNext: 'Vind uw volgende investering of ideale woning',
  home: 'Home', properties: 'Woningen', operation: 'Type', allOperations: 'Alle',
  sale: 'Koop', rent: 'Huur', rentType: 'Huurtype', allRentals: 'Alle huurwoningen',
  temporary: 'Tijdelijke huur', longTerm: 'Langdurige huur', rooms: 'Kamers',
  type: 'Type', allTypes: 'Alle', zone: 'Gebied', allZones: 'Alle',
  minPrice: 'Min. prijs', maxPrice: 'Max. prijs', filters: 'Filters', clear: 'Wissen',
  advancedSearch: 'Geavanceerd zoeken', bedrooms: 'Slaapkamers', bathrooms: 'Badkamers',
  allBedrooms: 'Alle', allBathrooms: 'Alle', areaFrom: 'Oppervlakte vanaf', areaTo: 'Oppervlakte tot',
  propertiesFound: 'woningen gevonden', list: 'Lijst', map: 'Kaart', show: 'Tonen:',
  sort: 'Sorteren:', sortDefault: 'Standaard', sortNewest: 'Nieuwste eerst', sortOldest: 'Oudste eerst', sortPriceAsc: 'Prijs: laag naar hoog',
  sortPriceDesc: 'Prijs: hoog naar laag', sortAreaDesc: 'Grootste oppervlakte',
  noProperties: 'Geen woningen gevonden', adjustFilters: 'Pas de filters aan',
  clearFilters: 'Filters wissen', loadingMap: 'Kaart laden...', applyFilters: 'Filters toepassen',
  minBedrooms: 'Min. slaapkamers', pool: 'Zwembad', parking: 'Parking', elevator: 'Lift',
  terrace: 'Terras', furnished: 'Gemeubileerd', gatedCommunity: 'Beveiligde woonwijk',
  newBuild: 'Nieuwbouw', views: 'Uitzicht',
  typeApartment: 'Appartement', typePenthouse: 'Penthouse', typeVilla: 'Villa',
  typeStudio: 'Studio', typeCommercial: 'Commerciële ruimte', typeRoom: 'Kamer',
  typeDuplex: 'Duplex', typeLoft: 'Loft',
  notFound: 'Woning niet gevonden', viewProperties: 'Bekijk woningen', backToProperties: 'Terug naar woningen',
  builtArea: 'Bebouwde oppervlakte', usefulArea: 'Bruikbare oppervlakte',
  floor: 'Verdieping', condition: 'Staat', yearBuilt: 'Bouwjaar',
  features: 'Kenmerken', basicFeatures: 'Basiskenmerken', equipment: 'Uitrusting', extras: 'Extra\'s',
  yes: 'Ja', no: 'Nee', garage: 'Garage', description: 'Beschrijving',
  location: 'Locatie', energyCert: 'Energiecertificaat', energyConsumption: 'Energieverbruik',
  requestInfo: 'Informatie aanvragen', contact: 'Contact', call: 'Bellen',
  propertyLocatedIn: 'Woning gelegen in', soughtAfterArea: 'een van de meest gewilde gebieden van Madrid.',
  area: 'Oppervlakte', ourCatalog: 'Ons aanbod', propertiesForSale: 'Woningen te koop',
  propertiesForRent: 'Woningen te huur', rental: 'Huur',
  viewAllSale: 'Bekijk alle koopwoningen', viewAllRent: 'Bekijk alle huurwoningen', years: 'jaar',
};

const de: PropertyI18n = {
  ...en,
  reserved: 'Reserviert', sold: 'Verkauft', available: 'Verfügbar',
  propertiesInMadrid: 'Immobilien in Madrid', findNext: 'Finden Sie Ihre nächste Investition oder Traumimmobilie',
  home: 'Startseite', properties: 'Immobilien', operation: 'Art', allOperations: 'Alle',
  sale: 'Kauf', rent: 'Miete', rentType: 'Mietart', allRentals: 'Alle Mietobjekte',
  temporary: 'Kurzzeitmiete', longTerm: 'Langzeitmiete', rooms: 'Zimmer',
  type: 'Typ', allTypes: 'Alle', zone: 'Gebiet', allZones: 'Alle',
  minPrice: 'Min. Preis', maxPrice: 'Max. Preis', filters: 'Filter', clear: 'Löschen',
  advancedSearch: 'Erweiterte Suche', bedrooms: 'Schlafzimmer', bathrooms: 'Badezimmer',
  allBedrooms: 'Alle', allBathrooms: 'Alle', areaFrom: 'Fläche ab', areaTo: 'Fläche bis',
  propertiesFound: 'Immobilien gefunden', list: 'Liste', map: 'Karte', show: 'Anzeigen:',
  sort: 'Sortieren:', sortDefault: 'Standard', sortNewest: 'Neueste zuerst', sortOldest: 'Älteste zuerst', sortPriceAsc: 'Preis: aufsteigend',
  sortPriceDesc: 'Preis: absteigend', sortAreaDesc: 'Größte Fläche',
  noProperties: 'Keine Immobilien gefunden', adjustFilters: 'Passen Sie die Filter an',
  clearFilters: 'Filter löschen', loadingMap: 'Karte wird geladen...', applyFilters: 'Filter anwenden',
  minBedrooms: 'Min. Schlafzimmer', pool: 'Pool', parking: 'Parkplatz', elevator: 'Aufzug',
  terrace: 'Terrasse', furnished: 'Möbliert', gatedCommunity: 'Wohnanlage',
  newBuild: 'Neubau', views: 'Aussicht',
  typeApartment: 'Wohnung', typePenthouse: 'Penthouse', typeVilla: 'Villa',
  typeStudio: 'Studio', typeCommercial: 'Gewerbefläche', typeRoom: 'Zimmer',
  typeDuplex: 'Duplex', typeLoft: 'Loft',
  notFound: 'Immobilie nicht gefunden', viewProperties: 'Immobilien ansehen', backToProperties: 'Zurück zu Immobilien',
  builtArea: 'Bebaute Fläche', usefulArea: 'Nutzfläche', floor: 'Etage', condition: 'Zustand',
  yearBuilt: 'Baujahr', features: 'Merkmale', basicFeatures: 'Grundausstattung',
  equipment: 'Ausstattung', extras: 'Extras', yes: 'Ja', no: 'Nein', garage: 'Garage',
  description: 'Beschreibung', location: 'Lage', energyCert: 'Energieausweis',
  energyConsumption: 'Energieverbrauch', requestInfo: 'Informationen anfordern',
  contact: 'Kontakt', call: 'Anrufen',
  propertyLocatedIn: 'Immobilie im Gebiet', soughtAfterArea: 'eines der beliebtesten Viertel Madrids.',
  area: 'Fläche', ourCatalog: 'Unser Angebot', propertiesForSale: 'Immobilien zum Kauf',
  propertiesForRent: 'Immobilien zur Miete', rental: 'Miete',
  viewAllSale: 'Alle Kaufimmobilien', viewAllRent: 'Alle Mietimmobilien', years: 'Jahre',
};

const fr: PropertyI18n = {
  ...en,
  reserved: 'Réservé', sold: 'Vendu', available: 'Disponible',
  propertiesInMadrid: 'Propriétés à Madrid', findNext: 'Trouvez votre prochain investissement ou logement idéal',
  home: 'Accueil', properties: 'Propriétés', operation: 'Opération', allOperations: 'Toutes',
  sale: 'Vente', rent: 'Location', rentType: 'Type de location', allRentals: 'Toutes les locations',
  temporary: 'Location temporaire', longTerm: 'Longue durée', rooms: 'Chambres',
  type: 'Type', allTypes: 'Tous', zone: 'Zone', allZones: 'Toutes',
  minPrice: 'Prix min.', maxPrice: 'Prix max.', filters: 'Filtres', clear: 'Effacer',
  advancedSearch: 'Recherche avancée', bedrooms: 'Chambres', bathrooms: 'Salles de bain',
  allBedrooms: 'Toutes', allBathrooms: 'Toutes', areaFrom: 'Surface depuis', areaTo: 'Surface jusqu\'à',
  propertiesFound: 'propriétés trouvées', list: 'Liste', map: 'Carte', show: 'Afficher :',
  sort: 'Trier :', sortDefault: 'Par défaut', sortNewest: 'Plus récents', sortOldest: 'Plus anciens', sortPriceAsc: 'Prix : croissant',
  sortPriceDesc: 'Prix : décroissant', sortAreaDesc: 'Plus grande surface',
  noProperties: 'Aucune propriété trouvée', adjustFilters: 'Essayez de modifier les filtres',
  clearFilters: 'Effacer les filtres', loadingMap: 'Chargement de la carte...', applyFilters: 'Appliquer les filtres',
  minBedrooms: 'Chambres min.', pool: 'Piscine', parking: 'Parking', elevator: 'Ascenseur',
  terrace: 'Terrasse', furnished: 'Meublé', gatedCommunity: 'Résidence fermée',
  newBuild: 'Neuf', views: 'Vue',
  typeApartment: 'Appartement', typePenthouse: 'Penthouse', typeVilla: 'Villa',
  typeStudio: 'Studio', typeCommercial: 'Local commercial', typeRoom: 'Chambre',
  typeDuplex: 'Duplex', typeLoft: 'Loft',
  notFound: 'Propriété non trouvée', viewProperties: 'Voir les propriétés', backToProperties: 'Retour aux propriétés',
  builtArea: 'Surface construite', usefulArea: 'Surface utile', floor: 'Étage', condition: 'État',
  yearBuilt: 'Année de construction', features: 'Caractéristiques', basicFeatures: 'Caractéristiques de base',
  equipment: 'Équipement', extras: 'Extras', yes: 'Oui', no: 'Non', garage: 'Garage',
  description: 'Description', location: 'Emplacement', energyCert: 'Certification énergétique',
  energyConsumption: 'Consommation énergétique', requestInfo: 'Demander des informations',
  contact: 'Contacter', call: 'Appeler',
  propertyLocatedIn: 'Propriété située dans le quartier de', soughtAfterArea: "l'un des quartiers les plus prisés de Madrid.",
  area: 'Surface', ourCatalog: 'Notre catalogue', propertiesForSale: 'Propriétés à vendre',
  propertiesForRent: 'Propriétés à louer', rental: 'Location',
  viewAllSale: 'Voir toutes les propriétés à vendre', viewAllRent: 'Voir toutes les propriétés à louer', years: 'ans',
};

const ru: PropertyI18n = {
  ...en,
  reserved: 'Забронировано', sold: 'Продано', available: 'Доступно',
  propertiesInMadrid: 'Недвижимость в Мадриде', findNext: 'Найдите свою следующую инвестицию или идеальное жильё',
  home: 'Главная', properties: 'Недвижимость', operation: 'Тип', allOperations: 'Все',
  sale: 'Продажа', rent: 'Аренда', rentType: 'Тип аренды', allRentals: 'Вся аренда',
  temporary: 'Краткосрочная аренда', longTerm: 'Долгосрочная аренда', rooms: 'Комнаты',
  type: 'Тип', allTypes: 'Все', zone: 'Район', allZones: 'Все',
  minPrice: 'Мин. цена', maxPrice: 'Макс. цена', filters: 'Фильтры', clear: 'Очистить',
  advancedSearch: 'Расширенный поиск', bedrooms: 'Спальни', bathrooms: 'Ванные',
  allBedrooms: 'Все', allBathrooms: 'Все', areaFrom: 'Площадь от', areaTo: 'Площадь до',
  propertiesFound: 'объектов найдено', list: 'Список', map: 'Карта', show: 'Показать:',
  sort: 'Сортировка:', sortDefault: 'По умолчанию', sortNewest: 'Сначала новые', sortOldest: 'Сначала старые', sortPriceAsc: 'Цена: по возрастанию',
  sortPriceDesc: 'Цена: по убыванию', sortAreaDesc: 'Наибольшая площадь',
  noProperties: 'Объекты не найдены', adjustFilters: 'Попробуйте изменить фильтры',
  clearFilters: 'Сбросить фильтры', loadingMap: 'Загрузка карты...', applyFilters: 'Применить фильтры',
  minBedrooms: 'Мин. спальни', pool: 'Бассейн', parking: 'Парковка', elevator: 'Лифт',
  terrace: 'Терраса', furnished: 'С мебелью', gatedCommunity: 'Закрытый комплекс',
  newBuild: 'Новостройка', views: 'Вид',
  typeApartment: 'Квартира', typePenthouse: 'Пентхаус', typeVilla: 'Вилла',
  typeStudio: 'Студия', typeCommercial: 'Коммерческое помещение', typeRoom: 'Комната',
  typeDuplex: 'Дуплекс', typeLoft: 'Лофт',
  notFound: 'Объект не найден', viewProperties: 'Смотреть объекты', backToProperties: 'Назад к объектам',
  builtArea: 'Общая площадь', usefulArea: 'Полезная площадь', floor: 'Этаж', condition: 'Состояние',
  yearBuilt: 'Год постройки', features: 'Характеристики', basicFeatures: 'Основные характеристики',
  equipment: 'Оборудование', extras: 'Дополнительно', yes: 'Да', no: 'Нет', garage: 'Гараж',
  description: 'Описание', location: 'Расположение', energyCert: 'Энергетический сертификат',
  energyConsumption: 'Энергопотребление', requestInfo: 'Запросить информацию',
  contact: 'Связаться', call: 'Позвонить',
  propertyLocatedIn: 'Объект расположен в районе', soughtAfterArea: 'один из самых востребованных районов Мадрида.',
  area: 'Площадь', ourCatalog: 'Наш каталог', propertiesForSale: 'Продажа недвижимости',
  propertiesForRent: 'Аренда недвижимости', rental: 'Аренда',
  viewAllSale: 'Все объекты на продажу', viewAllRent: 'Все объекты в аренду', years: 'лет',
};

const cat: PropertyI18n = {
  ...es,
  reserved: 'Reservat', sold: 'Venut', available: 'Disponible',
  propertiesInMadrid: 'Propietats a Madrid', findNext: 'Troba la teva pròxima inversió o habitatge ideal',
  home: 'Inici', properties: 'Propietats', operation: 'Operació', allOperations: 'Totes',
  sale: 'Venda', rent: 'Lloguer', rentType: 'Tipus de lloguer', allRentals: 'Tots els lloguers',
  temporary: 'Lloguer temporal', longTerm: 'Llarga estada', rooms: 'Habitacions',
  allTypes: 'Tots', allZones: 'Totes', filters: 'Filtres', clear: 'Netejar',
  advancedSearch: 'Cerca avançada', bedrooms: 'Habitacions', bathrooms: 'Banys',
  allBedrooms: 'Totes', allBathrooms: 'Tots', areaFrom: 'Superfície des de', areaTo: 'Superfície fins',
  propertiesFound: 'propietats trobades', list: 'Llista', map: 'Mapa', show: 'Mostrar:',
  sort: 'Ordenar:', sortDefault: 'Per defecte', sortNewest: 'Més recents', sortOldest: 'Més antics', sortPriceAsc: 'Preu: menor a major',
  sortPriceDesc: 'Preu: major a menor', sortAreaDesc: 'Més superfície',
  noProperties: 'No s\'han trobat propietats', adjustFilters: 'Prova a modificar els filtres',
  clearFilters: 'Netejar filtres', loadingMap: 'Carregant mapa...', applyFilters: 'Aplicar filtres',
  minBedrooms: 'Habitacions mín.', pool: 'Piscina', parking: 'Pàrquing', elevator: 'Ascensor',
  terrace: 'Terrassa', furnished: 'Moblat', gatedCommunity: 'Urbanització',
  newBuild: 'Obra nova', views: 'Vistes',
  typeApartment: 'Pis', typePenthouse: 'Àtic', typeVilla: 'Xalet',
  notFound: 'Propietat no trobada', viewProperties: 'Veure propietats', backToProperties: 'Tornar a propietats',
  builtArea: 'Superfície construïda', usefulArea: 'Superfície útil', floor: 'Planta',
  condition: 'Estat', yearBuilt: 'Any de construcció', features: 'Característiques',
  basicFeatures: 'Característiques bàsiques', equipment: 'Equipament', extras: 'Extres',
  yes: 'Sí', no: 'No', description: 'Descripció', location: 'Ubicació',
  energyCert: 'Certificació energètica', energyConsumption: 'Consum energètic',
  requestInfo: 'Sol·licitar informació', contact: 'Contactar', call: 'Trucar',
  propertyLocatedIn: 'Propietat ubicada a la zona de',
  soughtAfterArea: 'una de les àrees més demandades de Madrid.',
  ourCatalog: 'El nostre catàleg', propertiesForSale: 'Propietats en Venda',
  propertiesForRent: 'Propietats en Lloguer', rental: 'Lloguer',
  viewAllSale: 'Veure totes les propietats en venda', viewAllRent: 'Veure totes les propietats en lloguer', years: 'anys',
};

const pt: PropertyI18n = {
  ...en,
  reserved: 'Reservado', sold: 'Vendido', available: 'Disponível',
  propertiesInMadrid: 'Propriedades em Madrid', findNext: 'Encontre o seu próximo investimento ou casa ideal',
  home: 'Início', properties: 'Propriedades', operation: 'Operação', allOperations: 'Todas',
  sale: 'Venda', rent: 'Aluguer', rentType: 'Tipo de aluguer', allRentals: 'Todos os alugueres',
  temporary: 'Aluguer temporário', longTerm: 'Longa duração', rooms: 'Quartos',
  allTypes: 'Todos', allZones: 'Todas', filters: 'Filtros', clear: 'Limpar',
  advancedSearch: 'Pesquisa avançada', bedrooms: 'Quartos', bathrooms: 'Casas de banho',
  allBedrooms: 'Todos', allBathrooms: 'Todos', areaFrom: 'Área desde', areaTo: 'Área até',
  propertiesFound: 'propriedades encontradas', clearFilters: 'Limpar filtros',
  loadingMap: 'A carregar mapa...', applyFilters: 'Aplicar filtros',
  minBedrooms: 'Quartos mín.', pool: 'Piscina', parking: 'Estacionamento', elevator: 'Elevador',
  terrace: 'Terraço', furnished: 'Mobilado', gatedCommunity: 'Condomínio fechado',
  newBuild: 'Construção nova', views: 'Vista',
  typeApartment: 'Apartamento', typePenthouse: 'Cobertura', typeVilla: 'Moradia',
  notFound: 'Propriedade não encontrada', viewProperties: 'Ver propriedades',
  backToProperties: 'Voltar às propriedades', builtArea: 'Área construída',
  usefulArea: 'Área útil', floor: 'Andar', condition: 'Condição', yearBuilt: 'Ano de construção',
  features: 'Características', basicFeatures: 'Características básicas', equipment: 'Equipamento',
  extras: 'Extras', yes: 'Sim', no: 'Não', description: 'Descrição', location: 'Localização',
  energyCert: 'Certificação energética', energyConsumption: 'Consumo energético',
  requestInfo: 'Solicitar informação', contact: 'Contactar', call: 'Ligar',
  propertyLocatedIn: 'Propriedade localizada na zona de',
  soughtAfterArea: 'uma das áreas mais procuradas de Madrid.',
  ourCatalog: 'O nosso catálogo', propertiesForSale: 'Propriedades à Venda',
  propertiesForRent: 'Propriedades para Alugar', rental: 'Aluguer',
  viewAllSale: 'Ver todas à venda', viewAllRent: 'Ver todas para alugar', years: 'anos',
};

const no: PropertyI18n = {
  ...en,
  reserved: 'Reservert', sold: 'Solgt', available: 'Tilgjengelig',
  propertiesInMadrid: 'Eiendommer i Madrid', findNext: 'Finn din neste investering eller drømmebolig',
  home: 'Hjem', properties: 'Eiendommer', allOperations: 'Alle', sale: 'Salg', rent: 'Leie',
  rentType: 'Leietype', allRentals: 'Alle utleie', temporary: 'Korttidsleie', longTerm: 'Langtidsleie',
  rooms: 'Rom', allTypes: 'Alle', allZones: 'Alle', filters: 'Filtre', clear: 'Tøm',
  advancedSearch: 'Avansert søk', bedrooms: 'Soverom', bathrooms: 'Bad',
  propertiesFound: 'eiendommer funnet', clearFilters: 'Tøm filtre',
  notFound: 'Eiendom ikke funnet', viewProperties: 'Se eiendommer', backToProperties: 'Tilbake til eiendommer',
  description: 'Beskrivelse', location: 'Beliggenhet',
  requestInfo: 'Be om informasjon', contact: 'Kontakt', call: 'Ring',
  ourCatalog: 'Vårt utvalg', propertiesForSale: 'Eiendommer til salgs',
  propertiesForRent: 'Eiendommer til leie', rental: 'Leie',
  viewAllSale: 'Se alle til salgs', viewAllRent: 'Se alle til leie', years: 'år',
};

const fi: PropertyI18n = {
  ...en,
  reserved: 'Varattu', sold: 'Myyty', available: 'Saatavilla',
  propertiesInMadrid: 'Kiinteistöt Madridissa', findNext: 'Löydä seuraava sijoituksesi tai unelmiesi koti',
  home: 'Etusivu', properties: 'Kiinteistöt', allOperations: 'Kaikki', sale: 'Myynti', rent: 'Vuokra',
  rentType: 'Vuokratyyppi', allRentals: 'Kaikki vuokrat', temporary: 'Lyhytaikaisvuokra', longTerm: 'Pitkäaikaisvuokra',
  rooms: 'Huoneet', allTypes: 'Kaikki', allZones: 'Kaikki', filters: 'Suodattimet', clear: 'Tyhjennä',
  advancedSearch: 'Tarkennettu haku', bedrooms: 'Makuuhuoneet', bathrooms: 'Kylpyhuoneet',
  propertiesFound: 'kohdetta löytyi', clearFilters: 'Tyhjennä suodattimet',
  notFound: 'Kohdetta ei löytynyt', viewProperties: 'Katso kohteet', backToProperties: 'Takaisin kohteisiin',
  description: 'Kuvaus', location: 'Sijainti',
  requestInfo: 'Pyydä tietoja', contact: 'Ota yhteyttä', call: 'Soita',
  ourCatalog: 'Valikoimamme', propertiesForSale: 'Myytävät kohteet',
  propertiesForRent: 'Vuokrattavat kohteet', rental: 'Vuokra',
  viewAllSale: 'Kaikki myytävät', viewAllRent: 'Kaikki vuokrattavat', years: 'vuotta',
};

const se: PropertyI18n = {
  ...en,
  reserved: 'Reserverad', sold: 'Såld', available: 'Tillgänglig',
  propertiesInMadrid: 'Fastigheter i Madrid', findNext: 'Hitta din nästa investering eller drömbostad',
  home: 'Hem', properties: 'Fastigheter', allOperations: 'Alla', sale: 'Köp', rent: 'Hyra',
  rentType: 'Hyrtyp', allRentals: 'Alla hyresobjekt', temporary: 'Korttidshyra', longTerm: 'Långtidshyra',
  rooms: 'Rum', allTypes: 'Alla', allZones: 'Alla', filters: 'Filter', clear: 'Rensa',
  advancedSearch: 'Avancerad sökning', bedrooms: 'Sovrum', bathrooms: 'Badrum',
  propertiesFound: 'fastigheter hittade', clearFilters: 'Rensa filter',
  notFound: 'Fastighet hittades inte', viewProperties: 'Se fastigheter', backToProperties: 'Tillbaka till fastigheter',
  description: 'Beskrivning', location: 'Läge',
  requestInfo: 'Begär information', contact: 'Kontakta', call: 'Ring',
  ourCatalog: 'Vårt utbud', propertiesForSale: 'Fastigheter till salu',
  propertiesForRent: 'Fastigheter att hyra', rental: 'Hyra',
  viewAllSale: 'Se alla till salu', viewAllRent: 'Se alla att hyra', years: 'år',
};

const da: PropertyI18n = {
  ...en,
  reserved: 'Reserveret', sold: 'Solgt', available: 'Tilgængelig',
  propertiesInMadrid: 'Ejendomme i Madrid', findNext: 'Find din næste investering eller drømmebolig',
  home: 'Hjem', properties: 'Ejendomme', allOperations: 'Alle', sale: 'Salg', rent: 'Leje',
  rentType: 'Lejetype', allRentals: 'Alle lejeboliger', temporary: 'Korttidsleje', longTerm: 'Langtidsleje',
  rooms: 'Værelser', allTypes: 'Alle', allZones: 'Alle', filters: 'Filtre', clear: 'Ryd',
  advancedSearch: 'Avanceret søgning', bedrooms: 'Soveværelser', bathrooms: 'Badeværelser',
  propertiesFound: 'ejendomme fundet', clearFilters: 'Ryd filtre',
  notFound: 'Ejendom ikke fundet', viewProperties: 'Se ejendomme', backToProperties: 'Tilbage til ejendomme',
  description: 'Beskrivelse', location: 'Beliggenhed',
  requestInfo: 'Anmod om information', contact: 'Kontakt', call: 'Ring',
  ourCatalog: 'Vores udvalg', propertiesForSale: 'Ejendomme til salg',
  propertiesForRent: 'Ejendomme til leje', rental: 'Leje',
  viewAllSale: 'Se alle til salg', viewAllRent: 'Se alle til leje', years: 'år',
};

const it: PropertyI18n = {
  ...en,
  reserved: 'Riservato', sold: 'Venduto', available: 'Disponibile',
  propertiesInMadrid: 'Proprietà a Madrid', findNext: 'Trova il tuo prossimo investimento o la casa ideale',
  home: 'Home', properties: 'Proprietà', operation: 'Operazione', allOperations: 'Tutte',
  sale: 'Vendita', rent: 'Affitto', rentType: 'Tipo di affitto', allRentals: 'Tutti gli affitti',
  temporary: 'Affitto temporaneo', longTerm: 'Lungo termine', rooms: 'Stanze',
  allTypes: 'Tutti', allZones: 'Tutte', filters: 'Filtri', clear: 'Cancella',
  advancedSearch: 'Ricerca avanzata', bedrooms: 'Camere', bathrooms: 'Bagni',
  allBedrooms: 'Tutte', allBathrooms: 'Tutti', areaFrom: 'Superficie da', areaTo: 'Superficie a',
  propertiesFound: 'proprietà trovate', clearFilters: 'Cancella filtri',
  loadingMap: 'Caricamento mappa...', applyFilters: 'Applica filtri',
  pool: 'Piscina', parking: 'Parcheggio', elevator: 'Ascensore', terrace: 'Terrazza',
  furnished: 'Arredato', gatedCommunity: 'Residence', newBuild: 'Nuova costruzione', views: 'Vista',
  typeApartment: 'Appartamento', typePenthouse: 'Attico', typeVilla: 'Villa',
  notFound: 'Proprietà non trovata', viewProperties: 'Vedi proprietà', backToProperties: 'Torna alle proprietà',
  builtArea: 'Superficie costruita', usefulArea: 'Superficie utile', floor: 'Piano',
  condition: 'Condizione', yearBuilt: 'Anno di costruzione', features: 'Caratteristiche',
  basicFeatures: 'Caratteristiche di base', equipment: 'Dotazioni', extras: 'Extra',
  yes: 'Sì', no: 'No', description: 'Descrizione', location: 'Posizione',
  energyCert: 'Certificazione energetica', energyConsumption: 'Consumo energetico',
  requestInfo: 'Richiedi informazioni', contact: 'Contatta', call: 'Chiama',
  propertyLocatedIn: 'Proprietà situata nella zona di',
  soughtAfterArea: 'una delle zone più richieste di Madrid.',
  ourCatalog: 'Il nostro catalogo', propertiesForSale: 'Proprietà in Vendita',
  propertiesForRent: 'Proprietà in Affitto', rental: 'Affitto',
  viewAllSale: 'Vedi tutte in vendita', viewAllRent: 'Vedi tutte in affitto', years: 'anni',
};

const tr: PropertyI18n = {
  ...en,
  reserved: 'Rezerve', sold: 'Satıldı', available: 'Müsait',
  propertiesInMadrid: 'Madrid\'de Mülkler', findNext: 'Bir sonraki yatırımınızı veya ideal evinizi bulun',
  home: 'Ana Sayfa', properties: 'Mülkler', operation: 'İşlem', allOperations: 'Tümü',
  sale: 'Satılık', rent: 'Kiralık', rentType: 'Kira türü', allRentals: 'Tüm kiralamalar',
  temporary: 'Geçici kiralama', longTerm: 'Uzun süreli', rooms: 'Odalar',
  allTypes: 'Tümü', allZones: 'Tümü', filters: 'Filtreler', clear: 'Temizle',
  advancedSearch: 'Gelişmiş arama', bedrooms: 'Yatak odası', bathrooms: 'Banyo',
  allBedrooms: 'Tümü', allBathrooms: 'Tümü', areaFrom: 'Alan min', areaTo: 'Alan maks',
  propertiesFound: 'mülk bulundu', clearFilters: 'Filtreleri temizle',
  loadingMap: 'Harita yükleniyor...', applyFilters: 'Filtreleri uygula',
  pool: 'Havuz', parking: 'Otopark', elevator: 'Asansör', terrace: 'Teras',
  furnished: 'Mobilyalı', gatedCommunity: 'Site içi', newBuild: 'Sıfır bina', views: 'Manzara',
  typeApartment: 'Daire', typePenthouse: 'Çatı katı', typeVilla: 'Villa',
  typeStudio: 'Stüdyo', typeCommercial: 'Ticari alan', typeRoom: 'Oda',
  notFound: 'Mülk bulunamadı', viewProperties: 'Mülkleri gör', backToProperties: 'Mülklere dön',
  builtArea: 'İnşaat alanı', usefulArea: 'Kullanım alanı', floor: 'Kat',
  condition: 'Durum', yearBuilt: 'Yapım yılı', features: 'Özellikler',
  basicFeatures: 'Temel özellikler', equipment: 'Donanım', extras: 'Ekstralar',
  yes: 'Evet', no: 'Hayır', description: 'Açıklama', location: 'Konum',
  energyCert: 'Enerji sertifikası', energyConsumption: 'Enerji tüketimi',
  requestInfo: 'Bilgi isteyin', contact: 'İletişim', call: 'Ara',
  propertyLocatedIn: 'Mülk şu bölgede yer almaktadır:', soughtAfterArea: "Madrid'in en çok aranan bölgelerinden biri.",
  ourCatalog: 'Katalogumuz', propertiesForSale: 'Satılık Mülkler',
  propertiesForRent: 'Kiralık Mülkler', rental: 'Kiralık',
  viewAllSale: 'Tüm satılık mülkler', viewAllRent: 'Tüm kiralık mülkler', years: 'yıl',
};

export const propertyTranslations: Record<Language, PropertyI18n> = {
  es, en, nl, de, fr, ru, cat, pt, no, fi, se, da, it, tr,
};

// Helper to get localized property content
export function getPropertyTitle(property: { title: string; titleEn: string }, language: Language): string {
  if (language === 'es' || language === 'cat') return property.title;
  return property.titleEn;
}

export function getPropertyDescription(property: { descriptionEs: string; descriptionEn: string }, language: Language): string {
  if (language === 'es' || language === 'cat') return property.descriptionEs;
  return property.descriptionEn;
}

export function getPropertyFeatures(property: { features: string[]; featuresEn: string[] }, language: Language): string[] {
  if (language === 'es' || language === 'cat') return property.features;
  return property.featuresEn;
}

// Property type label map
export function getPropertyTypeLabel(type: string, language: Language): string {
  const pt = propertyTranslations[language];
  const map: Record<string, string> = {
    piso: pt.typeApartment,
    atico: pt.typePenthouse,
    chalet: pt.typeVilla,
    estudio: pt.typeStudio,
    local: pt.typeCommercial,
    habitacion: pt.typeRoom,
    duplex: pt.typeDuplex,
    loft: pt.typeLoft,
    apartamento: pt.typeApartment,
  };
  return map[type] || type;
}
