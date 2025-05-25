import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Music, 
  Menu, 
  Play, 
  ArrowRight, 
  Smartphone, 
  Eye, 
  VolumeX, 
  Users, 
  Box, 
  Headphones,
  ExternalLink,
  InfoIcon
} from "lucide-react";

export default function Landing() {
  const [, setLocation] = useLocation();

  const handleEnterExperience = () => {
    // Check for camera support
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setLocation('/experience');
    } else {
      alert('AR not supported on this device. Please use a mobile device with camera access.');
    }
  };

  const artists = [
    {
      name: "Nova Beats",
      genre: "Electronic",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
      color: "bg-green-500"
    },
    {
      name: "Street Sage", 
      genre: "Hip Hop",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
      color: "bg-orange-500"
    },
    {
      name: "Lunar Echo",
      genre: "Indie Rock", 
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
      color: "bg-purple-500"
    },
    {
      name: "Jazz Fusion",
      genre: "Jazz",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
      color: "bg-green-500"
    }
  ];

  return (
    <div className="min-h-screen gradient-bg text-white overflow-x-hidden">
      {/* Navigation Header */}
      <nav className="relative z-10 p-6">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Music className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold gradient-text">Zonia</span>
          </div>
          <Button variant="ghost" size="icon" className="hover:bg-white/10">
            <Menu className="text-white" size={20} />
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 px-6 pt-8 pb-12">
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

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2">
                <Eye className="text-green-400" size={16} />
                <span className="text-sm">3D Visualization</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2">
                <VolumeX className="text-orange-400" size={16} />
                <span className="text-sm">Spatial Audio</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2">
                <Users className="text-purple-400" size={16} />
                <span className="text-sm">Artist Profiles</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-12 animate-slide-up">
            <Button 
              onClick={handleEnterExperience}
              className="w-full bg-gradient-to-r from-green-500 to-orange-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 animate-pulse-glow h-auto"
            >
              <Play size={20} />
              <span className="text-lg">Enter AR Experience</span>
              <ArrowRight size={20} />
            </Button>
            
            <p className="text-gray-400 text-sm mt-4 flex items-center justify-center">
              <Smartphone className="mr-2" size={16} />
              Best experienced on mobile devices
            </p>
          </div>

        </div>
      </main>

      {/* Artist Preview Section */}
      <section className="relative z-10 px-6 pb-12">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 gradient-text">Featured Artists</h2>
          
          {/* Artist Cards Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {artists.map((artist, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/10 hover:bg-white/20 transition-all duration-300 group">
                <CardContent className="p-4">
                  <img 
                    src={artist.image}
                    alt={`${artist.name} - ${artist.genre} Artist`}
                    className="w-full h-24 object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform"
                  />
                  <h3 className="font-semibold text-sm text-white">{artist.name}</h3>
                  <p className="text-gray-400 text-xs">{artist.genre}</p>
                  <div className="flex items-center mt-2">
                    <div className={`w-2 h-2 ${artist.color} rounded-full mr-2 music-wave`}></div>
                    <span className="text-xs text-gray-300">Live in AR</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-300 text-sm mb-4 flex items-center justify-center">
              <InfoIcon className="mr-2" size={16} />
              Walk around in AR to discover more artists and hear their music
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 pb-8">
        <div className="max-w-lg mx-auto text-center">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <ExternalLink className="text-white" size={16} />
                </div>
                <span className="font-semibold text-white">Discover More</span>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Explore the full Zonia music platform for unlimited streaming and artist discovery
              </p>
              <a 
                href="https://zoniamusic.com"
                className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                <span>Visit ZoniaMusic.com</span>
                <ArrowRight size={16} />
              </a>
            </CardContent>
          </Card>
        </div>
      </footer>
    </div>
  );
}
