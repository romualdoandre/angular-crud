import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  product: Product;
  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {
    this.product = { id: 0, name: '', price: 0 }
    
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.readById(Number(id)).subscribe(
      product => {
        this.product = product
      }
    )
  }

  deleteProduct(): void {
    if(this.product && this.product.id)
      this.productService.delete(this.product.id).subscribe(()=>{
        this.productService.showMessage("Produto excluído com sucesso!");
        this.router.navigate(["/products"]);
      })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
