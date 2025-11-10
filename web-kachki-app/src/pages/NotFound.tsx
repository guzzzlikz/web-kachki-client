import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { SEO } from "@/components/SEO";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    // Log 404 errors only in development
    if (import.meta.env.DEV) {
      console.warn("404 Error: User attempted to access non-existent route:", location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={`${t('notFound.title')} - ${t('notFound.description')}`}
        description={t('notFound.description')}
        type="website"
      />
      <Header />
      
      <main className="flex-1 flex items-center justify-center bg-background px-4 pb-20">
        <div className="text-center max-w-4xl w-full">
          <div className="mb-8 flex justify-center">
            <img 
              src="/404.svg" 
              alt="404 Page Not Found" 
              className="w-full max-w-2xl h-auto"
            />
          </div>
          
          <Button asChild size="lg" className="rounded-full mb-16">
            <Link to="/">{t('notFound.backHome')}</Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
