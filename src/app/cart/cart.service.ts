// Importation des modules nécessaires depuis Angular et d'autres fichiers
import { Injectable } from '@angular/core'; // Ce module permet d'utiliser le décorateur @Injectable pour rendre ce service injectable dans d'autres parties de l'application
import { environment } from '../../environments/environment'; // Importation des variables d'environnement (par exemple, l'URL de l'API)
import { HttpClient } from '@angular/common/http'; // Importation du module HttpClient pour effectuer des requêtes HTTP
import { Product } from '../models/product'; // Importation du modèle Product qui représente la structure d'un produit
import { Observable } from 'rxjs'; // Importation d'Observable pour gérer les opérations asynchrones

// Le décorateur @Injectable indique qu'Angular peut injecter ce service dans d'autres composants ou services
@Injectable({
  providedIn: 'root' // 'providedIn: root' signifie que le service est disponible dans toute l'application (singleton)
})
export class CartService {

  // Définition de deux propriétés privées qui stockent les URLs de l'API pour le panier et le paiement
  private apiCartUrl = environment.apiUrl + "/cart";
  private apiCheckoutUrl = environment.apiUrl + "/checkout";

  // Le constructeur injecte une instance de HttpClient, qui est utilisée pour faire des requêtes HTTP
  constructor(private http: HttpClient) { }

  // Méthode pour ajouter un produit au panier
  // Elle envoie une requête POST à l'URL de l'API du panier avec les détails du produit
  addToCart(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiCartUrl, product);
  }

  // Méthode pour obtenir tous les produits du panier
  // Elle envoie une requête GET pour récupérer les éléments du panier sous forme de tableau de produits
  getCartItem(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiCartUrl);
  }

  // Méthode pour vider le panier
  // Elle envoie une requête DELETE pour supprimer tous les éléments du panier
  clearCart(): Observable<void> {
    return this.http.delete<void>(this.apiCartUrl);
  }

  // Méthode pour passer la commande (checkout)
  // Elle envoie une requête POST à l'URL de l'API de checkout avec la liste des produits à commander
  checkout(products: Product[]): Observable<void> {
    return this.http.post<void>(this.apiCheckoutUrl, products);
  }
}
