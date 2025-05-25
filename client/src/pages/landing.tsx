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
    <div className="h-screen gradient-bg text-white overflow-hidden flex flex-col">
      {/* Header */}
      <nav className="p-6">
        <div className="max-w-lg mx-auto flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Music className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold gradient-text">Zonia</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-lg mx-auto text-center">
          
          {/* Floating AR Icons */}
          <div className="relative mb-8">
            <div className="absolute top-0 left-1/4 animate-float">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center ar-glow">
                <Box className="text-purple-400" size={20} />
              </div>
            </div>
            <div className="absolute top-0 right-1/4 animate-float-delay-2">
              <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center ar-glow">
                <Headphones className="text-orange-400" size={16} />
              </div>
            </div>
            <div className="absolute top-12 left-1/3 animate-float-delay-4">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center ar-glow">
                <Play className="text-green-400" size={12} />
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="w-32 h-32 mx-auto mb-8 relative">
              <img 
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
                alt="AR Music Interface" 
                className="w-full h-full object-cover rounded-3xl shadow-2xl animate-pulse-glow"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
            </div>
          </div>

          {/* Hero Text */}
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl font-bold leading-tight">
              Experience Music in{" "}
              <span className="gradient-text">Augmented Reality</span>
            </h1>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              Step into Zonia's immersive AR world where music comes alive. 
              Discover artists, explore virtual concerts, and interact with music like never before.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 space-y-4 animate-slide-up">
            <Button 
              onClick={handleEnterExperience}
              className="w-full bg-gradient-to-r from-green-500 to-orange-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 animate-pulse-glow h-auto"
            >
              <Play size={20} />
              <span className="text-lg">Enter AR Experience</span>
              <ArrowRight size={20} />
            </Button>
            
            <a 
              href="https://zoniamusic.com"
              className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              <ExternalLink size={16} />
              <span>Learn More on ZoniaMusic.com</span>
            </a>
            
            <p className="text-gray-400 text-sm mt-4 flex items-center justify-center">
              <Smartphone className="mr-2" size={16} />
              Best experienced on mobile devices
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
