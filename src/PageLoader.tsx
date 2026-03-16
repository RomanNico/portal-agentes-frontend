import { useEffect, useRef } from "react";

export default function PageLoader({ page }: { page: string }) {

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    fetch("/html/" + page)
      .then(res => res.text())
      .then(html => {

        if (!containerRef.current) return;

        containerRef.current.innerHTML = html;

        // ejecutar scripts del html cargado
        const scripts = containerRef.current.querySelectorAll("script");

        scripts.forEach(oldScript => {

          const newScript = document.createElement("script");

          if (oldScript.src) {
            newScript.src = oldScript.src;
            newScript.async = false;
          } else {
            newScript.textContent = oldScript.textContent;
          }

          document.body.appendChild(newScript);
        });

        setTimeout(() => {

          const cards = containerRef.current?.querySelectorAll(".animate-card");

          cards?.forEach(card => {
            card.classList.add("visible");
          });

        }, 100);

      });

  }, [page]);

  return <div ref={containerRef}></div>;
}