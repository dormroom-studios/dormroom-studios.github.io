import { defineStore } from 'pinia'

export const useGamesStore = defineStore('games', {
  state: () => ({
    games: [
      {
        id: 1,
        title: "Echoes of Yesterday",
        description: "Embark on an epic journey through space and time. Cosmic Odyssey is a grand space exploration game where players navigate the far reaches of the galaxy, discovering new planets, encountering mysterious alien species, and unraveling the secrets of the universe. Featuring an expansive open world, deep character customization, and strategic ship combat.",
        shortDescription: "A haunting narrative-driven mystery unraveling a forgotten past.",
        coverImage: "https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        screenshots: [
          "https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          "https://images.pexels.com/photos/3056059/pexels-photo-3056059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          "https://images.pexels.com/photos/176851/pexels-photo-176851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        ],
        platforms: ["PC", "PlayStation 5", "Xbox Series X"],
        releaseDate: "2024-11-15",
        featured: true,
        features: [
          "Vast open universe with over 100 planets to explore",
          "Deep character progression system",
          "Strategic ship combat and customization",
          "Compelling narrative with branching storylines",
          "Dynamic economy and trading system"
        ]
      },
      {
        id: 2,
        title: "Neon Shadows",
        description: "Dive into a cyberpunk world of intrigue and danger. Neon Shadows is a fast-paced action RPG set in a dystopian future where corporations rule and technology has transformed humanity. Play as a skilled hacker navigating the neon-lit streets, taking on dangerous missions, and making choices that will shape the fate of the city.",
        shortDescription: "Navigate the dangerous streets of a cyberpunk dystopia as a skilled hacker.",
        coverImage: "https://images.pexels.com/photos/3358654/pexels-photo-3358654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        screenshots: [
          "https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          "https://images.pexels.com/photos/1634278/pexels-photo-1634278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          "https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        ],
        platforms: ["PC", "PlayStation 5", "Xbox Series X", "Nintendo Switch"],
        releaseDate: "2024-08-22",
        featured: false,
        features: [
          "Immersive cyberpunk world with stunning neon visuals",
          "Complex hacking system with real-time puzzle elements",
          "Fluid combat combining melee and ranged weapons",
          "Meaningful choices affecting story outcomes",
          "Extensive character augmentation system"
        ]
      },
      {
        id: 3,
        title: "Mythic Legends",
        description: "Step into a world of magic and ancient mythology. Mythic Legends is a tactical RPG where players command a party of heroes inspired by mythologies from around the world. Engage in turn-based combat, solve intricate puzzles, and uncover the truth behind an ancient prophecy that threatens to bring about the end of days.",
        shortDescription: "Command legendary heroes in a tactical RPG inspired by world mythologies.",
        coverImage: "https://images.pexels.com/photos/3329822/pexels-photo-3329822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        screenshots: [
          "https://images.pexels.com/photos/5865634/pexels-photo-5865634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          "https://images.pexels.com/photos/4348078/pexels-photo-4348078.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          "https://images.pexels.com/photos/3685271/pexels-photo-3685271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        ],
        platforms: ["PC", "PlayStation 5", "Xbox Series X", "Mobile"],
        releaseDate: "2025-01-30",
        featured: false,
        features: [
          "Deep tactical combat system with unique character abilities",
          "Over 50 heroes inspired by world mythologies",
          "Rich narrative woven with historical and mythological elements",
          "Challenging puzzles that test strategy and knowledge",
          "Cross-platform multiplayer battles"
        ]
      },
      {
        id: 4,
        title: "Velocity Rush",
        description: "Feel the adrenaline in this futuristic racing game. Velocity Rush combines high-speed racing with combat elements in a world where traditional sports have been replaced by dangerous, weaponized races. Customize your vehicle, master treacherous tracks, and outmaneuver opponents to become the champion of the Velocity Circuit.",
        shortDescription: "Race at breakneck speeds in futuristic vehicles equipped with weapons.",
        coverImage: "https://images.pexels.com/photos/4975361/pexels-photo-4975361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        screenshots: [
          "https://images.pexels.com/photos/2127039/pexels-photo-2127039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          "https://images.pexels.com/photos/3894818/pexels-photo-3894818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          "https://images.pexels.com/photos/5486791/pexels-photo-5486791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        ],
        platforms: ["PC", "PlayStation 5", "Xbox Series X"],
        releaseDate: "2024-09-10",
        featured: false,
        features: [
          "Ultra-responsive racing mechanics with realistic physics",
          "Extensive vehicle customization with performance impacts",
          "Dynamic tracks that change during races",
          "Competitive online multiplayer with seasonal tournaments",
          "Destructible environments affected by weapons and crashes"
        ]
      }
    ]
  }),
  
  getters: {
    getAllGames() {
      return this.games
    },
    
    getFeaturedGame() {
      return this.games.find(game => game.featured) || this.games[0]
    },
    
    getLatestGames: (state) => (limit = 3) => {
      return state.games
        .filter(game => !game.featured)
        .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
        .slice(0, limit)
    },
    
    getGameById: (state) => (id) => {
      return state.games.find(game => game.id === parseInt(id))
    }
  }
})