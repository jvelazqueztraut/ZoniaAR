// Artist data structure for Zonia AR Experience
export interface Artist {
  id: string;
  name: string;
  genre: string;
  image: string;
  audio: string;
  bio: string;
  color: string; // Brand color for the artist
}

export const artists: Artist[] = [
  {
    id: "nova-beats",
    name: "Nova Beats",
    genre: "Electronic",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    audio: "", // To be provided by user with real Zonia artist audio
    bio: "Nova Beats creates ethereal electronic soundscapes that transport listeners to otherworldly dimensions. Known for innovative use of synthesizers and ambient textures.",
    color: "#1DB954"
  },
  {
    id: "street-sage",
    name: "Street Sage",
    genre: "Hip Hop",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    audio: "", // To be provided by user with real Zonia artist audio
    bio: "Street Sage brings raw authenticity to hip hop with thought-provoking lyrics and innovative beats that reflect urban experiences and social commentary.",
    color: "#FF6B35"
  },
  {
    id: "lunar-echo",
    name: "Lunar Echo",
    genre: "Indie Rock",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    audio: "", // To be provided by user with real Zonia artist audio
    bio: "Lunar Echo crafts dreamy indie rock anthems with atmospheric guitars and haunting vocals that capture the essence of midnight adventures.",
    color: "#6366F1"
  },
  {
    id: "jazz-fusion",
    name: "Jazz Fusion Collective",
    genre: "Jazz",
    image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    audio: "", // To be provided by user with real Zonia artist audio
    bio: "Jazz Fusion Collective blends traditional jazz with modern elements, creating sophisticated compositions that push the boundaries of the genre.",
    color: "#F59E0B"
  }
];