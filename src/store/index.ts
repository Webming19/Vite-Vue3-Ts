import { defineStore } from 'pinia'

export const definedStore = defineStore({
  // 不同仓库使用id区分
  id: 'helloWord',
  state: () => ({
    defName: 'xxxxxxx',
  }),
  getters: {
    nameLength: state => state.defName.length
  },
  actions: {
    async defNameGo(){
      console.log('xxx==>')
    }
  },
})