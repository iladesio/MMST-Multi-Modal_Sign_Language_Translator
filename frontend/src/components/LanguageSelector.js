import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { MenuItem, Select } from "@mui/material";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Select value={i18n.language} onChange={handleChange}>
      <MenuItem value="en">🇺🇸 English</MenuItem>
      <MenuItem value="it">🇮🇹 Italiano</MenuItem>
      <MenuItem value="es">🇪🇸 Español</MenuItem>
      {/* Aggiungi altre lingue qui */}
    </Select>
  );
};

export default LanguageSelector;
