import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { SEO } from "@/components/SEO";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={`${t('notFound.title')} - ${t('notFound.description')}`}
        description={t('notFound.description')}
        type="website"
      />
      <Header />
      
      <main className="flex-1 flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-2xl">
          <h1 className="mb-6 text-6xl font-bold">{t('notFound.description')}</h1>
          
          <div className="mb-8 flex items-center justify-center gap-8 text-9xl font-black">
            <span className="text-primary">{t('notFound.title')}</span>
            <div className="relative">
              <span className="text-primary">0</span>
              <Dumbbell className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 text-accent" />
            </div>
            <span className="text-primary">{t('notFound.title')}</span>
          </div>
          
          <Button asChild size="lg" className="rounded-full">
            <Link to="/">{t('notFound.backHome')}</Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
