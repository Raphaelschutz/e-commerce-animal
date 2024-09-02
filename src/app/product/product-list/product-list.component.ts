// Importation des modules nécessaires
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service'; // Service pour récupérer les produits
import { Product } from '../../models/product'; // Modèle représentant un produit
import { CartService } from '../../cart/cart.service'; // Service pour gérer le panier
import { MatSnackBar } from '@angular/material/snack-bar'; // Service pour afficher des notifications à l'utilisateur

@Component({
  selector: 'app-product-list', // Sélecteur du composant, utilisé dans le HTML pour insérer ce composant
  templateUrl: './product-list.component.html', // Chemin du template HTML associé à ce composant
  styleUrl: './product-list.component.css' // Chemin du fichier CSS associé à ce composant
})
export class ProductListComponent implements OnInit {

  // Propriétés du composant
  products: Product[] = []; // Liste de tous les produits
  filteredProduct: Product[] = []; // Liste des produits filtrés à afficher
  sortOrder: string = ''; // Ordre de tri actuel

  // Le constructeur injecte les services nécessaires
  constructor(private productService: ProductService,
              private cartService: CartService,
              private snackBar: MatSnackBar) {}

  // Méthode appelée automatiquement lors de l'initialisation du composant
  ngOnInit(): void {
    // Récupère les produits depuis le service et les assigne aux propriétés products et filteredProduct
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProduct = data;
    });
  }

  // Méthode pour ajouter un produit au panier
  addToCart(product: Product): void {
    this.cartService.addToCart(product).subscribe({
      next: () => {
        // Affiche une notification (snack bar) indiquant que le produit a été ajouté au panier
        this.snackBar.open("Product added to cart!", "", {
          duration: 2000, // Durée de la notification en millisecondes
          horizontalPosition: 'right', // Position horizontale de la notification
          verticalPosition: 'top' // Position verticale de la notification
        });
      }
    });
  }

  // Méthode pour filtrer les produits en fonction de la recherche
  applyFilter(event: Event): void {
    let searchTerm = (event.target as HTMLInputElement).value; // Récupère le terme de recherche
    searchTerm = searchTerm.toLowerCase(); // Convertit le terme de recherche en minuscules

    // Filtre les produits en fonction du nom
    this.filteredProduct = this.products.filter(
      product => product.name.toLowerCase().includes(searchTerm)
    );

    // Trie les produits filtrés selon l'ordre de tri actuel
    this.sortProduct(this.sortOrder);
  }

  // Méthode pour trier les produits
  sortProduct(sortValue: string): void {
    this.sortOrder = sortValue; // Met à jour l'ordre de tri

    // Trie les produits filtrés selon le critère sélectionné
    if (this.sortOrder === 'priceLowHigh') {
      this.filteredProduct.sort((a, b) => a.price - b.price); // Tri par prix croissant
    } else if (this.sortOrder === 'priceHighLow') {
      this.filteredProduct.sort((a, b) => b.price - a.price); // Tri par prix décroissant
    }
  }
}
