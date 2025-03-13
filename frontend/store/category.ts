import { defineStore } from "pinia";
import { categoryService } from "~/utils/api.utils";

// Define the interface for a single category item
export interface Category {
    /**
     * @type {number}
     * @memberof Category
     */
    id: number;
    /**
     * @type {string}
     * @memberof Category
     */
    title: string;
    /**
     * @type {string}
     * @memberof Category
     */
    slug: string;
    /**
     * @type {string}
     * @memberof Category
     */
    icon: string;
}

// Define the API response type
export interface CategoryAllResponse {
    data: Category[];
}

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: [] as Category[], 
  }),

  actions: {
    async fetchCategories() {
      try {
        const response = await categoryService.categoryControllerFindAll();
        // If response is already the array of categories
        if (Array.isArray(response.data)) {
          this.categories = response.data;
          console.log("[SERVER] Categories:", JSON.stringify(this.categories, null, 2));
        } 
        // If response has a data property containing the array
        else if (response.data && Array.isArray(response.data)) {
          this.categories = response.data;
          console.log("[SERVER] Categories:", JSON.stringify(this.categories, null, 2));
        }
        // Fallback
        else {
          console.error("Unexpected API response format:", response);
          this.categories = [];
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        this.categories = [];
      }
    },
  },
});