export interface ServiceDetail {
  slug: string;
  icon: string;
  titleEs: string;
  titleEn: string;
  subtitleEs: string;
  subtitleEn: string;
  descriptionEs: string;
  descriptionEn: string;
  stepsEs: { title: string; text: string }[];
  stepsEn: { title: string; text: string }[];
  benefitsEs: string[];
  benefitsEn: string[];
  image: string;
}

export const services: ServiceDetail[] = [
  {
    slug: 'venta',
    icon: 'Home',
    titleEs: 'Venta de Propiedades',
    titleEn: 'Property Sales',
    subtitleEs: 'Maximizamos el valor de su propiedad con estrategias de marketing premium',
    subtitleEn: 'We maximize your property value with premium marketing strategies',
    descriptionEs: 'En VIANCASA gestionamos la venta de su inmueble con un enfoque integral y personalizado. Nuestro equipo de profesionales se encarga de todo el proceso, desde la valoración inicial hasta la firma en notaría, garantizando la máxima rentabilidad y tranquilidad para el propietario.\n\nContamos con más de 10 años de experiencia en el mercado inmobiliario de Madrid, especialmente en zonas premium como el Barrio de Salamanca, Chamberí y Retiro. Conocemos el mercado en profundidad y sabemos cómo posicionar cada propiedad para obtener el mejor resultado.',
    descriptionEn: 'At VIANCASA we manage the sale of your property with a comprehensive and personalized approach. Our team of professionals handles the entire process, from initial valuation to signing at the notary, guaranteeing maximum profitability and peace of mind for the owner.\n\nWe have over 10 years of experience in Madrid\'s real estate market, especially in premium areas like Barrio de Salamanca, Chamberí and Retiro. We know the market in depth and know how to position each property for the best result.',
    stepsEs: [
      { title: 'Valoración profesional', text: 'Realizamos un análisis exhaustivo del mercado y de su propiedad para determinar el precio óptimo de venta.' },
      { title: 'Estrategia de marketing', text: 'Diseñamos un plan de marketing personalizado: fotografía profesional, home staging, tour virtual y publicación en portales nacionales e internacionales.' },
      { title: 'Comercialización activa', text: 'Promocionamos su propiedad en nuestra cartera de compradores cualificados y en los canales más efectivos del mercado.' },
      { title: 'Negociación y cierre', text: 'Gestionamos todas las ofertas, negociaciones y trámites legales hasta la firma en notaría.' },
    ],
    stepsEn: [
      { title: 'Professional valuation', text: 'We conduct a thorough market and property analysis to determine the optimal selling price.' },
      { title: 'Marketing strategy', text: 'We design a personalized marketing plan: professional photography, home staging, virtual tour and listing on national and international portals.' },
      { title: 'Active marketing', text: 'We promote your property to our portfolio of qualified buyers and through the most effective market channels.' },
      { title: 'Negotiation and closing', text: 'We manage all offers, negotiations and legal procedures until signing at the notary.' },
    ],
    benefitsEs: ['Valoración gratuita sin compromiso', 'Fotografía profesional y home staging', 'Publicación en portales premium nacionales e internacionales', 'Base de datos de compradores cualificados', 'Acompañamiento legal y fiscal completo', 'Sin costes ocultos'],
    benefitsEn: ['Free no-obligation valuation', 'Professional photography and home staging', 'Listing on premium national and international portals', 'Database of qualified buyers', 'Complete legal and tax support', 'No hidden costs'],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80',
  },
  {
    slug: 'compra',
    icon: 'ShoppingCart',
    titleEs: 'Compra Personalizada',
    titleEn: 'Personalized Purchase',
    subtitleEs: 'Encontramos la propiedad perfecta adaptada a sus necesidades',
    subtitleEn: 'We find the perfect property tailored to your needs',
    descriptionEs: 'Nuestro servicio de compra personalizada está diseñado para quienes buscan una experiencia exclusiva y sin estrés. Trabajamos como sus personal shoppers inmobiliarios, buscando activamente la propiedad que se ajuste a sus criterios específicos.\n\nAccedemos a propiedades fuera del mercado (off-market), gestionamos las visitas, negociamos en su nombre y le acompañamos durante todo el proceso de adquisición.',
    descriptionEn: 'Our personalized purchase service is designed for those seeking an exclusive, stress-free experience. We work as your real estate personal shoppers, actively searching for the property that matches your specific criteria.\n\nWe access off-market properties, manage viewings, negotiate on your behalf and accompany you throughout the entire acquisition process.',
    stepsEs: [
      { title: 'Análisis de necesidades', text: 'Definimos juntos sus criterios: zona, presupuesto, características, estilo de vida.' },
      { title: 'Búsqueda activa', text: 'Rastreamos el mercado, incluyendo propiedades off-market, para encontrar opciones que se ajusten a su perfil.' },
      { title: 'Visitas y asesoramiento', text: 'Organizamos y acompañamos las visitas, ofreciendo nuestro criterio profesional sobre cada opción.' },
      { title: 'Negociación y compra', text: 'Negociamos el mejor precio y condiciones, y gestionamos todo el proceso hasta la escritura.' },
    ],
    stepsEn: [
      { title: 'Needs analysis', text: 'Together we define your criteria: area, budget, features, lifestyle.' },
      { title: 'Active search', text: 'We scan the market, including off-market properties, to find options matching your profile.' },
      { title: 'Viewings and advice', text: 'We organize and accompany viewings, offering our professional judgment on each option.' },
      { title: 'Negotiation and purchase', text: 'We negotiate the best price and conditions, managing the entire process through to completion.' },
    ],
    benefitsEs: ['Acceso a propiedades off-market', 'Personal shopper inmobiliario dedicado', 'Negociación profesional en su nombre', 'Due diligence completa del inmueble', 'Asesoramiento financiero y fiscal', 'Acompañamiento hasta la firma'],
    benefitsEn: ['Access to off-market properties', 'Dedicated real estate personal shopper', 'Professional negotiation on your behalf', 'Complete property due diligence', 'Financial and tax advisory', 'Support through to completion'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
  },
  {
    slug: 'alquiler',
    icon: 'Key',
    titleEs: 'Alquiler',
    titleEn: 'Rental',
    subtitleEs: 'Servicio integral de alquiler para propietarios e inquilinos',
    subtitleEn: 'Comprehensive rental service for owners and tenants',
    descriptionEs: 'Ofrecemos un servicio integral de gestión de alquileres en Madrid. Ya sea propietario buscando inquilino o inquilino buscando vivienda, nuestro equipo le ofrece un servicio profesional, ágil y transparente.\n\nPara propietarios: gestionamos la búsqueda de inquilinos solventes, la redacción del contrato, el estudio de solvencia, el inventario y la gestión continuada del alquiler. Para inquilinos: le ayudamos a encontrar la vivienda que mejor se adapte a sus necesidades en las mejores zonas de Madrid.',
    descriptionEn: 'We offer a comprehensive rental management service in Madrid. Whether you\'re an owner looking for a tenant or a tenant looking for a home, our team provides professional, agile and transparent service.\n\nFor owners: we manage the search for solvent tenants, contract drafting, solvency studies, inventory and ongoing rental management. For tenants: we help you find the home that best suits your needs in Madrid\'s best areas.',
    stepsEs: [
      { title: 'Valoración del alquiler', text: 'Analizamos el mercado para establecer la renta óptima de su propiedad.' },
      { title: 'Preparación y marketing', text: 'Fotografía profesional, home staging si es necesario, y publicación en portales.' },
      { title: 'Selección de inquilino', text: 'Estudio de solvencia riguroso, verificación de referencias y selección del candidato ideal.' },
      { title: 'Gestión del contrato', text: 'Redacción del contrato, inventario detallado, gestión de fianzas y seguimiento.' },
    ],
    stepsEn: [
      { title: 'Rental valuation', text: 'We analyze the market to establish the optimal rent for your property.' },
      { title: 'Preparation and marketing', text: 'Professional photography, home staging if needed, and portal listings.' },
      { title: 'Tenant selection', text: 'Rigorous solvency study, reference verification and ideal candidate selection.' },
      { title: 'Contract management', text: 'Contract drafting, detailed inventory, deposit management and monitoring.' },
    ],
    benefitsEs: ['Estudio de solvencia del inquilino', 'Fotografía profesional del inmueble', 'Redacción de contrato de alquiler', 'Gestión de fianzas y seguros', 'Atención post-alquiler', 'Gestión integral del inmueble'],
    benefitsEn: ['Tenant solvency study', 'Professional property photography', 'Rental contract drafting', 'Deposit and insurance management', 'Post-rental support', 'Comprehensive property management'],
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1920&q=80',
  },
  {
    slug: 'inversion',
    icon: 'TrendingUp',
    titleEs: 'Inversión Inmobiliaria',
    titleEn: 'Real Estate Investment',
    subtitleEs: 'Asesoramiento experto para maximizar el valor de sus inversiones',
    subtitleEn: 'Expert advisory to maximize the value of your investments',
    descriptionEs: 'Nuestro departamento de inversión inmobiliaria ofrece asesoramiento especializado para inversores que buscan maximizar la rentabilidad de su patrimonio en el mercado de Madrid.\n\nAnalizamos oportunidades de inversión, estudiamos la viabilidad de proyectos, identificamos activos infravalorados y diseñamos estrategias de diversificación adaptadas a cada perfil inversor.',
    descriptionEn: 'Our real estate investment department offers specialized advisory for investors seeking to maximize their portfolio returns in the Madrid market.\n\nWe analyze investment opportunities, study project viability, identify undervalued assets and design diversification strategies tailored to each investor profile.',
    stepsEs: [
      { title: 'Análisis del perfil inversor', text: 'Definimos sus objetivos de inversión, perfil de riesgo y horizonte temporal.' },
      { title: 'Identificación de oportunidades', text: 'Rastreamos el mercado para encontrar activos con potencial de revalorización o alta rentabilidad.' },
      { title: 'Due diligence', text: 'Análisis exhaustivo técnico, legal y financiero de cada oportunidad de inversión.' },
      { title: 'Ejecución y seguimiento', text: 'Gestionamos la adquisición y realizamos un seguimiento continuado de la inversión.' },
    ],
    stepsEn: [
      { title: 'Investor profile analysis', text: 'We define your investment objectives, risk profile and time horizon.' },
      { title: 'Opportunity identification', text: 'We scan the market to find assets with appreciation potential or high yields.' },
      { title: 'Due diligence', text: 'Comprehensive technical, legal and financial analysis of each investment opportunity.' },
      { title: 'Execution and monitoring', text: 'We manage the acquisition and provide ongoing investment monitoring.' },
    ],
    benefitsEs: ['Análisis de mercado en tiempo real', 'Acceso a oportunidades off-market', 'Due diligence técnica, legal y financiera', 'Estrategias de diversificación', 'Gestión integral de la inversión', 'Informes periódicos de rentabilidad'],
    benefitsEn: ['Real-time market analysis', 'Access to off-market opportunities', 'Technical, legal and financial due diligence', 'Diversification strategies', 'Comprehensive investment management', 'Periodic profitability reports'],
    image: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=1920&q=80',
  },
  {
    slug: 'home-staging',
    icon: 'Briefcase',
    titleEs: 'Home Staging',
    titleEn: 'Home Staging',
    subtitleEs: 'Preparamos su propiedad para venderla o alquilarla más rápido y al mejor precio',
    subtitleEn: 'We prepare your property to sell or rent faster and at the best price',
    descriptionEs: 'El home staging es el arte de preparar y presentar una propiedad para maximizar su atractivo en el mercado. En VIANCASA contamos con un equipo de profesionales que transforman los espacios para que los compradores o inquilinos se enamoren a primera vista.\n\nEstudios demuestran que las propiedades con home staging se venden hasta un 30% más rápido y por un precio medio un 10% superior al de propiedades sin preparar.',
    descriptionEn: 'Home staging is the art of preparing and presenting a property to maximize its market appeal. At VIANCASA we have a team of professionals who transform spaces so that buyers or tenants fall in love at first sight.\n\nStudies show that staged properties sell up to 30% faster and for an average price 10% higher than unstaged properties.',
    stepsEs: [
      { title: 'Diagnóstico del inmueble', text: 'Evaluamos el estado actual de la propiedad e identificamos las áreas de mejora.' },
      { title: 'Propuesta de intervención', text: 'Diseñamos un plan de acción personalizado con las acciones necesarias para maximizar el atractivo.' },
      { title: 'Ejecución del staging', text: 'Nuestro equipo ejecuta la transformación: mobiliario, decoración, iluminación y detalles.' },
      { title: 'Sesión fotográfica', text: 'Fotografía profesional y tour virtual del inmueble preparado para su comercialización.' },
    ],
    stepsEn: [
      { title: 'Property diagnosis', text: 'We evaluate the current state of the property and identify areas for improvement.' },
      { title: 'Intervention proposal', text: 'We design a personalized action plan with the necessary steps to maximize appeal.' },
      { title: 'Staging execution', text: 'Our team executes the transformation: furniture, decoration, lighting and details.' },
      { title: 'Photo session', text: 'Professional photography and virtual tour of the prepared property for marketing.' },
    ],
    benefitsEs: ['Venta hasta un 30% más rápida', 'Incremento del precio de venta hasta un 10%', 'Primera impresión impactante', 'Fotografías profesionales de alto impacto', 'Mobiliario y decoración incluidos', 'Tour virtual 360°'],
    benefitsEn: ['Sale up to 30% faster', 'Selling price increase of up to 10%', 'Impressive first impression', 'High-impact professional photography', 'Furniture and decoration included', '360° virtual tour'],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80',
  },
];
