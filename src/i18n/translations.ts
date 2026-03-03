export type Language = 'es' | 'en' | 'nl' | 'de' | 'fr' | 'ru' | 'cat' | 'pt' | 'no' | 'fi' | 'se' | 'da' | 'it' | 'tr';

export interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

export const languages: LanguageOption[] = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'cat', name: 'Català', flag: '🏴' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
  { code: 'se', name: 'Svenska', flag: '🇸🇪' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
];

type TranslationKeys = {
  nav: {
    home: string; properties: string; buy: string; sell: string; rent: string;
    investment: string; about: string; blog: string; contact: string; letsChat: string;
    publish: string;
  };
  hero: {
    title: string; subtitle: string; search: string; type: string; buy: string;
    rent: string; zone: string; priceMin: string; priceMax: string; bedrooms: string;
    featuredBtn: string;
  };
  properties: { title: string; viewDetails: string; beds: string; baths: string };
  about: { title: string; subtitle: string; text1: string; text2: string; cta: string };
  services: {
    title: string; subtitle: string; moreInfo: string;
    sale: { title: string; text: string }; purchase: { title: string; text: string };
    rental: { title: string; text: string }; investment: { title: string; text: string };
    advisory: { title: string; text: string };
  };
  whyUs: { title: string; subtitle: string; items: string[] };
  testimonials: { title: string; subtitle: string };
  team: { title: string; subtitle: string };
  blog: { title: string; subtitle: string; readMore: string };
  contact: { title: string; subtitle: string; name: string; phone: string; email: string; message: string; send: string; success: string };
  cta: { title: string; subtitle: string; button: string };
  footer: { slogan: string; links: string; contactTitle: string; address: string; rights: string };
  map: { title: string; subtitle: string; directions: string };
  publish: {
    heroTitle: string; heroSubtitle: string; heroCta: string;
    benefitsTitle: string;
    benefit1Title: string; benefit1Text: string; benefit2Title: string; benefit2Text: string;
    benefit3Title: string; benefit3Text: string; benefit4Title: string; benefit4Text: string;
    processTitle: string;
    step1Title: string; step1Text: string; step2Title: string; step2Text: string;
    step3Title: string; step3Text: string; step4Title: string; step4Text: string;
    formTitle: string; formSubtitle: string;
    addressLabel: string; propertyTypeLabel: string; selectType: string;
    typePiso: string; typeAtico: string; typeDuplex: string;
    typeChalet: string; typeEstudio: string; typeLocal: string;
    submitBtn: string; success: string;
  };
  publishPage: {
    whyYears: string; whyProperties: string; whySatisfaction: string; whyDays: string;
    testimonial1: string; testimonial2: string; testimonial3: string;
    testimonialsTitle: string; testimonialsSubtitle: string;
    formPoint1: string; formPoint2: string; formPoint3: string; formPoint4: string;
    preferCall: string; thankYou: string; messagePlaceholder: string; privacy: string;
    ctaTitle: string; ctaSubtitle: string;
  };
};

const publishEs = {
  heroTitle: 'Vende tu propiedad con expertos en Madrid',
  heroSubtitle: 'Maximizamos el valor de tu vivienda en el Barrio Salamanca y zonas premium de Madrid.',
  heroCta: 'Quiero vender mi propiedad',
  benefitsTitle: '¿Por qué vender con VIANCASA?',
  benefit1Title: 'Valoración profesional gratuita', benefit1Text: 'Análisis de mercado detallado para determinar el precio óptimo de su propiedad.',
  benefit2Title: 'Estrategia de marketing premium', benefit2Text: 'Fotografía profesional, home staging, publicación en portales nacionales e internacionales.',
  benefit3Title: 'Base de datos de compradores activos', benefit3Text: 'Acceso a nuestra cartera de compradores e inversores cualificados en Madrid.',
  benefit4Title: 'Gestión integral', benefit4Text: 'Acompañamiento legal, fiscal y financiero durante todo el proceso de venta.',
  processTitle: 'Nuestro proceso en 4 pasos',
  step1Title: 'Valoración', step1Text: 'Analizamos su propiedad y el mercado para establecer el precio ideal.',
  step2Title: 'Estrategia', step2Text: 'Diseñamos un plan de marketing personalizado para su inmueble.',
  step3Title: 'Comercialización', step3Text: 'Publicamos y promocionamos su propiedad en los canales más efectivos.',
  step4Title: 'Cierre', step4Text: 'Gestionamos todas las negociaciones y trámites hasta la firma.',
  formTitle: 'Solicite su valoración gratuita',
  formSubtitle: 'Complete el formulario y un asesor se pondrá en contacto con usted.',
  addressLabel: 'Dirección del inmueble', propertyTypeLabel: 'Tipo de propiedad', selectType: 'Seleccione tipo',
  typePiso: 'Piso', typeAtico: 'Ático', typeDuplex: 'Dúplex',
  typeChalet: 'Chalet', typeEstudio: 'Estudio', typeLocal: 'Local comercial',
  submitBtn: 'Quiero vender mi propiedad', success: 'Solicitud enviada. Un asesor le contactará en breve.',
};

const publishEn = {
  heroTitle: 'Sell your property with Madrid experts',
  heroSubtitle: 'We maximize the value of your home in Barrio Salamanca and premium areas of Madrid.',
  heroCta: 'I want to sell my property',
  benefitsTitle: 'Why sell with VIANCASA?',
  benefit1Title: 'Free professional valuation', benefit1Text: 'Detailed market analysis to determine the optimal price for your property.',
  benefit2Title: 'Premium marketing strategy', benefit2Text: 'Professional photography, home staging, listing on national and international portals.',
  benefit3Title: 'Active buyer database', benefit3Text: 'Access to our portfolio of qualified buyers and investors in Madrid.',
  benefit4Title: 'Comprehensive management', benefit4Text: 'Legal, tax and financial support throughout the entire sales process.',
  processTitle: 'Our 4-step process',
  step1Title: 'Valuation', step1Text: 'We analyze your property and the market to set the ideal price.',
  step2Title: 'Strategy', step2Text: 'We design a personalized marketing plan for your property.',
  step3Title: 'Marketing', step3Text: 'We publish and promote your property on the most effective channels.',
  step4Title: 'Closing', step4Text: 'We manage all negotiations and paperwork until signing.',
  formTitle: 'Request your free valuation',
  formSubtitle: 'Complete the form and an advisor will contact you.',
  addressLabel: 'Property address', propertyTypeLabel: 'Property type', selectType: 'Select type',
  typePiso: 'Apartment', typeAtico: 'Penthouse', typeDuplex: 'Duplex',
  typeChalet: 'Villa', typeEstudio: 'Studio', typeLocal: 'Commercial space',
  submitBtn: 'I want to sell my property', success: 'Request sent. An advisor will contact you shortly.',
};

