import { Injectable, signal } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { Category } from '../../../core/models/category.model';

interface State {
  data: Category[],
  loading: boolean,
  error: string | null
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  state = signal<State>({
    data: [],
    loading: false,
    error: null
  });

  private async fetchProducts(): Promise<Product[]> {
    const path = "/assets/data/products.json";
    return await fetch(path).then(res => res.json());
  }

  private async fetchCategories(): Promise<Category[]> {
    const path = "/assets/data/categories.json";
    return await fetch(path).then(res => res.json()).then(categories => categories.map((category: Category) => {
      category.products = [];
      return category;
    }));
  }

  async loadMenu(): Promise<void> {
    this.state.set({ data: [], loading: true, error: null });

    try {
      const [categories, products] = await Promise.all([this.fetchCategories(), this.fetchProducts()]);

      products.forEach(product => {
        let data = categories.find(category => category.name === product.category);
        if (data) {
          data.products.push(product);
        } else {
          console.warn(`Category ${product.category} not found!`);
        }
      });

      this.state.set({ data: categories, loading: false, error: null });
    }catch (error: any) {
      this.state.set({ data: [], loading: false, error: error.message });
    }
  }
}
