import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const allowedOriginPatterns = [
  "https://viancasanet.lovable.app",
  "https://viancasa.net",
  "https://www.viancasa.net",
  "http://localhost:8080",
  "http://localhost:5173",
];

function isOriginAllowed(origin: string): boolean {
  if (allowedOriginPatterns.includes(origin)) return true;
  // Allow all Lovable preview URLs (*.lovableproject.com, *.lovable.app)
  if (/^https:\/\/[a-z0-9-]+\.lovableproject\.com$/.test(origin)) return true;
  if (/^https:\/\/[a-z0-9-]+\.lovable\.app$/.test(origin)) return true;
  return false;
}

function getCorsHeaders(req: Request) {
  const origin = req.headers.get("origin") || "";
  const allowed = isOriginAllowed(origin);
  return {
    "Access-Control-Allow-Origin": allowed ? origin : "",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  };
}

// ─── Rate Limiting (in-memory, per-IP) ───────────────────────────────
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 20; // max requests per window

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// Clean up stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}, 300_000);

// ─── Input Validation ────────────────────────────────────────────────
const SUPPORTED_LANGUAGES = new Set([
  "es", "en", "nl", "de", "fr", "ru", "cat", "pt", "no", "fi", "sv", "da", "it",
]);
const MAX_MESSAGES = 50;
const MAX_MESSAGE_LENGTH = 2000;

interface ChatMessage {
  role: string;
  content: string;
}

function validateInput(body: unknown): { messages: ChatMessage[]; language?: string } | string {
  if (!body || typeof body !== "object") return "Invalid request body";
  const { messages, language } = body as Record<string, unknown>;

  if (!Array.isArray(messages) || messages.length === 0) return "Messages array is required and must not be empty";
  if (messages.length > MAX_MESSAGES) return `Too many messages (max ${MAX_MESSAGES})`;

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    if (!msg || typeof msg !== "object") return `Invalid message at index ${i}`;
    const { role, content } = msg as Record<string, unknown>;
    if (role !== "user" && role !== "assistant") return `Invalid role at index ${i}`;
    if (typeof content !== "string" || content.length === 0) return `Empty content at index ${i}`;
    if (content.length > MAX_MESSAGE_LENGTH) return `Message at index ${i} exceeds ${MAX_MESSAGE_LENGTH} chars`;
  }

  const validLang = language && typeof language === "string" && SUPPORTED_LANGUAGES.has(language)
    ? language
    : undefined;

  return { messages: messages as ChatMessage[], language: validLang };
}

