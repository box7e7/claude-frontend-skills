import { useState, useEffect, useRef } from "react";
import { Clock, Shield, Star, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor: string;
}

const features: Feature[] = [
  {
    id: "fast-response",
    icon: Clock,
    title: "Fast Response",
    description: "Average arrival time under 30 minutes",
    iconColor: "text-blue-600",
  },
  {
    id: "fully-insured",
    icon: Shield,
    title: "Fully Insured",
    description: "Licensed and insured for your peace of mind",
    iconColor: "text-yellow-600",
  },
  {
    id: "five-star",
    icon: Star,
    title: "5-Star Rated",
    description: "Trusted by thousands of satisfied customers",
    iconColor: "text-purple-600",
  },
  {
    id: "local-experts",
    icon: MapPin,
    title: "Local Experts",
    description: "Familiar with all routes and areas",
    iconColor: "text-red-600",
  },
];

export function FeaturesCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const totalSlides = 2; // 4 features, slide by 1, showing 3 at a time = 2 positions

  // Auto-play logic
  useEffect(() => {
    if (isPaused || isDragging) return;

    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(intervalId);
  }, [isPaused, isDragging, totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000);
  };

  const goToPrevious = () => {
    goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    goToSlide((currentSlide + 1) % totalSlides);
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const offset = e.clientX - dragStart;
    setDragOffset(offset);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    const threshold = 100;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
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

  // Touch drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const offset = e.touches[0].clientX - dragStart;
    setDragOffset(offset);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    const threshold = 100;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }

    setIsDragging(false);
    setDragOffset(0);
  };

  // Calculate transform - slide by one card width
  const getTransform = () => {
    if (!trackRef.current) return 'translateX(0)';

    const firstCard = trackRef.current.querySelector('.feature-card-wrapper') as HTMLElement;
    if (!firstCard) return 'translateX(0)';

    const cardWidth = firstCard.offsetWidth;
    const slideOffset = -currentSlide * cardWidth;

    if (isDragging) {
      return `translateX(${slideOffset + dragOffset}px)`;
    }
    return `translateX(${slideOffset}px)`;
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        handleMouseLeave();
      }}
      role="region"
      aria-label="Features carousel"
    >
      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-blue-50 text-blue-900 rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-blue-50 text-blue-900 rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Carousel Track Container */}
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
            {/* All 4 features in one continuous row */}
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  className="feature-card-wrapper flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-4"
                >
                  <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full">
                    <Icon className={`w-16 h-16 ${feature.iconColor} mx-auto mb-4`} />
                    <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-3 mt-8">
        {[...Array(totalSlides)].map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index
                ? "w-8 h-3 bg-blue-600"
                : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={currentSlide === index ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  );
}
