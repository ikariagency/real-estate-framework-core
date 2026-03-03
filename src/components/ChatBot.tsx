import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Home, Phone, FileText, HelpCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/i18n/LanguageContext';
import { useNavigate } from 'react-router-dom';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface QuickAction {
  label: string;
  message: string;
  icon: React.ReactNode;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

async function streamChat({
  messages,
  language,
  onDelta,
  onDone,
}: {
  messages: Message[];
  language: string;
  onDelta: (text: string) => void;
  onDone: () => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages, language }),
  });

  if (!resp.ok || !resp.body) {
    if (resp.status === 429) throw new Error('Demasiadas solicitudes. Inténtalo en unos segundos.');
    if (resp.status === 402) throw new Error('Servicio temporalmente no disponible.');
    throw new Error('Error al conectar con el asistente.');
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let textBuffer = '';
  let streamDone = false;

  while (!streamDone) {
    const { done, value } = await reader.read();
    if (done) break;
    textBuffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
      let line = textBuffer.slice(0, newlineIndex);
      textBuffer = textBuffer.slice(newlineIndex + 1);
      if (line.endsWith('\r')) line = line.slice(0, -1);
      if (line.startsWith(':') || line.trim() === '') continue;
      if (!line.startsWith('data: ')) continue;
      const jsonStr = line.slice(6).trim();
      if (jsonStr === '[DONE]') { streamDone = true; break; }
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch {
        textBuffer = line + '\n' + textBuffer;
        break;
      }
    }
  }

  if (textBuffer.trim()) {
    for (let raw of textBuffer.split('\n')) {
      if (!raw) continue;
      if (raw.endsWith('\r')) raw = raw.slice(0, -1);
      if (raw.startsWith(':') || raw.trim() === '') continue;
      if (!raw.startsWith('data: ')) continue;
      const jsonStr = raw.slice(6).trim();
      if (jsonStr === '[DONE]') continue;
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch { /* ignore */ }
    }
  }
  onDone();
}

const QUICK_ACTIONS: QuickAction[] = [
  { label: 'Ver propiedades', message: '¿Qué propiedades tenéis disponibles?', icon: <Home className="h-3 w-3" /> },
  { label: 'Agendar visita', message: '¿Cómo puedo agendar una visita?', icon: <FileText className="h-3 w-3" /> },
  { label: 'Valoración gratis', message: '¿Ofrecéis valoración gratuita de mi vivienda?', icon: <HelpCircle className="h-3 w-3" /> },
  { label: 'Contactar oficina', message: '¿Cuál es el horario y cómo contacto con vosotros?', icon: <Phone className="h-3 w-3" /> },
];

const FAQ_QUESTIONS = [
  '¿Cuáles son los gastos de compra?',
  '¿Gestionáis hipotecas?',
  '¿Tenéis pisos por menos de 200.000€?',
  '¿Qué zonas de Madrid cubrís?',
  '¿Cómo funciona el servicio de home staging?',
];

const GREETING = '¡Hola! 👋 Soy el asistente virtual de VIANCASA. Puedo ayudarte a:\n\n• Encontrar tu propiedad ideal\n• Agendar visitas\n• Resolver tus dudas sobre compra/venta\n• Informarte sobre nuestros servicios\n\n¿En qué puedo ayudarte hoy?';

const NAV_BUTTONS = [
  { label: 'Ver propiedades', icon: <Home className="h-3 w-3" />, targetId: '/propiedades', variant: 'secondary' as const, isRoute: true },
  { label: 'Contacto', icon: <Phone className="h-3 w-3" />, targetId: 'contact', variant: 'primary' as const, isRoute: false },
];