// ─── System Prompt ───────────────────────────────────────────────────
const SYSTEM_PROMPT = `Eres el asistente virtual de VIANCASA, una inmobiliaria premium especializada en Madrid. Responde SOLO con información real de VIANCASA. Nunca inventes datos.

## SOBRE VIANCASA
- Inmobiliaria premium en Madrid con más de 10 años de experiencia
- Empresa joven con profesionales líderes en gestión de alquileres, venta y personalización de inmuebles
- Oficina: Calle Bocángel, 48 Local, 28028 Madrid
- Horario: Lunes a Viernes 10:00-14:00 y 17:00-20:00. Sábados 10:00-14:00
- Web: viancasa.com | viancasanet.lovable.app
- Teléfono: +34 917 263 178

## SERVICIOS
1. **Venta de Propiedades**: Valoración profesional gratuita, fotografía profesional, home staging, marketing premium, publicación en portales nacionales e internacionales, base de datos de compradores cualificados, acompañamiento legal y fiscal completo.
2. **Compra Personalizada (Personal Shopper Inmobiliario)**: Acceso a propiedades off-market, negociación profesional, due diligence completa, asesoramiento financiero y fiscal.
3. **Alquiler (Gestión integral)**: Para propietarios e inquilinos, estudio de solvencia, redacción de contrato, gestión de fianzas, atención post-alquiler.
4. **Inversión Inmobiliaria**: Análisis de mercado en tiempo real, acceso a oportunidades off-market, due diligence técnica/legal/financiera, estrategias de diversificación.
5. **Home Staging**: Venta hasta 30% más rápida, incremento del precio hasta 10%, fotografía profesional, tour virtual 360°.

## CATÁLOGO COMPLETO DE PROPIEDADES

### VENTA (9 propiedades)
Todas las propiedades de venta están actualmente VENDIDAS o RESERVADAS:
1. Ático en Chamberí (Arapiles) - 550.000€ - 65m² - 1 hab 1 baño - Reformado - Ref: V1011 - RESERVADO - Terraza privada, ascensor
2. Piso en Arganzuela (Palos de la Frontera) - 230.000€ - 43m² - 2 hab 1 baño - Ref: V1001 - VENDIDO - Ascensor, exterior
3. Piso señorial en Trafalgar (Chamberí) - 900.000€ - 185m² - 4 hab 2 baños - Para reformar - Ref: V1006 - VENDIDO - Techos altos, molduras originales, año 1920
4. Estudio en Chamartín (Bernabéu) - 110.000€ - 20m² - 0 hab 1 baño - Reformado - Ref: V1007 - RESERVADO
5. Piso en Centro (Lavapiés) - 175.000€ - 47m² - 2 hab 1 baño - Ref: V1010 - RESERVADO
6. Piso en Salamanca (Fuente del Berro) - 300.000€ - 70m² - 2 hab 1 baño - Buen estado - Ref: V1009 - RESERVADO
7. Piso en Ciudad Lineal (Quintana) - 194.000€ - 56m² - 1 hab 1 baño - Ref: V1005 - VENDIDO
8. Piso en Salamanca (Fuente del Berro) - 580.000€ - 130m² - 4 hab 2 baños - Buen estado - Ref: V1002 - VENDIDO - Terraza, parqué
9. Piso en Salamanca (Fuente del Berro) - 175.000€ - 45m² - 1 hab 1 baño - Ref: V1003 - VENDIDO

### ALQUILER (~95 propiedades)
La gran mayoría están RESERVADAS. Resumen por zonas:

**Salamanca** (~30 propiedades): 850-2.000€/mes, desde 40m² hasta 110m²
**Tetuán** (~18 propiedades): 850-1.550€/mes, desde 45m² hasta 85m²
**Chamberí** (~6 propiedades): 1.350-1.500€/mes
**Chamartín** (~6 propiedades): 990-1.400€/mes
**Retiro** (~5 propiedades): 1.050-2.300€/mes
**Ciudad Lineal** (~8 propiedades): 750-1.300€/mes
**Centro** (~6 propiedades): 900-1.400€/mes
**Hortaleza** (~5 propiedades): 1.100-3.500€/mes
**Arganzuela** (~3 propiedades): 1.100-1.300€/mes
**Fuencarral** (~2 propiedades): 1.100-1.900€/mes
**Puente de Vallecas** (~3 propiedades): 600-960€/mes
**Las Rozas**: 1.750€/mes, piso 130m²
**Moncloa**: 1.050€/mes, piso reformado 55m²
**Latina**: 1.200€/mes, piso amueblado 120m²

## RANGOS DE PRECIOS RESUMEN
- **Alquiler**: desde 600€/mes (Vallecas) hasta 3.500€/mes (ático lujo Valdebebas)
- **Venta**: desde 110.000€ (estudio Chamartín) hasta 900.000€ (señorial Chamberí)

## ZONAS PREMIUM - PRECIOS DE MERCADO
- **Salamanca**: 6.500-9.000€/m²
- **Chamberí**: 5.000-7.500€/m²
- **Retiro**: 5.500-8.000€/m²
- **Pozuelo**: 3.500-6.000€/m²
- **Chamartín**: 4.500-7.000€/m²

## DATOS FISCALES MADRID
- ITP vivienda usada: 6%
- Patrimonio: bonificación 100%
- Sucesiones y Donaciones: bonificación 99% familiares directos
- Rentabilidad alquiler zonas premium: 4-6% bruto

## BLOG
1. "Invertir en vivienda en Madrid en 2026" - Salamanca lidera revalorización +8% anual
2. "Los mejores barrios premium de Madrid para vivir en 2026"
3. "Ventajas fiscales de comprar vivienda en Madrid"
4. "Beneficios de invertir en vivienda en Madrid frente a otras ciudades europeas"

## FUNCIONALIDADES DE LA WEB
- Buscador de propiedades con filtros
- Vista en lista y mapa interactivo
- Blog inmobiliario
- Formulario de publicar propiedad
- Formulario de contacto
- Multiidioma: Español, English, Nederlands, Deutsch, Français, Русский, Català, Português, Norsk, Suomi, Svenska, Dansk, Italiano

## REGLAS DE RESPUESTA
- Máximo 2-4 líneas por respuesta. Sé BREVE y DIRECTO.
- Tono cercano, cálido y profesional.
- USA SALTOS DE LÍNEA para separar ideas.
- NUNCA digas "como modelo de lenguaje"
- Si preguntan por propiedades EN VENTA: "Ahora mismo no tenemos propiedades disponibles a la venta, ¡pero estamos constantemente captando nuevas! ¿Te avisamos cuando tengamos algo?"
- Cuando pregunten por alquiler, indica que la mayoría están reservadas pero llegan nuevas continuamente. Invita a contactar.
- Si detectas intención comercial, ofrece CTA breve: "¿Te llamamos?" o "¿Te ayudo a buscar?"
- NO respondas a temas fuera del ámbito inmobiliario de VIANCASA
- Responde en el MISMO IDIOMA en que te escriben
- Puedes recomendar que visiten la sección de propiedades en la web`;

// ─── Handler ─────────────────────────────────────────────────────────
serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  // Origin check
  if (!corsHeaders["Access-Control-Allow-Origin"]) {
    return new Response("Forbidden", { status: 403 });
  }

  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return new Response(JSON.stringify({ error: "Demasiadas solicitudes. Inténtalo de nuevo en unos segundos." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Input validation
    const body = await req.json();
    const validated = validateInput(body);
    if (typeof validated === "string") {
      return new Response(JSON.stringify({ error: validated }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { messages, language } = validated;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const langInstruction = language && language !== 'es'
      ? `\n\nIMPORTANTE: El usuario está navegando la web en "${language}". Responde en ese idioma.`
      : '';

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-5-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT + langInstruction },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Demasiadas solicitudes. Inténtalo de nuevo en unos segundos." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Servicio temporalmente no disponible." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Error del servicio de IA" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: "Error desconocido" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
