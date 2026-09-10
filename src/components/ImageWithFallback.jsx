import React, { useState } from "react";
import { Image as ImageIcon } from "lucide-react";

export default function ImageWithFallback({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return <div className={`imageFallback ${className}`.trim()}><ImageIcon size={28}/><span>Fotografie bude doplněna</span></div>;
  }
  return <img className={className} src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />;
}
