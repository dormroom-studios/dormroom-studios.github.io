import { defineStore } from 'pinia'

export const useGamesStore = defineStore('games', {
  state: () => ({
    games: [
      {
        id: 1,
        title: "The Last Adventurer",
        description: "A First Person Cinematic, Story Driven Experience. You play as a lonely adventurer in a post apocalyptic world, trying to find a companion. Find your purpose as the Last Man on Earth. Walk through beautiful post apocalyptic landscapes, camp in dark rainforest, climb high mountains, Glide across massive canyons, Fight your way through hordes of zombies.",
        shortDescription: "A First Person Cinematic, Story Driven Experience in a post apocalyptic world.",
        coverImage: "/last-adventurer-1.jpg",
        screenshots: [
          "/last-adventurer-1.jpg",
          "/last-adventurer-2.jpg",
          "/last-adventurer-3.jpg",
          "/last-adventurer-4.jpg",
          "/last-adventurer-5.jpg",
          "/last-adventurer-6.jpg",
          "/last-adventurer-7.jpg",
          "/last-adventurer-8.jpg"
        ],
        platforms: ["Android"],
        releaseDate: "2024-01-01",
        featured: true,
        playLink: "https://play.google.com/store/apps/details?id=com.dormRoom.TheLastAdventurer",
        trailerUrl: "https://youtu.be/IFyvO7Flih4",
        features: [
          "Beautiful Visuals",
          "Immersive soundtracks",
          "Engaging Storyline",
          "Relaxing Gameplay",
          "Post-apocalyptic exploration",
          "First-person cinematic experience"
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
        .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
        .slice(0, limit)
    },
    
    getGameById: (state) => (id) => {
      return state.games.find(game => game.id === parseInt(id))
    }
  }
})