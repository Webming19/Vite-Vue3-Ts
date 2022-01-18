import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user-store',
  state: () => ({
    name: 'ming',
    age: 18,
    password: '123',
  }),
  getters: {
    nameLength():number{
      return this.name.length
    }
  },
  actions: {},
})