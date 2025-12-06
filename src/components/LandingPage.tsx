import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ServicesCarousel } from "./ServicesCarousel";
import { FeaturesCarousel } from "./FeaturesCarousel";
import {
  Truck,
  Phone,
  CheckCircle,
  Clock,
  MapPin,
  Shield,
  Star
} from "lucide-react";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Centered Professional Design with Animations */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl" />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}} />

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
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
                <span className="inline-block animate-fadeIn" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>Momentum Towing</span><br />
                <span className="inline-block text-yellow-400 animate-fadeIn" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>& Roadside Services</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed animate-fadeIn" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
                Professional towing and roadside assistance when you need it most. Fast response, reliable service, competitive rates.
              </p>
            </div>

            {/* Truck Icon - Centered & Appropriately Sized with Animation */}
            <div className="flex justify-center py-8 animate-fadeIn" style={{ animationDelay: '0.9s', animationFillMode: 'both' }}>
              <div className="relative inline-block">
                {/* Subtle Glow Behind Icon */}
                <div className="absolute inset-0 bg-yellow-400/30 rounded-3xl blur-2xl scale-110 animate-pulse" />

                {/* Icon Container */}
                <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-3xl p-10 shadow-2xl hover:scale-105 transition-transform duration-300">
                  <Truck className="w-32 h-32 text-blue-900" strokeWidth={2} />
                </div>

                {/* Small 24/7 Badge */}
                <div className="absolute -top-3 -right-3 bg-blue-600 text-white rounded-xl px-4 py-2 shadow-xl border-2 border-white animate-pulse">
                  <div className="text-xs font-bold">24/7</div>
                </div>
              </div>
            </div>

            {/* Stats - Centered with Synchronized Animation */}
            <div className="flex justify-center gap-12 py-6 animate-fadeIn" style={{ animationDelay: '1.1s', animationFillMode: 'both' }}>
              <div className="text-center">
                <div className="text-4xl font-black text-yellow-400">24/7</div>
                <div className="text-sm text-blue-200 mt-1">Availability</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-yellow-400">&lt;30min</div>
                <div className="text-sm text-blue-200 mt-1">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-yellow-400">50mi</div>
                <div className="text-sm text-blue-200 mt-1">Service Area</div>
              </div>
            </div>

            {/* CTA Buttons - Centered with Animation */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 animate-fadeIn" style={{ animationDelay: '1.3s', animationFillMode: 'both' }}>
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

            {/* Trust Indicators - Centered with Animation */}
            <div className="flex justify-center gap-8 pt-8 pb-4 animate-fadeIn" style={{ animationDelay: '1.5s', animationFillMode: 'both' }}>
              <div className="flex items-center gap-2 text-sm hover:scale-110 transition-transform duration-300">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-blue-100">Fully Insured</span>
              </div>
              <div className="flex items-center gap-2 text-sm hover:scale-110 transition-transform duration-300">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-blue-100">5-Star Rated</span>
              </div>
              <div className="flex items-center gap-2 text-sm hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-blue-100">Licensed & Certified</span>
              </div>
            </div>

          </div>
        </div>

        {/* Clean Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,40L60,45C120,50,240,60,360,60C480,60,600,50,720,45C840,40,960,40,1080,45C1200,50,1320,60,1380,65L1440,70L1440,80L0,80Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Complete roadside assistance solutions to get you back on the road quickly
            </p>
          </div>

          <ServicesCarousel />
        </div>
      </section>

      {/* Features and Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900">Why Choose Momentum?</h2>
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
      </section>

      {/* Contact/CTA Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900">Get in Touch</h2>
              <p className="text-xl text-muted-foreground">
                Need immediate assistance or have questions? We're here to help!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-2 border-blue-600">
                <CardHeader className="bg-blue-600 text-white">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Phone className="w-6 h-6" />
                    Emergency Hotline
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-3xl font-bold text-blue-900 mb-2">(555) 123-4567</p>
                  <p className="text-muted-foreground">Available 24 hours a day, 7 days a week</p>
                  <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700">
                    Call Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-yellow-400">
                <CardHeader className="bg-yellow-400 text-blue-900">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <MapPin className="w-6 h-6" />
                    Service Area
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="font-bold text-lg mb-2">Greater Metro Area</p>
                  <p className="text-muted-foreground mb-4">
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
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
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
                <li><a href="#about" className="hover:text-yellow-400 transition-colors">About Us</a></li>
                <li><a href="#contact" className="hover:text-yellow-400 transition-colors">Contact</a></li>
                <li><a href="#pricing" className="hover:text-yellow-400 transition-colors">Pricing</a></li>
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
