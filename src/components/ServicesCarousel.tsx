import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Truck,
  Battery,
  Fuel,
  Key,
  Wrench,
  Shield,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ServiceFeature {
  text: string;
}

interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  features: ServiceFeature[];
  borderColor: string;
  bgColor: string;
  iconColor: string;
}

const services: Service[] = [
  {
    id: "towing",
    icon: Truck,
    title: "Towing Services",
    description: "Professional towing for all vehicle types, from compact cars to heavy trucks",
    features: [
      { text: "Local & Long Distance" },
      { text: "Flatbed Towing" },
      { text: "Motorcycle Towing" },
    ],
    borderColor: "border-t-blue-600",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: "battery",
    icon: Battery,
    title: "Battery Services",
    description: "Jump starts and battery replacement to get you moving again",
    features: [
      { text: "Jump Start Service" },
      { text: "Battery Testing" },
      { text: "Battery Replacement" },
    ],
    borderColor: "border-t-yellow-400",
    bgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    id: "fuel",
    icon: Fuel,
    title: "Fuel Delivery",
    description: "Emergency fuel delivery service when you run out of gas",
    features: [
      { text: "24/7 Fuel Delivery" },
      { text: "All Fuel Types" },
      { text: "Fast Response Time" },
    ],
    borderColor: "border-t-red-600",
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    id: "lockout",
    icon: Key,
    title: "Lockout Service",
    description: "Professional lockout assistance to get you back in your vehicle",
    features: [
      { text: "Car Lockout Service" },
      { text: "Trunk Lockout" },
      { text: "Ignition Key Issues" },
    ],
    borderColor: "border-t-purple-600",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    id: "tire",
    icon: Wrench,
    title: "Tire Change",
    description: "Quick tire change service to help you continue your journey",
    features: [
      { text: "Flat Tire Replacement" },
      { text: "Spare Tire Installation" },
      { text: "Tire Pressure Check" },
    ],
    borderColor: "border-t-green-600",
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: "emergency",
    icon: Shield,
    title: "Emergency Assistance",
    description: "Round-the-clock emergency roadside assistance for any situation",
    features: [
      { text: "Accident Recovery" },
      { text: "Winch-Out Service" },
      { text: "24/7 Availability" },
    ],
    borderColor: "border-t-orange-600",
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600",
  },
];

export function ServicesCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const totalSlides = 4; // Slides: 0-2, 1-3, 2-4, 3-5 (showing 3 services each, sliding by 1)

  // Auto-play logic
  useEffect(() => {
    if (isPaused || isDragging) return;

    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000); // Auto-advance every 4 seconds

    return () => clearInterval(intervalId);
  }, [isPaused, isDragging, totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000); // Resume auto-play after 8 seconds
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

    // Get the first card element to measure its actual width
    const firstCard = trackRef.current.querySelector('.service-card-wrapper') as HTMLElement;
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
      aria-label="Services carousel"
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

      {/* Carousel Track Container - Shows only 3 services at a time */}
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
            {/* All 6 services in one continuous row */}
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="service-card-wrapper flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-4"
                >
                  <Card
                    className={`hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 ${service.borderColor} h-full`}
                  >
                    <CardHeader>
                      <div className={`w-16 h-16 ${service.bgColor} rounded-full flex items-center justify-center mb-4`}>
                        <Icon className={`w-8 h-8 ${service.iconColor}`} />
                      </div>
                      <CardTitle className="text-2xl">{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>{feature.text}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
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
