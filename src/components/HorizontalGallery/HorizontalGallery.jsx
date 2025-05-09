import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState } from 'react';
import './HorizontalGallery.css';
import CustomCursor from "@/components/CustomCursor/CustomCursor";

export default function HorizontalGallery({ images = [] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: 'x',
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const updateIndex = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', updateIndex);
    updateIndex(); // Init
  }, [emblaApi]);

  useEffect(() => {
    const container = emblaApi?.containerNode();
    if (!container || !emblaApi) return;
  
    const handleWheel = (e) => {
      const isVertical = Math.abs(e.deltaY) > Math.abs(e.deltaX);
  
      // Only scroll horizontally if user is scrolling vertically
      if (!isVertical) return;
  
      const scrollBy = e.deltaY * 0.02;
      const canScrollForward = scrollBy > 0 && emblaApi.canScrollNext();
      const canScrollBackward = scrollBy < 0 && emblaApi.canScrollPrev();
  
      // Only scroll horizontally if there's still content in that direction
      if (canScrollForward || canScrollBackward) {
        emblaApi.scrollBy(scrollBy);
      }
      // IMPORTANT: do NOT preventDefault. Let vertical scrolling through.
    };
  
    container.addEventListener('wheel', handleWheel, { passive: true });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [emblaApi]);

  useEffect(() => {
    const event = new Event("cursor-rebind");
    window.dispatchEvent(event);
  }, []);
  
  if (!images.length) return null;

  return (
    <section className="project-gallery">
      <div className="embla" ref={emblaRef} data-cursor="gallery">
        <div className="embla__container">
          {images.map((src, i) => (
            <div className="embla__slide" key={i}>
              <img src={src} alt={`Gallery ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="embla__fixed-counter">
        <h2><span>{selectedIndex + 1} / {images.length}</span></h2>
      </div>
    </section>
  );
}
