import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Calculator, FileText, Shield, TrendingUp, ArrowRight, Phone, Mail, CheckCircle2, Euro, Percent, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Financing = () => {
  const { language } = useLanguage();
  const isEs = language === 'es' || language === 'cat';

  // Mortgage calculator state
  const [amount, setAmount] = useState(250000);
  const [years, setYears] = useState(25);
  const [rate, setRate] = useState(3.5);

  const monthlyRate = rate / 100 / 12;
  const totalPayments = years * 12;
  const monthly = monthlyRate > 0
    ? (amount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1)
    : amount / totalPayments;
  const totalCost = monthly * totalPayments;

  const features = [
    {
      icon: Calculator,
      title: isEs ? 'Calculadora de Hipoteca' : 'Mortgage Calculator',
      text: isEs ? 'Simula tu cuota mensual según el importe, plazo e interés.' : 'Simulate your monthly payment based on amount, term and interest.',
    },
    {
      icon: FileText,
      title: isEs ? 'Asesoramiento Personalizado' : 'Personalized Advice',
      text: isEs ? 'Nuestros expertos financieros te guían en cada paso del proceso.' : 'Our financial experts guide you through every step.',
    },
    {
      icon: Shield,
      title: isEs ? 'Sin Compromiso' : 'No Commitment',
      text: isEs ? 'Consulta gratuita sin obligación. Comparamos las mejores ofertas del mercado.' : 'Free consultation with no obligation. We compare the best market offers.',
    },
    {
      icon: TrendingUp,
      title: isEs ? 'Mejores Condiciones' : 'Best Conditions',
      text: isEs ? 'Accede a condiciones exclusivas gracias a nuestros acuerdos con entidades bancarias.' : 'Access exclusive conditions thanks to our agreements with banks.',
    },
  ];

  const faqs = [
    {
      q: isEs ? '¿Qué es una hipoteca?' : 'What is a mortgage?',
      a: isEs
        ? 'Una hipoteca es un préstamo otorgado por una entidad bancaria para la compra de un inmueble. El propio inmueble sirve como garantía del préstamo. Se devuelve en cuotas mensuales durante un plazo determinado.'
        : 'A mortgage is a loan granted by a bank for the purchase of a property. The property itself serves as collateral for the loan. It is repaid in monthly installments over a set period.',
    },
    {
      q: isEs ? '¿Cuánto puedo financiar?' : 'How much can I finance?',
      a: isEs
        ? 'Generalmente los bancos financian hasta el 80% del valor de tasación para primera vivienda y hasta el 70% para segunda residencia o inversión. Depende del perfil financiero del comprador.'
        : 'Banks generally finance up to 80% of the appraisal value for primary homes and up to 70% for second homes or investments. It depends on the buyer\'s financial profile.',
    },
    {
      q: isEs ? '¿Tipo fijo o variable?' : 'Fixed or variable rate?',
      a: isEs
        ? 'El tipo fijo mantiene la misma cuota durante toda la vida del préstamo, ofreciendo estabilidad. El tipo variable está referenciado al Euríbor y la cuota se revisa periódicamente. Existe también el tipo mixto que combina ambos.'
        : 'A fixed rate keeps the same payment throughout the loan, offering stability. A variable rate is linked to the Euribor and payments are reviewed periodically. There is also a mixed rate combining both.',
    },
    {
      q: isEs ? '¿Qué gastos tiene una hipoteca?' : 'What costs does a mortgage have?',
      a: isEs
        ? 'Los principales gastos son: tasación del inmueble, notaría, registro de la propiedad, gestoría e impuestos (ITP para segunda mano o IVA para obra nueva). VIANCASA te ayuda a calcular todos estos costes.'
        : 'Main costs include: property appraisal, notary, property registry, agency fees, and taxes (Transfer Tax for resale or VAT for new builds). VIANCASA helps you calculate all these costs.',
    },
    {
      q: isEs ? '¿Qué documentación necesito?' : 'What documentation do I need?',
      a: isEs
        ? 'Necesitarás: DNI/NIE, últimas 3 nóminas, declaración de la renta, vida laboral, extractos bancarios de los últimos 6 meses y contrato de trabajo. Para autónomos se requiere documentación adicional.'
        : 'You will need: ID, last 3 payslips, tax return, employment history, bank statements from the last 6 months and employment contract. Self-employed require additional documentation.',
    },
    {
      q: isEs ? '¿VIANCASA cobra por este servicio?' : 'Does VIANCASA charge for this service?',
      a: isEs
        ? 'La consulta inicial y el estudio de viabilidad son completamente gratuitos y sin compromiso. Solo pagas si decides formalizar la hipoteca a través de nuestros partners financieros.'
        : 'The initial consultation and feasibility study are completely free and without obligation. You only pay if you decide to formalize the mortgage through our financial partners.',
    },
  ];

  const scrollToContact = () => {
    const el = document.getElementById('finance-contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 container mx-auto px-4 text-center pt-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6">
              <Euro className="h-5 w-5" />
              <span className="font-body text-sm font-medium">
                {isEs ? 'Financiación Inmobiliaria' : 'Property Financing'}
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {isEs ? 'Consulta tu hipoteca' : 'Check your mortgage'}
            </h1>
            <p className="font-body text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              {isEs
                ? 'Te ayudamos a encontrar la mejor financiación para tu vivienda. Asesoramiento experto, sin compromiso y totalmente gratuito.'
                : 'We help you find the best financing for your home. Expert advice, no commitment and completely free.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={scrollToContact} className="bg-primary hover:bg-primary/90 text-primary-foreground font-body text-base px-8 min-h-[48px] gap-2">
                {isEs ? 'Solicitar asesoramiento' : 'Request advice'}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                className="border-white/50 text-white hover:bg-white/10 font-body text-base px-8 min-h-[48px] gap-2"
              >
                {isEs ? 'Calcular cuota' : 'Calculate payment'}
                <Calculator className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-sm font-body font-semibold text-primary tracking-widest uppercase mb-3">
              {isEs ? 'Nuestro servicio' : 'Our service'}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {isEs ? '¿Cómo te ayudamos?' : 'How do we help you?'}
            </h2>
            <div className="w-16 h-0.5 bg-primary mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mortgage Calculator */}
      <section id="calculator" className="py-16 sm:py-24 bg-secondary">
        <div className="container mx-auto px-5 sm:px-6 max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-sm font-body font-semibold text-primary tracking-widest uppercase mb-3">
              {isEs ? 'Simulador' : 'Simulator'}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {isEs ? 'Calculadora de hipoteca' : 'Mortgage calculator'}
            </h2>
            <div className="w-16 h-0.5 bg-primary mx-auto" />
          </div>

          <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">
                  {isEs ? 'Importe del préstamo' : 'Loan amount'} (€)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-11 rounded-md border border-input bg-background px-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <input
                  type="range"
                  min={50000}
                  max={1000000}
                  step={5000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full mt-2 accent-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">
                  {isEs ? 'Plazo' : 'Term'} ({isEs ? 'años' : 'years'})
                </label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-11 rounded-md border border-input bg-background px-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <input
                  type="range"
                  min={5}
                  max={40}
                  step={1}
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full mt-2 accent-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">
                  {isEs ? 'Tipo de interés' : 'Interest rate'} (%)
                </label>
                <input
                  type="number"
                  step={0.1}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full h-11 rounded-md border border-input bg-background px-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <input
                  type="range"
                  min={0.5}
                  max={10}
                  step={0.1}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full mt-2 accent-primary"
                />
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
                <Euro className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="font-body text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  {isEs ? 'Cuota mensual' : 'Monthly payment'}
                </p>
                <p className="font-display text-2xl font-bold text-foreground">
                  {monthly.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5 text-center">
                <Percent className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="font-body text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  {isEs ? 'Total intereses' : 'Total interest'}
                </p>
                <p className="font-display text-2xl font-bold text-foreground">
                  {(totalCost - amount).toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5 text-center">
                <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="font-body text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  {isEs ? 'Coste total' : 'Total cost'}
                </p>
                <p className="font-display text-2xl font-bold text-foreground">
                  {totalCost.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>

            <p className="font-body text-xs text-muted-foreground text-center mt-4">
              {isEs
                ? '* Esta simulación es orientativa. Consulta con nuestros asesores para obtener una oferta personalizada.'
                : '* This simulation is for guidance only. Consult our advisors for a personalized offer.'}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-5 sm:px-6 max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-sm font-body font-semibold text-primary tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {isEs ? 'Preguntas frecuentes' : 'Frequently asked questions'}
            </h2>
            <div className="w-16 h-0.5 bg-primary mx-auto" />
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-5 data-[state=open]:bg-card">
                <AccordionTrigger className="font-body text-sm font-medium text-foreground hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-primary">
        <div className="container mx-auto px-5 sm:px-6 text-center">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            {isEs ? '¿Listo para dar el paso?' : 'Ready to take the step?'}
          </h2>
          <p className="font-body text-base text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            {isEs
              ? 'Solicita tu estudio de financiación gratuito y sin compromiso. Nuestros asesores te contactarán en menos de 24 horas.'
              : 'Request your free and no-commitment financing study. Our advisors will contact you within 24 hours.'}
          </p>
          <Button
            onClick={scrollToContact}
            variant="outline"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-body text-base px-8 min-h-[48px] gap-2"
          >
            {isEs ? 'Solicitar estudio gratuito' : 'Request free study'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Contact form */}
      <section id="finance-contact" className="py-16 sm:py-24 bg-secondary">
        <div className="container mx-auto px-5 sm:px-6 max-w-2xl">
          <div className="text-center mb-10">
            <p className="text-sm font-body font-semibold text-primary tracking-widest uppercase mb-3">
              {isEs ? 'Consulta' : 'Inquiry'}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {isEs ? 'Solicita tu estudio de financiación' : 'Request your financing study'}
            </h2>
            <div className="w-16 h-0.5 bg-primary mx-auto" />
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="bg-card border border-border rounded-xl p-6 sm:p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">{isEs ? 'Nombre' : 'Name'}</label>
                <input className="w-full h-11 rounded-md border border-input bg-background px-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">{isEs ? 'Teléfono' : 'Phone'}</label>
                <input className="w-full h-11 rounded-md border border-input bg-background px-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1.5">Email</label>
              <input type="email" className="w-full h-11 rounded-md border border-input bg-background px-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">
                  {isEs ? 'Valor del inmueble (€)' : 'Property value (€)'}
                </label>
                <input type="number" className="w-full h-11 rounded-md border border-input bg-background px-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">
                  {isEs ? 'Ahorros disponibles (€)' : 'Available savings (€)'}
                </label>
                <input type="number" className="w-full h-11 rounded-md border border-input bg-background px-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1.5">{isEs ? 'Mensaje' : 'Message'}</label>
              <textarea rows={3} className="w-full rounded-md border border-input bg-background px-3 py-2 font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="font-body text-xs text-muted-foreground">
                {isEs
                  ? 'Al enviar este formulario, acepta nuestra política de privacidad. Sus datos serán tratados de forma confidencial.'
                  : 'By submitting this form, you accept our privacy policy. Your data will be treated confidentially.'}
              </p>
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body text-base min-h-[48px]">
              {isEs ? 'Solicitar estudio gratuito' : 'Request free study'}
            </Button>
          </form>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
            <a href="tel:+34917263178" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-body text-sm">
              <Phone className="h-4 w-4 text-primary" /> +34 917 263 178
            </a>
            <a href="mailto:info@viancasa.com" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-body text-sm">
              <Mail className="h-4 w-4 text-primary" /> info@viancasa.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Financing;
