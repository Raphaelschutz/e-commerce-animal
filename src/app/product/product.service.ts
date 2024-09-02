// Importation des modules nécessaires depuis Angular et d'autres fichiers
import { Injectable } from '@angular/core'; // Ce module permet d'utiliser le décorateur @Injectable pour rendre ce service injectable dans d'autres parties de l'application
import { environment } from '../../environments/environment'; // Importation des variables d'environnement, qui peuvent inclure l'URL de base de l'API
import { HttpClient } from '@angular/common/http'; // Importation du module HttpClient pour effectuer des requêtes HTTP
import { Observable } from 'rxjs'; // Importation d'Observable pour gérer les opérations asynchrones
import { Product } from '../models/product'; // Importation du modèle Product qui représente la structure d'un produit

// Le décorateur @Injectable indique qu'Angular peut injecter ce service dans d'autres composants ou services
@Injectable({
  providedIn: 'root' // 'providedIn: root' signifie que le service est disponible dans toute l'application (singleton)
})
export class ProductService {

  // Définition d'une propriété privée qui contient l'URL de l'API pour récupérer les produits
  private apiUrl = environment.apiUrl + "/products";

  // Le constructeur injecte une instance de HttpClient, qui est utilisée pour faire des requêtes HTTP
  constructor(private http: HttpClient) { }

  // Méthode pour récupérer les produits depuis l'API
  getProducts(): Observable<Product[]> {
    // Cette méthode retourne un Observable qui émet un tableau de produits
    // Elle envoie une requête GET à l'URL de l'API des produits
    return this.http.get<Product[]>(this.apiUrl);
  }
}
