import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ServicesCarousel } from "./ServicesCarousel";
import { FeaturesCarousel } from "./FeaturesCarousel";
import { ReviewsCarousel } from "./ReviewsCarousel";
import { ImageGallery } from "./ImageGallery";
import {
  Truck,
  Phone,
  CheckCircle,
  Clock,
  MapPin,
  Shield,
  Star,
  Mail
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
          {/* IMAGE MODE: Zoom in/out slideshow */}
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

          {/* VIDEO MODE: Looping video background */}
          {backgroundMode === 'video' && heroVideos.length > 0 && (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
              ref={(el) => {
                if (el) {
                  // Add webkit-specific attributes for Safari/iOS
                  el.setAttribute('webkit-playsinline', 'true');
                  el.setAttribute('x5-playsinline', 'true');
                  // Force play on Safari/iOS - handles autoplay restrictions
                  const playPromise = el.play();
                  if (playPromise !== undefined) {
                    playPromise.catch(() => {
                      // Autoplay was prevented, try again on user interaction
                      const playOnInteraction = () => {
                        el.play();
                        document.removeEventListener('touchstart', playOnInteraction);
                        document.removeEventListener('click', playOnInteraction);
                      };
                      document.addEventListener('touchstart', playOnInteraction, { once: true });
                      document.addEventListener('click', playOnInteraction, { once: true });
                    });
                  }
                }
              }}
            >
              <source src={heroVideos[0]} type="video/mp4" />
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 animate-fadeIn w-full max-w-md mx-auto sm:max-w-none" style={{ animationDelay: '0.9s', animationFillMode: 'both' }}>
              <a href="tel:281-800-7676" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold text-lg px-10 py-7 rounded-lg shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300 hover:scale-105"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now: 281-800-7676
                </Button>
              </a>
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white text-blue-900 hover:bg-blue-50 font-bold text-lg px-10 py-7 rounded-lg shadow-xl transition-all duration-300 hover:scale-105"
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">Our Services</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete roadside assistance solutions to get you back on the road quickly
            </p>
          </div>

          <ServicesCarousel />
        </div>
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-slate-50/30 pointer-events-none"></div>
      </section>

      {/* Image Gallery Section */}
      <ImageGallery 
        title="Our Work" 
        subtitle="Browse through our gallery of completed jobs and satisfied customers"
      />

      {/* Customer Reviews Section */}
      <section id="reviews" className="py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">Customer Reviews</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">Why Choose Momentum?</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the fastest and most reliable roadside assistance
            </p>
          </div>

          <FeaturesCarousel />

          <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-blue-900">Our Commitment to You</h3>
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
      <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Get in Touch</h2>
              <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
              <p className="text-lg text-blue-200">
                Need immediate assistance or have questions? We're here to help!
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Google Map */}
              <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-700/50 mb-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55422.5!2d-95.45!3d29.76!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xbedd7f4db4ecbeb6!2s8100%20Washington%20Ave%2C%20Houston%2C%20TX%2077007!5e0!3m2!1sen!2sus!4v1705312800000!5m2!1sen!2sus"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                  className="w-full"
                />
              </div>

              {/* Contact Cards Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white/10 backdrop-blur-sm border-blue-700/50 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="pt-6 pb-6 text-center">
                    <div className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-7 h-7 text-blue-900" />
                    </div>
                    <p className="text-sm text-blue-300 mb-2">Call Us 24/7</p>
                    <a href="tel:281-800-7676" className="text-xl font-bold text-white hover:text-yellow-400 transition-colors">
                      281-800-7676
                    </a>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-blue-700/50 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="pt-6 pb-6 text-center">
                    <div className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-7 h-7 text-blue-900" />
                    </div>
                    <p className="text-sm text-blue-300 mb-2">Email Us</p>
                    <a href="mailto:metroroadsidetowing@gmail.com" className="text-sm font-bold text-white hover:text-yellow-400 transition-colors break-all">
                      metroroadsidetowing@gmail.com
                    </a>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-blue-700/50 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="pt-6 pb-6 text-center">
                    <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-sm text-blue-300 mb-2">Office Location</p>
                    <p className="text-white font-medium text-sm">
                      8100 Washington Ave<br />
                      Suite 150G<br />
                      Houston, TX 77007
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-blue-700/50 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="pt-6 pb-6 text-center">
                    <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-sm text-blue-300 mb-2">Hours</p>
                    <p className="text-white font-medium text-sm">
                      24 Hours a day<br />
                      7 Days a week<br />
                      <span className="text-yellow-400 font-bold">Always Available!</span>
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative separator before footer */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400/50 via-yellow-400 to-yellow-400/50"></div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 relative border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-blue-900">Momentum Towing</h3>
              <p className="text-gray-600">
                Your trusted partner for roadside assistance and towing services.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4 text-blue-900">Quick Links</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#services" className="hover:text-blue-600 transition-colors">Services</a></li>
                <li><a href="#gallery" className="hover:text-blue-600 transition-colors">Gallery</a></li>
                <li><a href="#reviews" className="hover:text-blue-600 transition-colors">Reviews</a></li>
                <li><a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4 text-blue-900">Contact Info</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <a href="tel:281-800-7676" className="hover:text-blue-600 transition-colors">281-800-7676</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <a href="mailto:metroroadsidetowing@gmail.com" className="hover:text-blue-600 transition-colors text-sm">metroroadsidetowing@gmail.com</a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-blue-600 mt-0.5" />
                  <span>8100 Washington Ave, Suite 150G<br />Houston, TX 77007</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Available 24/7
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Momentum Towing & Roadside Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
