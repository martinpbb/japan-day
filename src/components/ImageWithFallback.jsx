import React, { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { useI18n } from "../lib/i18n.jsx";

export default function ImageWithFallback({ src, alt, className = "" }) {
  const { site } = useI18n();
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return <div className={`imageFallback ${className}`.trim()}><ImageIcon size={28}/><span>{site.ui.photoPending}</span></div>;
  }
  return <img className={className} src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />;
}
