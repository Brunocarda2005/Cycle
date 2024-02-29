import { Injectable } from "@angular/core";
import { Product } from "../domain/product";

@Injectable()
export class ProductService {
  products: Product[] = []; // Lista de productos
  newProduct: Product[] = []; // Lista de productos
  active: boolean = false;

  constructor() {}

  async GetProductsByAPI() {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products?limit=15"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      this.products = await response.json(); // Almacena la lista de productos
      return this.products;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  async getProducts() {
    try {
      return await this.GetProductsByAPI();
    } catch (error) {
      console.error("Error getting products:", error);
      throw error;
    }
  }
}
