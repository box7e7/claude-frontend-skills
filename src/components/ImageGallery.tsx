import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

interface ImageGalleryProps {
  title?: string;
  subtitle?: string;
}

export function ImageGallery({ 
  title = "Our Work", 
  subtitle = "Browse through our gallery of completed jobs and satisfied customers" 
}: ImageGalleryProps) {
  const [images, setImages] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set());
  const trackRef = useRef<HTMLDivElement>(null);

  // Fetch gallery images
  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (data.images && data.images.length > 0) {
          console.log(`🖼️ Gallery: Loaded ${data.images.length} images`);
          setImages(data.images);
        }
      })
      .catch(err => console.error('Failed to load gallery images:', err));
  }, []);

  // Calculate visible slides based on screen size
  const getVisibleSlides = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [visibleSlides, setVisibleSlides] = useState(3);

  useEffect(() => {
    const handleResize = () => setVisibleSlides(getVisibleSlides());
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.max(0, images.length - visibleSlides + 1);

  // Auto-play carousel
  useEffect(() => {
    if (isPaused || isDragging || lightboxOpen || totalSlides <= 1) return;

    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [isPaused, isDragging, lightboxOpen, totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(Math.max(0, Math.min(index, totalSlides - 1)));
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000);
  };

  const goToPrevious = () => goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
  const goToNext = () => goToSlide((currentSlide + 1) % totalSlides);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStart);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    if (Math.abs(dragOffset) > 100) {
      dragOffset > 0 ? goToPrevious() : goToNext();
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragOffset(0);
    }
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart(e.touches[0]?.clientX ?? 0);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setDragOffset((e.touches[0]?.clientX ?? 0) - dragStart);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    if (Math.abs(dragOffset) > 100) {
      dragOffset > 0 ? goToPrevious() : goToNext();
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  // Calculate transform
  const getTransform = () => {
    if (!trackRef.current) return 'translateX(0)';
    const firstCard = trackRef.current.querySelector('.gallery-card') as HTMLElement;
    if (!firstCard) return 'translateX(0)';
    const cardWidth = firstCard.offsetWidth;
    const slideOffset = -currentSlide * cardWidth;
    return `translateX(${slideOffset + (isDragging ? dragOffset : 0)}px)`;
  };

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const lightboxPrev = () => setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  const lightboxNext = () => setLightboxIndex((prev) => (prev + 1) % images.length);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxPrev();
      if (e.key === 'ArrowRight') lightboxNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  // Track loaded images for lazy loading indicator
  const handleImageLoad = useCallback((index: number) => {
    setImagesLoaded(prev => new Set(prev).add(index));
  }, []);

  if (images.length === 0) {
    return null;
  }

  return (
    <>
      <section id="gallery" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{title}</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">{subtitle}</p>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => {
              setIsPaused(false);
              handleMouseLeave();
            }}
            role="region"
            aria-label="Image gallery carousel"
          >
            {/* Navigation Arrows */}
            {totalSlides > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                  aria-label="Previous images"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                  aria-label="Next images"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Carousel Track */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <div
                  ref={trackRef}
                  className="flex"
                  style={{
                    transform: getTransform(),
                    transition: isDragging ? "none" : "transform 600ms cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: isDragging ? "grabbing" : "grab",
                  }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {images.map((src, index) => (
                    <div
                      key={src}
                      className="gallery-card flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-3"
                    >
                      <div
                        className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                        onClick={() => openLightbox(index)}
                      >
                        {/* Skeleton loader */}
                        {!imagesLoaded.has(index) && (
                          <div className="absolute inset-0 bg-slate-700 animate-pulse" />
                        )}
                        
                        {/* Image with lazy loading */}
                        <img
                          src={src}
                          alt={`Gallery image ${index + 1}`}
                          loading="lazy"
                          decoding="async"
                          onLoad={() => handleImageLoad(index)}
                          className={`w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110 ${
                            imagesLoaded.has(index) ? 'opacity-100' : 'opacity-0'
                          }`}
                          style={{ contentVisibility: 'auto', containIntrinsicSize: '400px 256px' }}
                        />
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/40 transition-all duration-300 flex items-center justify-center">
                          <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dot Indicators - Show limited dots on mobile */}
            {totalSlides > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                {/* On mobile, show progress bar instead of dots when too many slides */}
                <div className="sm:hidden flex items-center gap-3">
                  <span className="text-white/70 text-sm font-medium">
                    {currentSlide + 1} / {totalSlides}
                  </span>
                  <div className="w-24 h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-400 transition-all duration-300 rounded-full"
                      style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
                    />
                  </div>
                </div>
                {/* On larger screens, show dot indicators */}
                <div className="hidden sm:flex gap-2">
                  {[...Array(totalSlides)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`transition-all duration-300 rounded-full ${
                        currentSlide === index
                          ? "w-8 h-3 bg-yellow-400"
                          : "w-3 h-3 bg-white/30 hover:bg-white/50"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                      aria-current={currentSlide === index ? "true" : "false"}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 text-white hover:text-yellow-400 transition-colors p-2"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              lightboxPrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all duration-300"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              lightboxNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all duration-300"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Main image */}
          <img
            src={images[lightboxIndex]}
            alt={`Gallery image ${lightboxIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
