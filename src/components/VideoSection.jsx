import React, { useState } from "react";
import { Play } from "lucide-react";
import Section from "./Section.jsx";
import site from "../data/site.json";

export default function VideoSection() {
  const id = site.video.youtubeId;
  const [playing, setPlaying] = useState(false);
  return (
    <Section id="video" kicker={site.video.kicker} title={site.video.title}>
      <div className="videoWrap">
        {id && playing ? (
          <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`} title={site.video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
        ) : id ? (
          <button className="videoPoster" type="button" onClick={() => setPlaying(true)} aria-label="Přehrát video z Japonského dne čaje a kultury">
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="Video z předchozího ročníku Japonského dne čaje a kultury" loading="lazy" />
            <span className="videoPlay"><Play size={42} fill="currentColor"/><strong>Přehrát video</strong></span>
          </button>
        ) : (
          <div className="videoPlaceholder"><Play size={44}/><strong>YouTube video</strong><span>{site.video.caption}</span></div>
        )}
      </div>
    </Section>
  );
}
