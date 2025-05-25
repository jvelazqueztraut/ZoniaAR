import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Music, 
  Play, 
  ArrowRight, 
  Smartphone, 
  Box, 
  Headphones,
  ExternalLink
} from "lucide-react";

export default function Landing() {
  const [, setLocation] = useLocation();

  const handleEnterExperience = () => {
    setLocation('/experience');
  };

  return (
    <div className="landing-container gradient-bg text-white">
      {/* Header */}
      <nav className="landing-header">
        <div className="landing-logo-container">
          <div className="landing-logo">
            <div className="landing-logo-icon">
              <Music className="text-white" size={20} />
            </div>
            <span className="landing-logo-text gradient-text">Zonia</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="landing-main">
        <div className="landing-content">
          
          {/* Floating AR Icons */}
          <div className="landing-icons-container">
            <div className="landing-floating-icon landing-floating-icon-1 animate-float ar-glow">
              <Box className="text-purple-400" size={20} />
            </div>
            <div className="landing-floating-icon landing-floating-icon-2 animate-float-delay-2 ar-glow">
              <Headphones className="text-orange-400" size={16} />
            </div>
            <div className="landing-floating-icon landing-floating-icon-3 animate-float-delay-4 ar-glow">
              <Play className="text-green-400" size={12} />
            </div>
            
            {/* Hero Image */}
            <div className="landing-hero-image">
              <img 
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
                alt="AR Music Interface" 
                className="landing-hero-img animate-pulse-glow"
              />
              <div className="landing-hero-overlay"></div>
            </div>
          </div>

          {/* Hero Text */}
          <div className="landing-text-content animate-fade-in">
            <h1 className="landing-title">
              Experience Music in{" "}
              <span className="gradient-text">Augmented Reality</span>
            </h1>
            
            <p className="landing-description">
              Step into Zonia's immersive AR world where music comes alive. 
              Discover artists, explore virtual concerts, and interact with music like never before.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="landing-cta-container animate-slide-up">
            <button 
              onClick={handleEnterExperience}
              className="landing-main-button animate-pulse-glow"
            >
              <Play size={20} />
              <span>Enter AR Experience</span>
              <ArrowRight size={20} />
            </button>
            
            <a 
              href="https://zoniamusic.com"
              className="landing-secondary-link"
            >
              <ExternalLink size={16} />
              <span>Learn More on ZoniaMusic.com</span>
            </a>
            
            <p className="landing-mobile-note">
              <Smartphone size={16} />
              <span>Best experienced on mobile devices</span>
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
