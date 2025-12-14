import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Review {
  id: string;
  name: string;
  initial: string;
  timeAgo: string;
  rating: number;
  text: string;
  bgColor: string;
}

const reviews: Review[] = [
  {
    id: "1",
    name: "Marcus Fisher",
    initial: "M",
    timeAgo: "a year ago",
    rating: 5,
    text: "Ahmad was amazing. He came to our rescue after our roadside assistance couldn't help!! He went hundreds of miles out of his way to get us back home!! Although I hope I don't have to, but if I was ever stranded again, I'm calling Ahmad!!!",
    bgColor: "bg-blue-600",
  },
  {
    id: "2",
    name: "Akinyi Adoyo",
    initial: "A",
    timeAgo: "a year ago",
    rating: 5,
    text: "Yazan surpassed my expectations. I requested roadside assistance, and he arrived ahead of schedule, demonstrating professionalism and courtesy. This was the best roadside assistance I've had in a long time. Thank you, Yazan, for your professionalism and kindness.",
    bgColor: "bg-purple-600",
  },
  {
    id: "3",
    name: "Krystal Palmer-Jones",
    initial: "K",
    timeAgo: "a year ago",
    rating: 5,
    text: "I had a flat tire and called. He told me 20 mins and it was much less of a wait. AMAZING!! He was courteous, fast, and extremely reasonable with regard to price! I would absolutely call him again if I am ever in need. Thank you!!!",
    bgColor: "bg-green-600",
  },
  {
    id: "4",
    name: "Casey Cropper",
    initial: "C",
    timeAgo: "a year ago",
    rating: 5,
    text: "I had a phenomenal experience with momentum roadside services. They expressed complete professionalism and patience in resolving my issue. They graciously waited until my replacement ride arrived due to the weather. They even extended solutions on how to request assistance through enterprise rentals with which I had the issues.",
    bgColor: "bg-orange-600",
  },
  {
    id: "5",
    name: "Laura Gomez",
    initial: "L",
    timeAgo: "a year ago",
    rating: 5,
    text: "I highly recommend. They gave us kind, fast and excellent service on a Sunday afternoon. Johnny on the spot as my husband says. Resourceful and very fair. I'm recommending them to all my friends.",
    bgColor: "bg-blue-600",
  },
];

export function ReviewsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = reviews.length;

  // Auto-play logic
  useEffect(() => {
    if (isPaused) return;

    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(intervalId);
  }, [isPaused, totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000); // Resume auto-play after 10 seconds
  };

  const goToPrevious = () => {
    goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    goToSlide((currentSlide + 1) % totalSlides);
  };

  const currentReview = reviews[currentSlide];

  return (
    <div
      className="relative max-w-4xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Customer reviews carousel"
    >
      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white hover:bg-blue-50 text-blue-900 rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
        aria-label="Previous review"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white hover:bg-blue-50 text-blue-900 rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
        aria-label="Next review"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Review Card */}
      <div className="px-12">
        <Card className="shadow-xl border-0 bg-white hover:shadow-2xl transition-shadow duration-300">
          <CardContent className="pt-8 pb-8">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div
                className={`flex-shrink-0 w-16 h-16 ${currentReview.bgColor} rounded-full flex items-center justify-center text-white text-2xl font-bold`}
              >
                {currentReview.initial}
              </div>

              {/* Review Content */}
              <div className="flex-1">
                {/* Name and Time */}
                <div className="mb-3">
                  <h3 className="font-bold text-lg text-gray-900">
                    {currentReview.name}
                  </h3>
                  <p className="text-sm text-gray-500">{currentReview.timeAgo}</p>
                </div>

                {/* Star Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(currentReview.rating)].map((_, index) => (
                    <Star
                      key={index}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 leading-relaxed text-base">
                  {currentReview.text}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index
                ? "w-8 h-3 bg-blue-600"
                : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to review ${index + 1}`}
            aria-current={currentSlide === index ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  );
}
