import queue from '@/JSON/queue.json'
import store from '@/JSON/stores.json'
// import credits from '@/JSON/credits.json'
const credits = window.localStorage.getItem('credits')
const favorites = window.localStorage.getItem('favorites')

export const state = () => ({
  loading: true,
  profileDialog: false,
  queues: queue,
  stores: store,
  qrCode: null,
  credits: credits ? JSON.parse(credits) : [],
  favorites: favorites ? JSON.parse(favorites) : [],
})

export const mutations = {
  setLoading(state, load) {
    state.loading = load
  },
  setProfileDialog(state, dialog) {
    state.profileDialog = dialog
  },
  addStore(state, store) {
    state.stores.push(store)
  },
  setQRcode(state, qr) {
    state.qrCode = qr
  },
  setCredits(state, credits) {
    state.credits = credits
  },
  addCredits(state, credits) {
    state.credits.push(credits)
    window.localStorage.setItem('credits', JSON.stringify(state.credits))
  },
  removeCredits(state, credits) {
    state.credits.splice(credits, 1)
    window.localStorage.setItem('credits', JSON.stringify(state.credits))
  },
  setFavorites(state, favorites) {
    state.favorites = favorites
  },
  addFavorites(state, store) {
    const newFav = {
      id: store.id,
      name: store.name,
      description: store.description,
      logoImg: store.logoImg,
      bgImg: store.bgImg,
    }
    state.favorites.push(newFav)
    window.localStorage.setItem('favorites', JSON.stringify(state.favorites))
  },
  removeFavorites(state, store) {
    const index = state.favorites.findIndex((fav) => fav.id === store.id)
    state.favorites.splice(index, 1)
    window.localStorage.setItem('favorites', JSON.stringify(state.favorites))
  },
}

export const actions = {}

export const getters = {}
