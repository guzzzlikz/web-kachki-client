import { Link } from "react-router-dom";
import { Dumbbell, Instagram, Facebook, Twitter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center gap-2 text-xl font-bold mb-4">
              <Dumbbell className="h-8 w-8" />
              <span>ARES</span>
            </Link>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t('footer.courses')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-sm hover:text-accent transition-colors">
                  {t('footer.allCourses')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t('footer.aboutUs')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm hover:text-accent transition-colors">
                  {t('footer.about')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t('footer.newsletter')}</h3>
            <form className="space-y-3">
              <Input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button variant="hero" className="w-full">
                {t('footer.subscribe')}
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4">
            <a href="https://instagram.com" className="text-primary-foreground/80 hover:text-accent transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://facebook.com" className="text-primary-foreground/80 hover:text-accent transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" className="text-primary-foreground/80 hover:text-accent transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
          </div>

          <div className="flex gap-6 text-sm text-primary-foreground/80">
            <a href="#" className="hover:text-accent transition-colors">
              @myinstagram
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              @myfacebook
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              @mytwitter
            </a>
            <a href="mailto:email123@mail.mail" className="hover:text-accent transition-colors">
              email123@mail.mail
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
