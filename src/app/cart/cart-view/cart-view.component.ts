import { Component, OnInit } from '@angular/core'; // Importation des modules nécessaires d'Angular
import { CartService } from '../cart.service'; // Importation du service CartService qui gère les opérations liées au panier
import { Product } from '../../models/product'; // Importation du modèle Product pour typer les objets produits

@Component({
  selector: 'app-cart-view', // Sélecteur du composant utilisé dans le template HTML
  templateUrl: './cart-view.component.html', // Lien vers le template HTML du composant
  styleUrl: './cart-view.component.css' // Lien vers le fichier de style CSS du composant
})
export class CartViewComponent implements OnInit { // Déclaration de la classe CartViewComponent, qui implémente OnInit pour gérer les actions au moment de l'initialisation du composant

  cartItems: Product[] = []; // Propriété pour stocker les éléments du panier, typée comme un tableau de produits
  totalPrice: number = 0; // Propriété pour stocker le prix total des articles dans le panier

  constructor(private cartService: CartService){} // Le constructeur injecte le service CartService pour accéder aux méthodes liées au panier

  ngOnInit(): void {
    // Méthode appelée automatiquement à l'initialisation du composant (lorsque la vue est chargée)
    this.cartService.getCartItem().subscribe(date => {
      // Appel de la méthode getCartItem() du service CartService pour récupérer les éléments du panier
      // La méthode subscribe() est utilisée pour gérer l'observable retourné par le service et mettre à jour les propriétés du composant
      this.cartItems = date; // Les éléments du panier sont assignés à la propriété cartItems
      this.totalPrice = this.getTotalPrice(); // Calcul du prix total des articles dans le panier en appelant la méthode getTotalPrice()
    });
  }

  getTotalPrice(): number {
    // Méthode pour calculer le prix total des articles dans le panier
    let total = 0; // Variable locale pour stocker le total
    for (let item of this.cartItems) {
      // Boucle sur chaque élément du panier
      total += item.price; // Ajout du prix de chaque élément au total
    }
    return total; // Retourne le prix total calculé
  }

  clearCart(): void {
    // Méthode pour vider le panier
    this.cartService.clearCart().subscribe();
    // Appel de la méthode clearCart() du service CartService, qui envoie une requête pour vider le panier
    // La méthode subscribe() est appelée pour s'assurer que la requête est exécutée
  }

  checkout(): void {
    // Méthode pour procéder au paiement des articles dans le panier
    this.cartService.checkout(this.cartItems).subscribe();
    // Appel de la méthode checkout() du service CartService avec les éléments du panier en paramètre
    // La méthode subscribe() est utilisée pour exécuter la requête de paiement
  }
}
