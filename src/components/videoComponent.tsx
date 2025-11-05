import { useEffect, useRef, useState } from "react";

interface VideoComponentProps {
  src: string;
  poster: string;
  className?: string;
}

export const VideoComponent: React.FC<VideoComponentProps> = ({
  src,
  poster,
  className,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Força atributos essenciais cedo
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");

    const tryPlay = async () => {
      try {
        await video.play();
      } catch (err) {
        console.warn("Autoplay falhou:", err);
        // fallback: tentar novamente quando o usuário interagir
        const playOnInteraction = () => {
          video.play().catch((e) => console.warn("Play após interação falhou:", e));
          document.removeEventListener("touchstart", playOnInteraction);
          document.removeEventListener("click", playOnInteraction);
        };
        document.addEventListener("touchstart", playOnInteraction, { once: true });
        document.addEventListener("click", playOnInteraction, { once: true });
      }
    };

    // Tenta tocar assim que o vídeo carregar
    const handleLoadedData = () => {
      setLoaded(true);
      tryPlay();
    };
    video.addEventListener("loadeddata", handleLoadedData);

    // Safari: também tenta tocar assim que o vídeo estiver visível
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) tryPlay();
    });
    observer.observe(video);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`${className || ""}`}>
      {!loaded && (
        <img
          src={poster}
          alt="Pré-carregamento do vídeo"
          loading="eager"
          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300"
        />
      )}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={src} type="video/mp4" />
        Seu navegador não suporta vídeos HTML5.
      </video>
    </div>
  );
};
