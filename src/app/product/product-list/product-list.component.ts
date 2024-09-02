import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/product';
import { CartService } from '../../cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products:Product[] = [];
  filteredProduct: Product[] = [];
  sortOrder: string = '';

  constructor(private productService: ProductService, private cartService: CartService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data =>{
      this.products = data;
      this.filteredProduct = data

    })

  }

addToCart(product: Product){this.cartService.addToCart(product).subscribe({
  next: () => {
this.snackBar.open("Product added to cart!", "", {
  duration: 2000,
  horizontalPosition: 'right',
  verticalPosition:'top'
})
  }
});
}

applyFilter(event: Event): void{
  let searchTerm = (event.target as HTMLInputElement).value;
  searchTerm = searchTerm.toLowerCase()

  this.filteredProduct = this.products.filter(
    product => product.name.toLowerCase().includes(searchTerm));

    this.sortProduct(this.sortOrder)

}

sortProduct(sortValue: string){
  this.sortOrder = sortValue;

  if(this.sortOrder === 'priceLowHigh'){
    this.filteredProduct.sort((a,b) => a.price - b.price)
  }else if (this.sortOrder === 'priceHighLow') {
    this.filteredProduct.sort((a,b) => b.price - a.price)
  }

}

}