const publishPageEs = {
  whyYears: 'Años de experiencia',
  whyProperties: 'Propiedades gestionadas',
  whySatisfaction: 'Satisfacción del cliente',
  whyDays: 'Días tiempo medio de venta',
  testimonial1: 'Vendimos nuestro piso en Salamanca en menos de un mes. VIANCASA gestionó todo de forma impecable, desde la valoración hasta el cierre.',
  testimonial2: 'El equipo de VIANCASA nos consiguió un precio por encima de lo esperado. Su estrategia de marketing premium marcó la diferencia.',
  testimonial3: 'Profesionalidad absoluta. Me acompañaron durante todo el proceso y resolvieron cada duda al instante. 100% recomendados.',
  testimonialsTitle: 'Propietarios que ya confiaron en nosotros',
  testimonialsSubtitle: 'Resultados reales de propietarios en Madrid',
  formPoint1: 'Valoración profesional sin compromiso',
  formPoint2: 'Respuesta en menos de 24 horas',
  formPoint3: 'Asesoramiento personalizado de expertos',
  formPoint4: 'Sin costes ocultos ni permanencias',
  preferCall: '¿Prefiere llamarnos directamente?',
  thankYou: '¡Gracias!',
  messagePlaceholder: 'Cuéntenos sobre su propiedad...',
  privacy: 'Sus datos están protegidos. No compartimos su información con terceros.',
  ctaTitle: '¿Listo para vender su propiedad al mejor precio?',
  ctaSubtitle: 'Contacte con nuestro equipo y reciba una valoración gratuita sin compromiso.',
};

const publishPageEn = {
  whyYears: 'Years of experience',
  whyProperties: 'Properties managed',
  whySatisfaction: 'Client satisfaction',
  whyDays: 'Days average selling time',
  testimonial1: 'We sold our flat in Salamanca in less than a month. VIANCASA managed everything flawlessly, from valuation to closing.',
  testimonial2: 'The VIANCASA team got us a price above expectations. Their premium marketing strategy made the difference.',
  testimonial3: 'Absolute professionalism. They accompanied me throughout the process and resolved every question instantly. 100% recommended.',
  testimonialsTitle: 'Owners who already trusted us',
  testimonialsSubtitle: 'Real results from property owners in Madrid',
  formPoint1: 'No-obligation professional valuation',
  formPoint2: 'Response within 24 hours',
  formPoint3: 'Personalized expert advice',
  formPoint4: 'No hidden costs or lock-ins',
  preferCall: 'Prefer to call us directly?',
  thankYou: 'Thank you!',
  messagePlaceholder: 'Tell us about your property...',
  privacy: 'Your data is protected. We do not share your information with third parties.',
  ctaTitle: 'Ready to sell your property at the best price?',
  ctaSubtitle: 'Contact our team and receive a free no-obligation valuation.',
};

