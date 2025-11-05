import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { SEO } from "@/components/SEO";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={t('about.title')}
        description={t('about.description')}
      />
      <Header />

      <main className="flex-1 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-8 text-center">{t('about.title')}</h1>
            <div className="bg-card/10 backdrop-blur rounded-2xl p-12 text-center">
              <p className="text-xl leading-relaxed">
                {t('about.content')}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
