import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ServicesCarousel } from "./ServicesCarousel";
import { FeaturesCarousel } from "./FeaturesCarousel";
import { ReviewsCarousel } from "./ReviewsCarousel";
import {
  Truck,
  Phone,
  CheckCircle,
  Clock,
  MapPin,
  Shield,
  Star
} from "lucide-react";
import { useState, useEffect } from "react";

export function LandingPage() {
  // State for hero background mode
  const [backgroundMode, setBackgroundMode] = useState<'images' | 'video' | null>(null);
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [heroVideos, setHeroVideos] = useState<string[]>([]);
  const durationPerImage = 10; // seconds each image is visible

  // Randomly choose between images or video on mount
  useEffect(() => {
    // Randomly select mode (50% chance each)
    const randomMode = Math.random() < 0.5 ? 'images' : 'video';
    setBackgroundMode(randomMode);

    console.log(`🎲 Random hero mode selected: ${randomMode}`);

    // Fetch appropriate content based on selected mode
    if (randomMode === 'images') {
      fetch('/api/images')
        .then(res => res.json())
        .then(data => {
          if (data.images && data.images.length > 0) {
            console.log(`🖼️  Detected ${data.images.length} hero images:`, data.images);
            setHeroImages(data.images);
          } else {
            console.warn('⚠️  No images found in /images folder');
          }
        })
        .catch(err => console.error('❌ Failed to load images:', err));
    } else {
      fetch('/api/videos')
        .then(res => res.json())
        .then(data => {
          if (data.videos && data.videos.length > 0) {
            console.log(`🎥 Detected ${data.videos.length} hero videos:`, data.videos);
            setHeroVideos(data.videos);
          } else {
            console.warn('⚠️  No videos found in /videos folder');
          }
        })
        .catch(err => console.error('❌ Failed to load videos:', err));
    }
  }, []);

  const imageCount = heroImages.length;
  const totalDuration = imageCount > 0 ? durationPerImage * imageCount : 10; // total cycle time

  // Preload all images immediately for smooth animation (they're optimized WebP now)
  useEffect(() => {
    if (backgroundMode === 'images' && heroImages.length > 0) {
      console.log(`🔄 Preloading ${heroImages.length} optimized WebP images...`);
      heroImages.forEach((imageUrl, index) => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => console.log(`✅ Preloaded image ${index + 1}/${heroImages.length}: ${imageUrl}`);
      });
    }
  }, [backgroundMode, heroImages]);

  // Dynamically generate keyframes based on actual number of images
  useEffect(() => {
    if (imageCount === 0) return;

    const visiblePercent = (durationPerImage / totalDuration) * 100; // % of total cycle each image is visible
    const zoomInPercent = (5 / totalDuration) * 100; // 5 seconds to zoom in
    const zoomOutPercent = (9.5 / totalDuration) * 100; // 9.5 seconds to zoom out
    const fadeOutPercent = visiblePercent; // Fade out at end of visible time

    console.log(`🎬 Animation timing for ${imageCount} images (${totalDuration}s total):`);
    console.log(`   - Each image visible: ${durationPerImage}s (${visiblePercent.toFixed(2)}% of cycle)`);
    console.log(`   - Zoom IN: 0s → 5s (${zoomInPercent.toFixed(2)}%)`);
    console.log(`   - Zoom OUT: 5s → 9.5s (${zoomOutPercent.toFixed(2)}%)`);
    console.log(`   - Fade: 9.5s → ${durationPerImage}s (${fadeOutPercent.toFixed(2)}%)`);

    const styleId = 'hero-zoom-keyframes';
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      existingStyle.remove();
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes heroZoomDynamic {
        0% {
          opacity: 1;
          transform: scale(1);
        }
        ${zoomInPercent}% {
          opacity: 1;
          transform: scale(1.15);
        }
        ${zoomOutPercent}% {
          opacity: 1;
          transform: scale(1);
        }
        ${fadeOutPercent}% {
          opacity: 0;
          transform: scale(1);
        }
        100% {
          opacity: 0;
          transform: scale(1);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      const styleToRemove = document.getElementById(styleId);
      if (styleToRemove) {
        styleToRemove.remove();
      }
    };
  }, [imageCount, totalDuration, durationPerImage]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Professional Design with Zooming Background */}
      <section className="relative overflow-hidden bg-slate-900 min-h-screen flex items-center">
        {/* Zooming Background Images - Auto-loaded from /images folder */}
        <div className="absolute inset-0 overflow-hidden">
          {/* IMAGE MODE: Zoom in/out slideshow - all images preloaded */}
          {backgroundMode === 'images' && heroImages.length > 0 && (
            heroImages.map((imageUrl, index) => {
              const delay = index * durationPerImage;

              return (
                <div
                  key={imageUrl}
                  className="absolute inset-0 bg-cover bg-center hero-slide"
                  style={{
                    backgroundImage: `url('${imageUrl}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    animation: `heroZoomDynamic ${totalDuration}s ease-in-out infinite`,
                    animationDelay: `${delay}s`,
                  } as React.CSSProperties}
                />
              );
            })
          )}

          {/* VIDEO MODE: Looping video background with lazy loading */}
          {backgroundMode === 'video' && heroVideos.length > 0 && (
            <video
              autoPlay
              loop
              muted
              playsInline
              loading="lazy"
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
              src={heroVideos[0]}
            >
              Your browser does not support video playback.
            </video>
          )}

          {/* LOADING STATE: Show while mode is being determined */}
          {backgroundMode === null && (
            <div className="absolute inset-0 bg-slate-800" />
          )}

          {/* Dark Overlay for Better Text Readability (applies to both modes) */}
          <div className="absolute inset-0 bg-slate-900/50" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-24 lg:py-32">
          {/* Centered Content Container */}
          <div className="max-w-5xl mx-auto text-center text-white space-y-12">

            {/* Top Badge - Fade In */}
            <div className="flex justify-center animate-fadeIn" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              <div className="inline-flex items-center gap-2 bg-yellow-400/20 backdrop-blur-md border border-yellow-400/40 rounded-full px-5 py-2.5 text-sm font-semibold text-yellow-400 shadow-lg">
                <Clock className="w-4 h-4" />
                <span>Available 24/7 Emergency Service</span>
              </div>
            </div>

            {/* Main Heading - Centered with Animation */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
                <span className="inline-block animate-fadeIn" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>Momentum Towing</span><br />
                <span className="inline-block text-yellow-400 animate-fadeIn" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>& Roadside Services</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed animate-fadeIn" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
                Professional towing and roadside assistance when you need it most. Fast response, reliable service, competitive rates.
              </p>
            </div>

            {/* CTA Buttons - Centered with Animation */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 animate-fadeIn" style={{ animationDelay: '0.9s', animationFillMode: 'both' }}>
              <Button
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold text-lg px-10 py-7 rounded-lg shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300 hover:scale-105"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now: (555) 123-4567
              </Button>
              <Button
                size="lg"
                className="bg-white text-blue-900 hover:bg-blue-50 font-bold text-lg px-10 py-7 rounded-lg shadow-xl transition-all duration-300 hover:scale-105"
              >
                Request a Quote
              </Button>
            </div>

          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0 -mb-px">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0,40L60,45C120,50,240,60,360,60C480,60,600,50,720,45C840,40,960,40,1080,45C1200,50,1320,60,1380,65L1440,70L1440,80L0,80Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900">Our Services</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Complete roadside assistance solutions to get you back on the road quickly
            </p>
          </div>

          <ServicesCarousel />
        </div>
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-slate-50/30 pointer-events-none"></div>
      </section>

      {/* Customer Reviews Section */}
      <section id="reviews" className="py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900">Customer Reviews</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what our satisfied customers have to say about our service
            </p>
          </div>

          <ReviewsCarousel />
        </div>
        {/* Decorative separator */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
      </section>

      {/* Features and Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900">Why Choose Momentum?</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the fastest and most reliable roadside assistance
            </p>
          </div>

          <FeaturesCarousel />

          <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6 text-blue-900">Our Commitment to You</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-lg">Professional Service</h4>
                      <p className="text-muted-foreground">Trained and certified technicians</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-lg">Transparent Pricing</h4>
                      <p className="text-muted-foreground">No hidden fees or surprise charges</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-lg">Modern Equipment</h4>
                      <p className="text-muted-foreground">State-of-the-art towing and service vehicles</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-lg">Customer Satisfaction</h4>
                      <p className="text-muted-foreground">Your safety and satisfaction are our top priorities</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-600 to-blue-900 rounded-2xl p-8 text-white">
                  <div className="text-center">
                    <p className="text-6xl font-bold mb-2">24/7</p>
                    <p className="text-2xl mb-4">Emergency Service</p>
                    <p className="text-blue-200 mb-6">We're always here when you need us most</p>
                    <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold w-full">
                      <Phone className="mr-2 h-5 w-5" />
                      Call Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom decorative border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
      </section>

      {/* Contact/CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 via-slate-50 to-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900">Get in Touch</h2>
              <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
              <p className="text-xl text-muted-foreground">
                Need immediate assistance or have questions? We're here to help!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto">
              <Card className="border-2 border-blue-600">
                <CardHeader className="bg-blue-600 text-white py-4">
                  <CardTitle className="text-xl flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5" />
                    Emergency Hotline
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-5 pb-5">
                  <p className="text-2xl font-bold text-blue-900 mb-2 text-center">(555) 123-4567</p>
                  <p className="text-muted-foreground text-sm text-center">Available 24 hours a day, 7 days a week</p>
                  <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700">
                    Call Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-yellow-400">
                <CardHeader className="bg-yellow-400 text-blue-900 py-4">
                  <CardTitle className="text-xl flex items-center justify-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Service Area
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-5 pb-5">
                  <p className="font-bold text-lg mb-2 text-center">Greater Metro Area</p>
                  <p className="text-muted-foreground text-sm mb-4 text-center">
                    Serving a 50-mile radius with fast response times
                  </p>
                  <Button variant="outline" className="w-full border-yellow-400 text-blue-900 hover:bg-yellow-50">
                    View Coverage Map
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl">Request a Quote</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you shortly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <Input placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <Input placeholder="Your phone number" type="tel" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input placeholder="Your email" type="email" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Service Needed</label>
                    <Input placeholder="e.g., Towing, Battery Jump, Tire Change" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <Textarea placeholder="Tell us about your situation..." rows={4} />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                    Submit Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Decorative separator before footer */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900"></div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white py-12 relative border-t-2 border-blue-700/50">
        {/* Decorative top accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>

        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Momentum Towing</h3>
              <p className="text-blue-200">
                Your trusted partner for roadside assistance and towing services.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#services" className="hover:text-yellow-400 transition-colors">Services</a></li>
                <li><a href="#reviews" className="hover:text-yellow-400 transition-colors">Reviews</a></li>
                <li><a href="#about" className="hover:text-yellow-400 transition-colors">About Us</a></li>
                <li><a href="#contact" className="hover:text-yellow-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-blue-200">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  (555) 123-4567
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Metro Area, State
                </li>
                <li>Available 24/7</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-800 pt-8 text-center text-blue-200">
            <p>&copy; 2024 Momentum Towing & Roadside Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