export const translations: Record<Language, TranslationKeys> = {
  es: {
    nav: { home: 'Inicio', properties: 'Propiedades', buy: 'Comprar', sell: 'Vender', rent: 'Alquilar', investment: 'Inversión', about: 'Nosotros', blog: 'Blog', contact: 'Contacto', letsChat: 'Hablemos', publish: 'Publica tu propiedad' },
    hero: { title: 'Más que una vivienda, un hogar', subtitle: 'Somos empresa joven con más de 10 años de experiencia en el sector inmobiliario en Madrid. Especialistas en alquiler, venta y personalización de inmuebles.', search: 'Buscar', type: 'Tipo', buy: 'Compra', rent: 'Alquiler', zone: 'Zona', priceMin: 'Precio mín.', priceMax: 'Precio máx.', bedrooms: 'Habitaciones', featuredBtn: 'Ver propiedades destacadas' },
    properties: { title: 'Propiedades destacadas en Madrid', viewDetails: 'Ver detalles', beds: 'hab.', baths: 'baños' },
    about: { title: 'Quiénes Somos', subtitle: 'VIANCASA Grupo Inmobiliario', text1: 'Somos una empresa joven con más de 10 años de experiencia en el sector. Contamos con un grupo de jóvenes profesionales líder en gestión de alquileres y venta de inmuebles. Nos especializamos en la personalización de inmuebles, adaptándolos a las necesidades específicas de cada inquilino.', text2: 'Ofrecemos servicios integrales que incluyen alquiler, venta y valoración de propiedades, así como home staging para presentar los inmuebles de la mejor manera posible. En Viancasa, nos comprometemos a proporcionar soluciones inmobiliarias a medida para nuestros clientes.', cta: 'Conócenos' },
    services: { title: 'Servicios a Medida', subtitle: 'Soluciones integrales para cada necesidad inmobiliaria', moreInfo: 'Más información', sale: { title: 'Venta de Propiedades', text: 'Gestionamos la venta de su inmueble con estrategias de marketing premium y valoración profesional del mercado.' }, purchase: { title: 'Compra Personalizada', text: 'Encontramos la propiedad ideal adaptándonos a sus necesidades, presupuesto y estilo de vida.' }, rental: { title: 'Alquiler', text: 'Servicio integral de alquiler, desde la selección del inquilino hasta la gestión completa del inmueble.' }, investment: { title: 'Inversión Inmobiliaria', text: 'Asesoramiento en diversificación y estudio de proyectos inmobiliarios para maximizar el valor de sus inversiones.' }, advisory: { title: 'Home Staging', text: 'Preparamos y presentamos los inmuebles de la mejor manera posible para acelerar la venta o alquiler.' } },
    whyUs: { title: '¿Por Qué Elegirnos?', subtitle: 'La diferencia está en los detalles', items: ['Más de 10 años de experiencia en el sector', 'Personalización de inmuebles a medida', 'Gestión integral de alquileres y ventas', 'Home staging profesional', 'Soluciones inmobiliarias a medida'] },
    testimonials: { title: 'Lo Que Dicen Nuestros Clientes', subtitle: 'Experiencias reales de quienes confiaron en nosotros' },
    team: { title: 'Nuestro Equipo', subtitle: 'Profesionales comprometidos con la excelencia' },
    blog: { title: 'Blog & Actualidad', subtitle: 'Descubre los barrios más exclusivos de Madrid', readMore: 'Leer más' },
    contact: { title: 'Hablemos', subtitle: 'Nuestro horario: Lunes a Viernes de 10:00 a 14:00 y de 17:00 a 20:00. Sábados de 10:00 a 14:00.', name: 'Nombre', phone: 'Teléfono', email: 'Email', message: 'Mensaje', send: 'Enviar mensaje', success: 'Mensaje enviado correctamente. Le contactaremos pronto.' },
    cta: { title: '¿Busca su hogar ideal en Madrid?', subtitle: 'Permítanos ayudarle a encontrar la propiedad perfecta', button: 'Contactar ahora' },
    footer: { slogan: 'Más que una vivienda, un hogar', links: 'Enlaces', contactTitle: 'Contacto', address: 'Calle Bocángel, 48 Local, 28028 Madrid', rights: 'Todos los derechos reservados.' },
    map: { title: 'Nuestra oficina en Madrid', subtitle: 'Te esperamos en el corazón de Madrid', directions: 'Cómo llegar' },
    publish: publishEs,
    publishPage: publishPageEs,
  },
  en: {
    nav: { home: 'Home', properties: 'Properties', buy: 'Buy', sell: 'Sell', rent: 'Rent', investment: 'Investment', about: 'About', blog: 'Blog', contact: 'Contact', letsChat: "Let's Talk", publish: 'List your property' },
    hero: { title: 'More than a house, a home', subtitle: 'We are a young company with over 10 years of experience in the real estate sector in Madrid. Specialists in rental, sales and property customization.', search: 'Search', type: 'Type', buy: 'Buy', rent: 'Rent', zone: 'Area', priceMin: 'Min. price', priceMax: 'Max. price', bedrooms: 'Bedrooms', featuredBtn: 'View featured properties' },
    properties: { title: 'Featured Properties in Madrid', viewDetails: 'View details', beds: 'beds', baths: 'baths' },
    about: { title: 'About Us', subtitle: 'VIANCASA Real Estate Group', text1: 'We are a young company with over 10 years of experience in the sector. We have a team of young professionals who are leaders in rental management and property sales. We specialize in property customization, adapting them to the specific needs of each tenant.', text2: 'We offer comprehensive services including rental, sale and property valuation, as well as home staging to present properties in the best possible way. At Viancasa, we are committed to providing tailor-made real estate solutions for our clients.', cta: 'Learn more' },
    services: { title: 'Tailored Services', subtitle: 'Comprehensive solutions for every real estate need', moreInfo: 'More info', sale: { title: 'Property Sales', text: 'We manage the sale of your property with premium marketing strategies and professional market valuation.' }, purchase: { title: 'Personalized Purchase', text: 'We find the ideal property adapting to your needs, budget and lifestyle.' }, rental: { title: 'Rental', text: 'Comprehensive rental service, from tenant selection to complete property management.' }, investment: { title: 'Real Estate Investment', text: 'Advisory on diversification and study of real estate projects to maximize the value of your investments.' }, advisory: { title: 'Home Staging', text: 'We prepare and present properties in the best possible way to accelerate sale or rental.' } },
    whyUs: { title: 'Why Choose Us?', subtitle: 'The difference is in the details', items: ['Over 10 years of experience in the sector', 'Tailor-made property customization', 'Comprehensive rental and sales management', 'Professional home staging', 'Bespoke real estate solutions'] },
    testimonials: { title: 'What Our Clients Say', subtitle: 'Real experiences from those who trusted us' },
    team: { title: 'Our Team', subtitle: 'Professionals committed to excellence' },
    blog: { title: 'Blog & News', subtitle: 'Discover the most exclusive neighborhoods in Madrid', readMore: 'Read more' },
    contact: { title: "Let's Talk", subtitle: 'Opening hours: Monday to Friday 10:00-14:00 and 17:00-20:00. Saturdays 10:00-14:00.', name: 'Name', phone: 'Phone', email: 'Email', message: 'Message', send: 'Send message', success: 'Message sent successfully. We will contact you soon.' },
    cta: { title: 'Looking for your ideal home in Madrid?', subtitle: 'Let us help you find the perfect property', button: 'Contact now' },
    footer: { slogan: 'More than a house, a home', links: 'Links', contactTitle: 'Contact', address: 'Calle Bocángel, 48 Local, 28028 Madrid', rights: 'All rights reserved.' },
    map: { title: 'Our office in Madrid', subtitle: 'We welcome you in the heart of Madrid', directions: 'Get directions' },
    publish: publishEn,
    publishPage: publishPageEn,
  },
  nl: {
    nav: { home: 'Home', properties: 'Woningen', buy: 'Kopen', sell: 'Verkopen', rent: 'Huren', investment: 'Investeren', about: 'Over ons', blog: 'Blog', contact: 'Contact', letsChat: 'Neem contact op', publish: 'Publiceer uw woning' },
    hero: { title: 'Meer dan een woning, een thuis', subtitle: 'Wij zijn een jong bedrijf met meer dan 10 jaar ervaring in de vastgoedsector in Madrid.', search: 'Zoeken', type: 'Type', buy: 'Koop', rent: 'Huur', zone: 'Gebied', priceMin: 'Min. prijs', priceMax: 'Max. prijs', bedrooms: 'Slaapkamers', featuredBtn: 'Bekijk uitgelichte woningen' },
    properties: { title: 'Uitgelichte woningen in Madrid', viewDetails: 'Details bekijken', beds: 'slpk.', baths: 'badk.' },
    about: { title: 'Over Ons', subtitle: 'VIANCASA Vastgoedgroep', text1: 'Wij zijn een jong bedrijf met meer dan 10 jaar ervaring in de sector.', text2: 'Wij bieden integrale diensten aan, waaronder verhuur, verkoop en taxatie van vastgoed.', cta: 'Meer over ons' },
    services: { title: 'Diensten op Maat', subtitle: 'Integrale oplossingen', moreInfo: 'Meer info', sale: { title: 'Verkoop', text: 'Premium marketingstrategieën.' }, purchase: { title: 'Persoonlijke Aankoop', text: 'Wij vinden de ideale woning.' }, rental: { title: 'Verhuur', text: 'Complete verhuurservice.' }, investment: { title: 'Vastgoedinvestering', text: 'Advies over diversificatie.' }, advisory: { title: 'Home Staging', text: 'Professionele presentatie.' } },
    whyUs: { title: 'Waarom Ons Kiezen?', subtitle: 'Het verschil zit in de details', items: ['Meer dan 10 jaar ervaring', 'Maatwerk personalisatie', 'Integraal beheer', 'Professionele home staging', 'Oplossingen op maat'] },
    testimonials: { title: 'Wat Onze Klanten Zeggen', subtitle: 'Echte ervaringen' },
    team: { title: 'Ons Team', subtitle: 'Professionals met passie' },
    blog: { title: 'Blog & Nieuws', subtitle: 'Ontdek de meest exclusieve wijken van Madrid', readMore: 'Lees meer' },
    contact: { title: 'Neem Contact Op', subtitle: 'Ma-Vr 10:00-14:00 en 17:00-20:00. Za 10:00-14:00.', name: 'Naam', phone: 'Telefoon', email: 'E-mail', message: 'Bericht', send: 'Verstuur', success: 'Bericht verzonden.' },
    cta: { title: 'Op zoek naar uw droomwoning?', subtitle: 'Laat ons u helpen', button: 'Nu contact opnemen' },
    footer: { slogan: 'Meer dan een woning, een thuis', links: 'Links', contactTitle: 'Contact', address: 'Calle Bocángel, 48 Local, 28028 Madrid', rights: 'Alle rechten voorbehouden.' },
    map: { title: 'Ons kantoor in Madrid', subtitle: 'Wij verwelkomen u in het hart van Madrid', directions: 'Routebeschrijving' },
    publish: { ...publishEn, heroTitle: 'Verkoop uw woning met experts in Madrid', heroSubtitle: 'Wij maximaliseren de waarde van uw woning.', heroCta: 'Ik wil mijn woning verkopen', submitBtn: 'Ik wil mijn woning verkopen', success: 'Aanvraag verzonden.' },
    publishPage: publishPageEn,
  },
  de: {
    nav: { home: 'Startseite', properties: 'Immobilien', buy: 'Kaufen', sell: 'Verkaufen', rent: 'Mieten', investment: 'Investition', about: 'Über uns', blog: 'Blog', contact: 'Kontakt', letsChat: 'Kontakt', publish: 'Immobilie inserieren' },
    hero: { title: 'Mehr als eine Wohnung, ein Zuhause', subtitle: 'Wir sind ein junges Unternehmen mit über 10 Jahren Erfahrung im Immobiliensektor in Madrid.', search: 'Suchen', type: 'Typ', buy: 'Kauf', rent: 'Miete', zone: 'Gebiet', priceMin: 'Min. Preis', priceMax: 'Max. Preis', bedrooms: 'Schlafzimmer', featuredBtn: 'Ausgewählte Immobilien' },
    properties: { title: 'Ausgewählte Immobilien in Madrid', viewDetails: 'Details ansehen', beds: 'Schlafz.', baths: 'Bäder' },
    about: { title: 'Über Uns', subtitle: 'VIANCASA Immobiliengruppe', text1: 'Wir sind ein junges Unternehmen mit über 10 Jahren Erfahrung.', text2: 'Wir bieten umfassende Dienstleistungen an.', cta: 'Mehr erfahren' },
    services: { title: 'Maßgeschneiderte Services', subtitle: 'Umfassende Lösungen', moreInfo: 'Mehr Info', sale: { title: 'Verkauf', text: 'Premium-Marketing.' }, purchase: { title: 'Kauf', text: 'Ideale Immobilie.' }, rental: { title: 'Vermietung', text: 'Kompletter Service.' }, investment: { title: 'Investition', text: 'Beratung.' }, advisory: { title: 'Home Staging', text: 'Professionelle Präsentation.' } },
    whyUs: { title: 'Warum Uns Wählen?', subtitle: 'Der Unterschied liegt im Detail', items: ['Über 10 Jahre Erfahrung', 'Maßgeschneiderte Personalisierung', 'Ganzheitliches Management', 'Professionelles Home Staging', 'Individuelle Lösungen'] },
    testimonials: { title: 'Was Unsere Kunden Sagen', subtitle: 'Echte Erfahrungen' },
    team: { title: 'Unser Team', subtitle: 'Engagierte Fachleute' },
    blog: { title: 'Blog & Aktuelles', subtitle: 'Entdecken Sie die exklusivsten Viertel Madrids', readMore: 'Weiterlesen' },
    contact: { title: 'Kontakt', subtitle: 'Mo-Fr 10:00-14:00 und 17:00-20:00. Sa 10:00-14:00.', name: 'Name', phone: 'Telefon', email: 'E-Mail', message: 'Nachricht', send: 'Senden', success: 'Nachricht gesendet.' },
    cta: { title: 'Suchen Sie Ihr Traumhaus in Madrid?', subtitle: 'Lassen Sie uns helfen', button: 'Jetzt kontaktieren' },
    footer: { slogan: 'Mehr als eine Wohnung, ein Zuhause', links: 'Links', contactTitle: 'Kontakt', address: 'Calle Bocángel, 48 Local, 28028 Madrid', rights: 'Alle Rechte vorbehalten.' },
    map: { title: 'Unser Büro in Madrid', subtitle: 'Wir erwarten Sie im Herzen von Madrid', directions: 'Anfahrt' },
    publish: { ...publishEn, heroTitle: 'Verkaufen Sie Ihre Immobilie mit Experten in Madrid', heroSubtitle: 'Wir maximieren den Wert Ihrer Immobilie.', heroCta: 'Ich möchte meine Immobilie verkaufen', submitBtn: 'Ich möchte meine Immobilie verkaufen', success: 'Anfrage gesendet.' },
    publishPage: publishPageEn,
  },
  fr: {
    nav: { home: 'Accueil', properties: 'Propriétés', buy: 'Acheter', sell: 'Vendre', rent: 'Louer', investment: 'Investissement', about: 'À propos', blog: 'Blog', contact: 'Contact', letsChat: 'Parlons-en', publish: 'Publiez votre bien' },
    hero: { title: 'Plus qu\'un logement, un foyer', subtitle: 'Nous sommes une jeune entreprise avec plus de 10 ans d\'expérience dans le secteur immobilier à Madrid.', search: 'Rechercher', type: 'Type', buy: 'Achat', rent: 'Location', zone: 'Zone', priceMin: 'Prix min.', priceMax: 'Prix max.', bedrooms: 'Chambres', featuredBtn: 'Voir les propriétés en vedette' },
    properties: { title: 'Propriétés en vedette à Madrid', viewDetails: 'Voir détails', beds: 'ch.', baths: 'sdb.' },
    about: { title: 'Qui Sommes-Nous', subtitle: 'VIANCASA Groupe Immobilier', text1: 'Nous sommes une jeune entreprise avec plus de 10 ans d\'expérience.', text2: 'Nous offrons des services complets.', cta: 'En savoir plus' },
    services: { title: 'Services Sur Mesure', subtitle: 'Solutions intégrales', moreInfo: 'Plus d\'infos', sale: { title: 'Vente', text: 'Marketing premium.' }, purchase: { title: 'Achat Personnalisé', text: 'Propriété idéale.' }, rental: { title: 'Location', text: 'Service complet.' }, investment: { title: 'Investissement', text: 'Conseil.' }, advisory: { title: 'Home Staging', text: 'Présentation professionnelle.' } },
    whyUs: { title: 'Pourquoi Nous Choisir?', subtitle: 'La différence est dans les détails', items: ['Plus de 10 ans d\'expérience', 'Personnalisation sur mesure', 'Gestion intégrale', 'Home staging professionnel', 'Solutions sur mesure'] },
    testimonials: { title: 'Témoignages', subtitle: 'Expériences réelles' },
    team: { title: 'Notre Équipe', subtitle: 'Professionnels engagés' },
    blog: { title: 'Blog & Actualités', subtitle: 'Découvrez les quartiers les plus exclusifs de Madrid', readMore: 'Lire la suite' },
    contact: { title: 'Parlons-en', subtitle: 'Lun-Ven 10h-14h et 17h-20h. Sam 10h-14h.', name: 'Nom', phone: 'Téléphone', email: 'Email', message: 'Message', send: 'Envoyer', success: 'Message envoyé.' },
    cta: { title: 'Vous cherchez votre maison idéale?', subtitle: 'Laissez-nous vous aider', button: 'Contacter maintenant' },
    footer: { slogan: 'Plus qu\'un logement, un foyer', links: 'Liens', contactTitle: 'Contact', address: 'Calle Bocángel, 48 Local, 28028 Madrid', rights: 'Tous droits réservés.' },
    map: { title: 'Notre bureau à Madrid', subtitle: 'Nous vous attendons au cœur de Madrid', directions: 'Itinéraire' },
    publish: { ...publishEn, heroTitle: 'Vendez votre bien avec des experts à Madrid', heroSubtitle: 'Nous maximisons la valeur de votre bien.', heroCta: 'Je veux vendre mon bien', submitBtn: 'Je veux vendre mon bien', success: 'Demande envoyée.' },
    publishPage: publishPageEn,
  },
  ru: {
    nav: { home: 'Главная', properties: 'Недвижимость', buy: 'Купить', sell: 'Продать', rent: 'Аренда', investment: 'Инвестиции', about: 'О нас', blog: 'Блог', contact: 'Контакт', letsChat: 'Связаться', publish: 'Разместить объект' },
    hero: { title: 'Больше чем жилье — дом', subtitle: 'Мы молодая компания с более чем 10-летним опытом в сфере недвижимости Мадрида.', search: 'Искать', type: 'Тип', buy: 'Покупка', rent: 'Аренда', zone: 'Район', priceMin: 'Мин. цена', priceMax: 'Макс. цена', bedrooms: 'Спальни', featuredBtn: 'Избранные объекты' },
    properties: { title: 'Избранная недвижимость в Мадриде', viewDetails: 'Подробнее', beds: 'спал.', baths: 'ванн.' },
    about: { title: 'О Нас', subtitle: 'VIANCASA Группа Недвижимости', text1: 'Мы молодая компания с более чем 10-летним опытом.', text2: 'Мы предлагаем комплексные услуги.', cta: 'Узнать больше' },
    services: { title: 'Индивидуальные Услуги', subtitle: 'Комплексные решения', moreInfo: 'Подробнее', sale: { title: 'Продажа', text: 'Премиум-маркетинг.' }, purchase: { title: 'Покупка', text: 'Идеальный объект.' }, rental: { title: 'Аренда', text: 'Полный сервис.' }, investment: { title: 'Инвестиции', text: 'Консультации.' }, advisory: { title: 'Хоум-стейджинг', text: 'Профессиональная подготовка.' } },
    whyUs: { title: 'Почему Мы?', subtitle: 'Разница в деталях', items: ['Более 10 лет опыта', 'Персонализация', 'Полное управление', 'Профессиональный хоум-стейджинг', 'Индивидуальные решения'] },
    testimonials: { title: 'Отзывы Клиентов', subtitle: 'Реальный опыт' },
    team: { title: 'Наша Команда', subtitle: 'Профессионалы' },
    blog: { title: 'Блог и Новости', subtitle: 'Откройте для себя самые эксклюзивные районы Мадрида', readMore: 'Читать далее' },
    contact: { title: 'Свяжитесь с нами', subtitle: 'Пн-Пт 10:00-14:00 и 17:00-20:00. Сб 10:00-14:00.', name: 'Имя', phone: 'Телефон', email: 'Email', message: 'Сообщение', send: 'Отправить', success: 'Сообщение отправлено.' },
    cta: { title: 'Ищете дом мечты в Мадриде?', subtitle: 'Позвольте нам помочь', button: 'Связаться' },
    footer: { slogan: 'Больше чем жилье — дом', links: 'Ссылки', contactTitle: 'Контакт', address: 'Calle Bocángel, 48 Local, 28028 Madrid', rights: 'Все права защищены.' },
    map: { title: 'Наш офис в Мадриде', subtitle: 'Мы ждём вас в сердце Мадрида', directions: 'Как добраться' },
    publish: { ...publishEn, heroTitle: 'Продайте недвижимость с экспертами Мадрида', heroSubtitle: 'Мы максимизируем стоимость вашей недвижимости.', heroCta: 'Хочу продать', submitBtn: 'Хочу продать', success: 'Заявка отправлена.' },
    publishPage: publishPageEn,
  },
  cat: {
    nav: { home: 'Inici', properties: 'Propietats', buy: 'Comprar', sell: 'Vendre', rent: 'Llogar', investment: 'Inversió', about: 'Nosaltres', blog: 'Blog', contact: 'Contacte', letsChat: 'Parlem', publish: 'Publica la teva propietat' },
    hero: { title: 'Més que un habitatge, una llar', subtitle: 'Som una empresa jove amb més de 10 anys d\'experiència en el sector immobiliari a Madrid.', search: 'Cercar', type: 'Tipus', buy: 'Compra', rent: 'Lloguer', zone: 'Zona', priceMin: 'Preu mín.', priceMax: 'Preu màx.', bedrooms: 'Habitacions', featuredBtn: 'Veure propietats destacades' },
    properties: { title: 'Propietats destacades a Madrid', viewDetails: 'Veure detalls', beds: 'hab.', baths: 'banys' },
    about: { title: 'Qui Som', subtitle: 'VIANCASA Grup Immobiliari', text1: 'Som una empresa jove amb més de 10 anys d\'experiència.', text2: 'Oferim serveis integrals.', cta: 'Coneix-nos' },
    services: { title: 'Serveis a Mida', subtitle: 'Solucions integrals', moreInfo: 'Més info', sale: { title: 'Venda', text: 'Màrqueting premium.' }, purchase: { title: 'Compra', text: 'Propietat ideal.' }, rental: { title: 'Lloguer', text: 'Servei complet.' }, investment: { title: 'Inversió', text: 'Assessorament.' }, advisory: { title: 'Home Staging', text: 'Presentació professional.' } },
    whyUs: { title: 'Per Què Escollir-nos?', subtitle: 'La diferència és als detalls', items: ['Més de 10 anys', 'Personalització', 'Gestió integral', 'Home staging', 'Solucions a mida'] },
    testimonials: { title: 'Què Diuen Els Nostres Clients', subtitle: 'Experiències reals' },
    team: { title: 'El Nostre Equip', subtitle: 'Professionals compromesos' },
    blog: { title: 'Blog & Actualitat', subtitle: 'Descobreix els barris més exclusius de Madrid', readMore: 'Llegir més' },
    contact: { title: 'Parlem', subtitle: 'Dl-Dv 10:00-14:00 i 17:00-20:00. Ds 10:00-14:00.', name: 'Nom', phone: 'Telèfon', email: 'Email', message: 'Missatge', send: 'Enviar', success: 'Missatge enviat.' },
    cta: { title: 'Busqueu la vostra llar ideal a Madrid?', subtitle: 'Deixeu-nos ajudar-vos', button: 'Contactar ara' },
    footer: { slogan: 'Més que un habitatge, una llar', links: 'Enllaços', contactTitle: 'Contacte', address: 'Calle Bocángel, 48 Local, 28028 Madrid', rights: 'Tots els drets reservats.' },
    map: { title: 'La nostra oficina a Madrid', subtitle: 'T\'esperem al cor de Madrid', directions: 'Com arribar' },
    publish: { ...publishEs, heroTitle: 'Ven la teva propietat amb experts a Madrid', heroSubtitle: 'Maximitzem el valor del teu habitatge.', heroCta: 'Vull vendre la meva propietat', submitBtn: 'Vull vendre la meva propietat', success: 'Sol·licitud enviada.' },
    publishPage: publishPageEs,
  },
  pt: {
    nav: { home: 'Início', properties: 'Propriedades', buy: 'Comprar', sell: 'Vender', rent: 'Alugar', investment: 'Investimento', about: 'Sobre nós', blog: 'Blog', contact: 'Contacto', letsChat: 'Fale connosco', publish: 'Publique o seu imóvel' },
    hero: { title: 'Mais que uma casa, um lar', subtitle: 'Somos uma empresa jovem com mais de 10 anos de experiência no setor imobiliário em Madrid.', search: 'Pesquisar', type: 'Tipo', buy: 'Compra', rent: 'Aluguer', zone: 'Zona', priceMin: 'Preço mín.', priceMax: 'Preço máx.', bedrooms: 'Quartos', featuredBtn: 'Ver propriedades em destaque' },
    properties: { title: 'Propriedades em destaque em Madrid', viewDetails: 'Ver detalhes', beds: 'quartos', baths: 'casas de banho' },
    about: { title: 'Sobre Nós', subtitle: 'VIANCASA Grupo Imobiliário', text1: 'Somos uma empresa jovem com mais de 10 anos de experiência.', text2: 'Oferecemos serviços integrais.', cta: 'Saiba mais' },
    services: { title: 'Serviços à Medida', subtitle: 'Soluções integrais', moreInfo: 'Mais info', sale: { title: 'Venda', text: 'Marketing premium.' }, purchase: { title: 'Compra', text: 'Propriedade ideal.' }, rental: { title: 'Aluguer', text: 'Serviço completo.' }, investment: { title: 'Investimento', text: 'Consultoria.' }, advisory: { title: 'Home Staging', text: 'Apresentação profissional.' } },
    whyUs: { title: 'Porquê Escolher-nos?', subtitle: 'A diferença está nos detalhes', items: ['Mais de 10 anos', 'Personalização', 'Gestão integral', 'Home staging', 'Soluções à medida'] },
    testimonials: { title: 'O Que Dizem Os Nossos Clientes', subtitle: 'Experiências reais' },
    team: { title: 'A Nossa Equipa', subtitle: 'Profissionais empenhados' },
    blog: { title: 'Blog & Atualidade', subtitle: 'Descubra os bairros mais exclusivos de Madrid', readMore: 'Ler mais' },
    contact: { title: 'Fale Connosco', subtitle: 'Seg-Sex 10:00-14:00 e 17:00-20:00. Sáb 10:00-14:00.', name: 'Nome', phone: 'Telefone', email: 'Email', message: 'Mensagem', send: 'Enviar', success: 'Mensagem enviada.' },
    cta: { title: 'Procura a sua casa ideal?', subtitle: 'Deixe-nos ajudar', button: 'Contactar agora' },
    footer: { slogan: 'Mais que uma casa, um lar', links: 'Links', contactTitle: 'Contacto', address: 'Calle Bocángel, 48 Local, 28028 Madrid', rights: 'Todos os direitos reservados.' },
    map: { title: 'O nosso escritório em Madrid', subtitle: 'Esperamos por si no coração de Madrid', directions: 'Como chegar' },
    publish: { ...publishEn, heroTitle: 'Venda o seu imóvel com especialistas em Madrid', heroSubtitle: 'Maximizamos o valor do seu imóvel.', heroCta: 'Quero vender o meu imóvel', submitBtn: 'Quero vender o meu imóvel', success: 'Pedido enviado.' },
    publishPage: publishPageEn,
  },
  no: {
    nav: { home: 'Hjem', properties: 'Eiendommer', buy: 'Kjøpe', sell: 'Selge', rent: 'Leie', investment: 'Investering', about: 'Om oss', blog: 'Blogg', contact: 'Kontakt', letsChat: 'Kontakt oss', publish: 'Publiser eiendom' },
    hero: { title: 'Mer enn en bolig, et hjem', subtitle: 'Vi er et ungt selskap med over 10 års erfaring i eiendomssektoren i Madrid.', search: 'Søk', type: 'Type', buy: 'Kjøp', rent: 'Leie', zone: 'Område', priceMin: 'Min. pris', priceMax: 'Maks. pris', bedrooms: 'Soverom', featuredBtn: 'Se utvalgte eiendommer' },
    properties: { title: 'Utvalgte eiendommer i Madrid', viewDetails: 'Se detaljer', beds: 'sov.', baths: 'bad' },
    about: { title: 'Om Oss', subtitle: 'VIANCASA Eiendomsgruppe', text1: 'Over 10 års erfaring.', text2: 'Vi tilbyr helhetlige tjenester.', cta: 'Les mer' },
    services: { title: 'Skreddersydde Tjenester', subtitle: 'Helhetlige løsninger', moreInfo: 'Mer info', sale: { title: 'Salg', text: 'Premium markedsføring.' }, purchase: { title: 'Kjøp', text: 'Ideell eiendom.' }, rental: { title: 'Utleie', text: 'Komplett service.' }, investment: { title: 'Investering', text: 'Rådgivning.' }, advisory: { title: 'Home Staging', text: 'Profesjonell presentasjon.' } },
    whyUs: { title: 'Hvorfor Velge Oss?', subtitle: 'Forskjellen i detaljene', items: ['Over 10 år', 'Skreddersydd', 'Helhetlig forvaltning', 'Home staging', 'Individuelle løsninger'] },
    testimonials: { title: 'Hva Kundene Sier', subtitle: 'Ekte erfaringer' },
    team: { title: 'Vårt Team', subtitle: 'Engasjerte fagfolk' },
    blog: { title: 'Blogg & Nyheter', subtitle: 'Oppdag Madrids mest eksklusive nabolag', readMore: 'Les mer' },
    contact: { title: 'Kontakt Oss', subtitle: 'Man-Fre 10:00-14:00 og 17:00-20:00. Lør 10:00-14:00.', name: 'Navn', phone: 'Telefon', email: 'E-post', message: 'Melding', send: 'Send', success: 'Melding sendt.' },
    cta: { title: 'Leter du etter drømmehjemmet?', subtitle: 'La oss hjelpe deg', button: 'Kontakt nå' },
    footer: { slogan: 'Mer enn en bolig, et hjem', links: 'Lenker', contactTitle: 'Kontakt', address: 'Calle Bocángel, 48 Local, 28028 Madrid', rights: 'Alle rettigheter reservert.' },
    map: { title: 'Vårt kontor i Madrid', subtitle: 'Vi venter på deg i hjertet av Madrid', directions: 'Veibeskrivelse' },
    publish: { ...publishEn, heroTitle: 'Selg eiendommen din med eksperter i Madrid', heroCta: 'Jeg vil selge', submitBtn: 'Jeg vil selge', success: 'Forespørsel sendt.' },
    publishPage: publishPageEn,
  },
  fi: {
    nav: { home: 'Etusivu', properties: 'Kiinteistöt', buy: 'Osta', sell: 'Myy', rent: 'Vuokraa', investment: 'Sijoitus', about: 'Meistä', blog: 'Blogi', contact: 'Yhteystiedot', letsChat: 'Ota yhteyttä', publish: 'Julkaise kiinteistö' },
    hero: { title: 'Enemmän kuin asunto, koti', subtitle: 'Yli 10 vuoden kokemus kiinteistöalalta Madridissa.', search: 'Hae', type: 'Tyyppi', buy: 'Osto', rent: 'Vuokra', zone: 'Alue', priceMin: 'Min. hinta', priceMax: 'Max. hinta', bedrooms: 'Makuuhuoneet', featuredBtn: 'Katso valikoidut kohteet' },
    properties: { title: 'Valikoidut kohteet Madridissa', viewDetails: 'Katso tiedot', beds: 'mh', baths: 'kph' },
    about: { title: 'Meistä', subtitle: 'VIANCASA Kiinteistöryhmä', text1: 'Yli 10 vuoden kokemus.', text2: 'Kokonaisvaltaiset palvelut.', cta: 'Lue lisää' },
    services: { title: 'Räätälöidyt Palvelut', subtitle: 'Kokonaisvaltaiset ratkaisut', moreInfo: 'Lisätietoja', sale: { title: 'Myynti', text: 'Premium-markkinointi.' }, purchase: { title: 'Osto', text: 'Ihanteellinen kohde.' }, rental: { title: 'Vuokraus', text: 'Täysi palvelu.' }, investment: { title: 'Sijoitus', text: 'Neuvonta.' }, advisory: { title: 'Home Staging', text: 'Ammattimainen esittely.' } },
    whyUs: { title: 'Miksi Valita Meidät?', subtitle: 'Ero yksityiskohdissa', items: ['Yli 10 vuotta', 'Räätälöinti', 'Kokonaisvaltainen hallinta', 'Home staging', 'Yksilölliset ratkaisut'] },
    testimonials: { title: 'Asiakkaiden Kokemuksia', subtitle: 'Todellisia kokemuksia' },
    team: { title: 'Tiimimme', subtitle: 'Sitoutuneet ammattilaiset' },
    blog: { title: 'Blogi & Ajankohtaista', subtitle: 'Tutustu Madridin eksklusiivisimpiin asuinalueisiin', readMore: 'Lue lisää' },
    contact: { title: 'Ota Yhteyttä', subtitle: 'Ma-Pe 10:00-14:00 ja 17:00-20:00. La 10:00-14:00.', name: 'Nimi', phone: 'Puhelin', email: 'Sähköposti', message: 'Viesti', send: 'Lähetä', success: 'Viesti lähetetty.' },
    cta: { title: 'Etsitkö unelmiesi kotia?', subtitle: 'Anna meidän auttaa', button: 'Ota yhteyttä nyt' },
    footer: { slogan: 'Enemmän kuin asunto, koti', links: 'Linkit', contactTitle: 'Yhteystiedot', address: 'Calle Bocángel, 48 Local, 28028 Madrid', rights: 'Kaikki oikeudet pidätetään.' },
    map: { title: 'Toimistomme Madridissa', subtitle: 'Odotamme sinua Madridin sydämessä', directions: 'Reittiohjeet' },
    publish: { ...publishEn, heroTitle: 'Myy kiinteistösi asiantuntijoiden kanssa Madridissa', heroCta: 'Haluan myydä', submitBtn: 'Haluan myydä', success: 'Pyyntö lähetetty.' },
    publishPage: publishPageEn,
  },
  se: {
    nav: { home: 'Hem', properties: 'Fastigheter', buy: 'Köpa', sell: 'Sälja', rent: 'Hyra', investment: 'Investering', about: 'Om oss', blog: 'Blogg', contact: 'Kontakt', letsChat: 'Kontakta oss', publish: 'Publicera fastighet' },
    hero: { title: 'Mer än en bostad, ett hem', subtitle: 'Över 10 års erfarenhet inom fastighetssektorn i Madrid.', search: 'Sök', type: 'Typ', buy: 'Köp', rent: 'Hyra', zone: 'Område', priceMin: 'Min. pris', priceMax: 'Max. pris', bedrooms: 'Sovrum', featuredBtn: 'Se utvalda fastigheter' },
    properties: { title: 'Utvalda fastigheter i Madrid', viewDetails: 'Se detaljer', beds: 'sovr.', baths: 'bad' },
    about: { title: 'Om Oss', subtitle: 'VIANCASA Fastighetsgrupp', text1: 'Över 10 års erfarenhet.', text2: 'Heltäckande tjänster.', cta: 'Läs mer' },
    services: { title: 'Skräddarsydda Tjänster', subtitle: 'Heltäckande lösningar', moreInfo: 'Mer info', sale: { title: 'Försäljning', text: 'Premium-marknadsföring.' }, purchase: { title: 'Köp', text: 'Idealisk fastighet.' }, rental: { title: 'Uthyrning', text: 'Komplett service.' }, investment: { title: 'Investering', text: 'Rådgivning.' }, advisory: { title: 'Home Staging', text: 'Professionell presentation.' } },
    whyUs: { title: 'Varför Välja Oss?', subtitle: 'Skillnaden i detaljerna', items: ['Över 10 år', 'Skräddarsytt', 'Heltäckande förvaltning', 'Home staging', 'Individuella lösningar'] },
    testimonials: { title: 'Vad Våra Kunder Säger', subtitle: 'Verkliga upplevelser' },
    team: { title: 'Vårt Team', subtitle: 'Engagerade proffs' },
    blog: { title: 'Blogg & Nyheter', subtitle: 'Upptäck Madrids mest exklusiva stadsdelar', readMore: 'Läs mer' },
    contact: { title: 'Kontakta Oss', subtitle: 'Mån-Fre 10:00-14:00 och 17:00-20:00. Lör 10:00-14:00.', name: 'Namn', phone: 'Telefon', email: 'E-post', message: 'Meddelande', send: 'Skicka', success: 'Meddelande skickat.' },
    cta: { title: 'Letar du efter ditt drömhem?', subtitle: 'Låt oss hjälpa dig', button: 'Kontakta nu' },
    footer: { slogan: 'Mer än en bostad, ett hem', links: 'Länkar', contactTitle: 'Kontakt', address: 'Calle Bocángel, 48 Local, 28028 Madrid', rights: 'Alla rättigheter förbehållna.' },
    map: { title: 'Vårt kontor i Madrid', subtitle: 'Vi välkomnar dig i hjärtat av Madrid', directions: 'Vägbeskrivning' },
    publish: { ...publishEn, heroTitle: 'Sälj din fastighet med experter i Madrid', heroCta: 'Jag vill sälja', submitBtn: 'Jag vill sälja', success: 'Förfrågan skickad.' },
    publishPage: publishPageEn,
  },
  da: {
    nav: { home: 'Hjem', properties: 'Ejendomme', buy: 'Køb', sell: 'Sælg', rent: 'Leje', investment: 'Investering', about: 'Om os', blog: 'Blog', contact: 'Kontakt', letsChat: 'Kontakt os', publish: 'Publicer ejendom' },
    hero: { title: 'Mere end en bolig, et hjem', subtitle: 'Over 10 års erfaring i ejendomssektoren i Madrid.', search: 'Søg', type: 'Type', buy: 'Køb', rent: 'Leje', zone: 'Område', priceMin: 'Min. pris', priceMax: 'Maks. pris', bedrooms: 'Soveværelser', featuredBtn: 'Se udvalgte ejendomme' },
    properties: { title: 'Udvalgte ejendomme i Madrid', viewDetails: 'Se detaljer', beds: 'sovev.', baths: 'badev.' },
    about: { title: 'Om Os', subtitle: 'VIANCASA Ejendomsgruppe', text1: 'Over 10 års erfaring.', text2: 'Vi tilbyder helhedsorienterede tjenester.', cta: 'Læs mere' },
    services: { title: 'Skræddersyede Tjenester', subtitle: 'Helhedsorienterede løsninger', moreInfo: 'Mere info', sale: { title: 'Salg', text: 'Premium markedsføring.' }, purchase: { title: 'Køb', text: 'Ideel ejendom.' }, rental: { title: 'Udlejning', text: 'Komplet service.' }, investment: { title: 'Investering', text: 'Rådgivning.' }, advisory: { title: 'Home Staging', text: 'Professionel præsentation.' } },
    whyUs: { title: 'Hvorfor Vælge Os?', subtitle: 'Forskellen i detaljerne', items: ['Over 10 år', 'Skræddersyet', 'Helhedsorienteret forvaltning', 'Home staging', 'Individuelle løsninger'] },
    testimonials: { title: 'Hvad Vores Kunder Siger', subtitle: 'Ægte oplevelser' },
    team: { title: 'Vores Team', subtitle: 'Engagerede fagfolk' },
    blog: { title: 'Blog & Nyheder', subtitle: 'Opdag Madrids mest eksklusive kvarterer', readMore: 'Læs mere' },
    contact: { title: 'Kontakt Os', subtitle: 'Man-Fre 10:00-14:00 og 17:00-20:00. Lør 10:00-14:00.', name: 'Navn', phone: 'Telefon', email: 'E-mail', message: 'Besked', send: 'Send', success: 'Besked sendt.' },
    cta: { title: 'Leder du efter dit drømmehjem?', subtitle: 'Lad os hjælpe dig', button: 'Kontakt nu' },
    footer: { slogan: 'Mere end en bolig, et hjem', links: 'Links', contactTitle: 'Kontakt', address: 'Calle Bocángel, 48 Local, 28028 Madrid', rights: 'Alle rettigheder forbeholdes.' },
    map: { title: 'Vores kontor i Madrid', subtitle: 'Vi byder dig velkommen i hjertet af Madrid', directions: 'Rutevejledning' },
    publish: { ...publishEn, heroTitle: 'Sælg din ejendom med eksperter i Madrid', heroCta: 'Jeg vil sælge', submitBtn: 'Jeg vil sælge', success: 'Forespørgsel sendt.' },
    publishPage: publishPageEn,
  },
  it: {
    nav: { home: 'Home', properties: 'Proprietà', buy: 'Comprare', sell: 'Vendere', rent: 'Affittare', investment: 'Investimento', about: 'Chi siamo', blog: 'Blog', contact: 'Contatto', letsChat: 'Parliamone', publish: 'Pubblica il tuo immobile' },
    hero: { title: 'Più di una casa, un focolare', subtitle: 'Oltre 10 anni di esperienza nel settore immobiliare a Madrid.', search: 'Cerca', type: 'Tipo', buy: 'Acquisto', rent: 'Affitto', zone: 'Zona', priceMin: 'Prezzo min.', priceMax: 'Prezzo max.', bedrooms: 'Camere', featuredBtn: 'Vedi proprietà in evidenza' },
    properties: { title: 'Proprietà in evidenza a Madrid', viewDetails: 'Vedi dettagli', beds: 'cam.', baths: 'bagni' },
    about: { title: 'Chi Siamo', subtitle: 'VIANCASA Gruppo Immobiliare', text1: 'Oltre 10 anni di esperienza.', text2: 'Offriamo servizi completi.', cta: 'Scopri di più' },
    services: { title: 'Servizi Su Misura', subtitle: 'Soluzioni integrali', moreInfo: 'Più info', sale: { title: 'Vendita', text: 'Marketing premium.' }, purchase: { title: 'Acquisto', text: 'Proprietà ideale.' }, rental: { title: 'Affitto', text: 'Servizio completo.' }, investment: { title: 'Investimento', text: 'Consulenza.' }, advisory: { title: 'Home Staging', text: 'Presentazione professionale.' } },
    whyUs: { title: 'Perché Sceglierci?', subtitle: 'La differenza nei dettagli', items: ['Oltre 10 anni', 'Personalizzazione', 'Gestione integrale', 'Home staging', 'Soluzioni personalizzate'] },
    testimonials: { title: 'Cosa Dicono I Nostri Clienti', subtitle: 'Esperienze reali' },
    team: { title: 'Il Nostro Team', subtitle: 'Professionisti impegnati' },
    blog: { title: 'Blog & Attualità', subtitle: 'Scopri i quartieri più esclusivi di Madrid', readMore: 'Leggi di più' },
    contact: { title: 'Parliamone', subtitle: 'Lun-Ven 10:00-14:00 e 17:00-20:00. Sab 10:00-14:00.', name: 'Nome', phone: 'Telefono', email: 'Email', message: 'Messaggio', send: 'Invia', success: 'Messaggio inviato.' },
    cta: { title: 'Cerchi la tua casa ideale?', subtitle: 'Lascia che ti aiutiamo', button: 'Contattaci ora' },
    footer: { slogan: 'Più di una casa, un focolare', links: 'Link', contactTitle: 'Contatto', address: 'Calle Bocángel, 48 Local, 28028 Madrid', rights: 'Tutti i diritti riservati.' },
    map: { title: 'Il nostro ufficio a Madrid', subtitle: 'Vi aspettiamo nel cuore di Madrid', directions: 'Indicazioni stradali' },
    publish: { ...publishEn, heroTitle: 'Vendi il tuo immobile con esperti a Madrid', heroCta: 'Voglio vendere', submitBtn: 'Voglio vendere', success: 'Richiesta inviata.' },
    publishPage: publishPageEn,
  },
  tr: {
    nav: { home: 'Ana Sayfa', properties: 'Mülkler', buy: 'Satın Al', sell: 'Sat', rent: 'Kirala', investment: 'Yatırım', about: 'Hakkımızda', blog: 'Blog', contact: 'İletişim', letsChat: 'Konuşalım', publish: 'Mülkünüzü yayınlayın' },
    hero: { title: 'Bir konuttan fazlası, bir yuva', subtitle: 'Madrid\'de 10 yılı aşkın gayrimenkul deneyimine sahip genç bir şirketiz. Kiralama, satış ve mülk kişiselleştirme konusunda uzmanız.', search: 'Ara', type: 'Tür', buy: 'Satın Al', rent: 'Kiralık', zone: 'Bölge', priceMin: 'Min. fiyat', priceMax: 'Maks. fiyat', bedrooms: 'Yatak odası', featuredBtn: 'Öne çıkan mülkleri gör' },
    properties: { title: 'Madrid\'de Öne Çıkan Mülkler', viewDetails: 'Detayları gör', beds: 'yatak', baths: 'banyo' },
    about: { title: 'Hakkımızda', subtitle: 'VIANCASA Gayrimenkul Grubu', text1: 'Sektörde 10 yılı aşkın deneyime sahip genç bir şirketiz. Kiralama yönetimi ve mülk satışında lider genç profesyonellerden oluşan bir ekibe sahibiz.', text2: 'Kiralama, satış ve mülk değerleme ile home staging dahil kapsamlı hizmetler sunuyoruz. Viancasa olarak müşterilerimize özel gayrimenkul çözümleri sunmaya kararlıyız.', cta: 'Daha fazla bilgi' },
    services: { title: 'Özel Hizmetler', subtitle: 'Her gayrimenkul ihtiyacı için kapsamlı çözümler', moreInfo: 'Daha fazla bilgi', sale: { title: 'Mülk Satışı', text: 'Premium pazarlama stratejileri ve profesyonel piyasa değerlendirmesi.' }, purchase: { title: 'Kişiselleştirilmiş Satın Alma', text: 'İhtiyaçlarınıza, bütçenize ve yaşam tarzınıza uygun ideal mülkü buluyoruz.' }, rental: { title: 'Kiralama', text: 'Kiracı seçiminden tam mülk yönetimine kadar kapsamlı kiralama hizmeti.' }, investment: { title: 'Gayrimenkul Yatırımı', text: 'Yatırımlarınızın değerini artırmak için çeşitlendirme ve proje danışmanlığı.' }, advisory: { title: 'Home Staging', text: 'Satış veya kiralamayı hızlandırmak için mülkleri en iyi şekilde hazırlıyoruz.' } },
    whyUs: { title: 'Neden Bizi Seçmelisiniz?', subtitle: 'Fark detaylarda gizli', items: ['10 yılı aşkın deneyim', 'Özel mülk kişiselleştirme', 'Kapsamlı kiralama ve satış yönetimi', 'Profesyonel home staging', 'Özel gayrimenkul çözümleri'] },
    testimonials: { title: 'Müşterilerimiz Ne Diyor', subtitle: 'Bize güvenenlerin gerçek deneyimleri' },
    team: { title: 'Ekibimiz', subtitle: 'Mükemmelliğe adanmış profesyoneller' },
    blog: { title: 'Blog & Güncel', subtitle: 'Madrid\'in en özel mahallelerini keşfedin', readMore: 'Devamını oku' },
    contact: { title: 'Konuşalım', subtitle: 'Çalışma saatleri: Pazartesi-Cuma 10:00-14:00 ve 17:00-20:00. Cumartesi 10:00-14:00.', name: 'Ad', phone: 'Telefon', email: 'E-posta', message: 'Mesaj', send: 'Mesaj gönder', success: 'Mesaj başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.' },
    cta: { title: 'Madrid\'de hayalinizdeki evi mi arıyorsunuz?', subtitle: 'Mükemmel mülkü bulmanıza yardımcı olalım', button: 'Şimdi iletişime geçin' },
    footer: { slogan: 'Bir konuttan fazlası, bir yuva', links: 'Bağlantılar', contactTitle: 'İletişim', address: 'Calle Bocángel, 48 Local, 28028 Madrid', rights: 'Tüm hakları saklıdır.' },
    map: { title: 'Madrid\'deki ofisimiz', subtitle: 'Madrid\'in kalbinde sizi bekliyoruz', directions: 'Yol tarifi' },
    publish: { ...publishEn, heroTitle: 'Mülkünüzü Madrid uzmanlarıyla satın', heroSubtitle: 'Madrid\'in premium bölgelerinde mülkünüzün değerini en üst düzeye çıkarıyoruz.', heroCta: 'Mülkümü satmak istiyorum', submitBtn: 'Mülkümü satmak istiyorum', success: 'Talep gönderildi. Bir danışman en kısa sürede sizinle iletişime geçecektir.' },
    publishPage: publishPageEn,
  },
};
