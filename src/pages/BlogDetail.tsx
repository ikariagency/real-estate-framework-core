import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { blogPosts } from '@/data/blog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Calendar, Tag } from 'lucide-react';

const BlogDetail = () => {
  const { slug } = useParams();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const isEs = language === 'es' || language === 'cat';

  const post = blogPosts.find((p) => p.slug === slug);
  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 text-center container mx-auto px-4">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            {isEs ? 'Artículo no encontrado' : 'Article not found'}
          </h1>
          <Button onClick={() => navigate('/')} className="bg-primary hover:bg-primary/90 text-primary-foreground font-body gap-2">
            <ArrowLeft className="h-4 w-4" />
            {isEs ? 'Volver al inicio' : 'Back to home'}
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const title = isEs ? post.titleEs : post.titleEn;
  const content = isEs ? post.contentEs : post.contentEn;
  const category = isEs ? post.category : post.categoryEn;

  // Simple markdown-like rendering
  const renderContent = (text: string) => {
    return text.split('\n\n').map((block, i) => {
      if (block.startsWith('## ')) {
        return <h2 key={i} className="font-display text-2xl font-bold text-foreground mt-8 mb-4">{block.replace('## ', '')}</h2>;
      }
      if (block.startsWith('### ')) {
        return <h3 key={i} className="font-display text-xl font-semibold text-foreground mt-6 mb-3">{block.replace('### ', '')}</h3>;
      }
      return <p key={i} className="font-body text-muted-foreground leading-relaxed mb-4">{block}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative h-[40vh] sm:h-[50vh] md:h-[60vh]">
        <img src={post.image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-10">
          <div className="container mx-auto max-w-3xl">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/70 hover:text-white font-body text-sm mb-3 sm:mb-4 transition-colors min-h-[44px]">
              <ArrowLeft className="h-4 w-4" />
              {isEs ? 'Volver' : 'Back'}
            </button>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <span className="bg-primary text-primary-foreground text-xs font-body font-semibold px-2.5 py-1 rounded flex items-center gap-1">
                <Tag className="h-3 w-3" /> {category}
              </span>
              <span className="text-white/60 text-xs sm:text-sm font-body flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {new Date(post.date).toLocaleDateString(isEs ? 'es-ES' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
            <h1 className="font-display text-xl sm:text-2xl md:text-4xl font-bold text-white leading-tight">{title}</h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-10 sm:py-16 lg:py-20">
        <div className="container mx-auto px-5 sm:px-6 max-w-3xl">
          {renderContent(content)}
        </div>
      </article>

      {/* CTA */}
      <section className="bg-primary py-10 sm:py-16">
        <div className="container mx-auto px-5 sm:px-6 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary-foreground mb-3 sm:mb-4">
            {isEs ? '¿Busca vivienda en Madrid?' : 'Looking for property in Madrid?'}
          </h2>
          <p className="font-body text-primary-foreground/80 text-base sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto">
            {isEs ? 'Descubra nuestras propiedades exclusivas en los mejores barrios de la capital' : 'Discover our exclusive properties in the capital\'s best neighborhoods'}
          </p>
          <Button
            onClick={() => navigate('/#properties')}
            size="lg"
            className="bg-card text-primary hover:bg-card/90 font-body text-base px-8 gap-2 min-h-[48px]"
          >
            {isEs ? 'Ver propiedades' : 'View properties'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Related Articles */}
      {otherPosts.length > 0 && (
        <section className="py-10 sm:py-16 lg:py-20 bg-secondary">
          <div className="container mx-auto px-5 sm:px-6">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8 text-center">
              {isEs ? 'Artículos relacionados' : 'Related articles'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {otherPosts.map((p) => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow">
                  <div className="overflow-hidden aspect-[16/10]">
                    <img src={p.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-base font-semibold text-foreground mb-2 line-clamp-2">
                      {isEs ? p.titleEs : p.titleEn}
                    </h3>
                    <span className="flex items-center gap-1.5 text-sm font-body font-medium text-primary">
                      {t.blog.readMore} <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogDetail;
