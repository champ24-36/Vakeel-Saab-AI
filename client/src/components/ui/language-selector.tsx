import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { INDIAN_LANGUAGES } from "@/lib/constants";

interface LanguageSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export function LanguageSelector({ value, onValueChange, className }: LanguageSelectorProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent>
        {INDIAN_LANGUAGES.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            {language.nativeName} ({language.name})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
