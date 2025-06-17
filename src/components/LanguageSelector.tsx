
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/types/language";

export const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();

  const languageOptions = [
    { value: 'ko' as Language, label: t('korean') },
    { value: 'en' as Language, label: t('english') },
    { value: 'ja' as Language, label: t('japanese') },
  ];

  return (
    <div className="flex items-center gap-2">
      <Languages className="w-4 h-4 text-gray-600" />
      <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {languageOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