const ChatBot = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: GREETING },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFAQ, setShowFAQ] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  const handleSend = useCallback(async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = { role: 'user', content: textToSend };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);
    setShowFAQ(false);

    let assistantSoFar = '';
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant' && prev.length > updatedMessages.length) {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: 'assistant', content: assistantSoFar }];
      });
    };

    try {
      await streamChat({
        messages: updatedMessages,
        language,
        onDelta: (chunk) => upsertAssistant(chunk),
        onDone: () => setIsLoading(false),
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'No se pudo enviar el mensaje.',
        variant: 'destructive',
      });
    }
  }, [input, isLoading, messages, language, toast]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const scrollToSection = (targetId: string, isRoute?: boolean) => {
    setIsOpen(false);
    if (isRoute) {
      setTimeout(() => navigate(targetId), 300);
    } else {
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg transition-all duration-300"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: isOpen ? 0 : 1, opacity: isOpen ? 0 : 1 }}
        transition={{ delay: 0.5, duration: 0.3, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Abrir chat"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full animate-pulse" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 right-4 z-50 w-[340px] sm:w-[380px] max-h-[520px] flex flex-col rounded-2xl shadow-2xl border border-border overflow-hidden bg-card/95 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="bg-primary px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary-foreground font-display">Asistente VIANCASA</p>
                  <p className="text-[10px] text-primary-foreground/70 font-body">Experto inmobiliario en Madrid</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-primary-foreground/10 rounded-full transition-colors" aria-label="Cerrar chat">
                <X className="h-4 w-4 text-primary-foreground" />
              </button>
            </div>

            {/* Quick Actions */}
            {QUICK_ACTIONS.length > 0 && (
              <div className="px-3 py-2 border-b border-border bg-muted/30">
                <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
                  {QUICK_ACTIONS.map((action, i) => (
                    <button key={i} onClick={() => handleSend(action.message)} disabled={isLoading}
                      className="flex items-center gap-1 px-2 py-1 text-[10px] bg-primary/10 hover:bg-primary/20 text-foreground rounded-full transition-colors disabled:opacity-50 whitespace-nowrap font-body">
                      {action.icon}{action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 min-h-0 max-h-[280px]">
              {messages.map((message, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                  <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <p className={`px-3 py-2 rounded-2xl text-xs leading-relaxed max-w-[85%] whitespace-pre-line font-body ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-muted text-foreground rounded-bl-md'
                    }`}>{message.content}</p>
                  </div>
                </motion.div>
              ))}

              {/* FAQ */}
              {showFAQ && messages.length === 1 && (
                <div className="space-y-1.5">
                  <p className="text-[10px] text-muted-foreground font-body font-medium">Preguntas frecuentes:</p>
                  <div className="space-y-1">
                    {FAQ_QUESTIONS.map((q, i) => (
                      <button key={i} onClick={() => handleSend(q)} disabled={isLoading}
                        className="text-left w-full px-3 py-2 text-[11px] bg-muted/50 hover:bg-muted text-foreground rounded-lg transition-colors disabled:opacity-50 border border-border/50 font-body">
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="flex justify-start">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Navigation */}
            {NAV_BUTTONS.length > 0 && (
              <div className="flex gap-2 px-3 py-2 border-t border-border bg-muted/20">
                {NAV_BUTTONS.map((btn, i) => (
                  <button key={i} onClick={() => scrollToSection(btn.targetId, btn.isRoute)}
                    className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-[10px] rounded-lg transition-colors font-body ${
                      btn.variant === 'primary'
                        ? 'bg-primary/80 hover:bg-primary text-primary-foreground'
                        : 'bg-secondary/50 hover:bg-secondary/70 text-secondary-foreground'
                    }`}>
                    {btn.icon}{btn.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-3 py-2 border-t border-border bg-card">
              <div className="flex items-center gap-2">
                <input
                  value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress}
                  placeholder="Escribe tu mensaje..." disabled={isLoading} maxLength={500}
                  className="flex-1 px-3 py-2 border border-border bg-muted/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 text-xs placeholder:text-muted-foreground/70 font-body"
                />
                <button onClick={() => handleSend()} disabled={!input.trim() || isLoading}
                  className="p-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  aria-label="Enviar mensaje">
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="flex items-center justify-between mt-1.5 px-1">
                <span className="text-[9px] text-muted-foreground font-body">Presiona Enter para enviar</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
