import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user-store",
  state: () => ({
    name: "ming",
    age: 18,
    password: "123",
  }),
  getters: {
    nameLength(): number {
      return this.name.length;
    },
  },
  actions: {},
  persist: {
    key: "name-key",
    storage: sessionStorage,
    paths: ["name", "age"],
    // overwrite: true,
    beforeRestore: (context) => {
      console.log("Before hydration...");
    },
    afterRestore: (context) => {
      console.log("After hydration...");
    },
  },
});
