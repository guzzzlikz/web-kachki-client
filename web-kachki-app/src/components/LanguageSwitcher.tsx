import { useTranslation } from 'react-i18next';
import { Switch } from '@/components/ui/switch';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const isUkrainian = i18n.language === 'uk' || i18n.language.startsWith('uk');

  const toggleLanguage = (checked: boolean) => {
    i18n.changeLanguage(checked ? 'uk' : 'en');
  };

  return (
    <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-primary-foreground/10">
      <span className={`text-xs font-medium transition-colors ${!isUkrainian ? 'text-accent' : 'text-primary-foreground/60'}`}>
        ENG
      </span>
      <Switch
        checked={isUkrainian}
        onCheckedChange={toggleLanguage}
        aria-label="Switch language"
        className="data-[state=checked]:bg-accent data-[state=unchecked]:bg-primary-foreground/30"
      />
      <span className={`text-xs font-medium transition-colors ${isUkrainian ? 'text-accent' : 'text-primary-foreground/60'}`}>
        UA
      </span>
    </div>
  );
};

