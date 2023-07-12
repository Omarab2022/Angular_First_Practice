import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../model/product.model';
import { Route, Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})


export class ProductComponent implements OnInit {


  constructor(private productsService:ProductService , private router: Router , public appstate : AppStateService) {
 
  }




  getsearchprosuct()
  {
   /* this.appstate.setProductState({
      status : "LOADING",
    });*/
    this.productsService.getsearchprosuct(this.appstate.productsState.keyword ,this.appstate.productsState.currentpage , this.appstate.productsState.pagesize)
    .subscribe({
      next : (resp) => {
        let products  = resp.body as product[];
        let totalProducts:number =parseInt(resp.headers.get('x-total-count')!);
        //this.appstate.productsState.totalProducts= totalProducts;
        let totalPages=

        this.appstate.productsState.totalPages= Math.floor(totalProducts /this.appstate.productsState.pagesize);
        if(totalProducts % this.appstate.productsState.pagesize != 0){
          ++totalPages ;

        }
        this.appstate.setProductState({

          products : products ,
          totalProducts : totalProducts ,
          totalPages : totalPages,
          status : "LOADED"


        })
      },
      error: err =>{
        this.appstate.setProductState({
          status : "ERROR",
          errormessage : "error",
        })
      }
    
  })
}

ngOnInit(): void {
  this.getsearchprosuct();
}

    /** check */

  handleCheckProduct(product: product) {
    this.productsService.checkProduct(product).subscribe({
      next(updatedproduct) {
        product.checked = !product.checked;
      },
    })
   
  }

    /* supprimer*/ 

  handleDelete(product: product) {
  if(confirm ("tu es sure"))
    this.productsService.deleteProduct(product).subscribe({
     next  : value => {
     // this.appstate.productsState.products= this.appstate.productsState.products.filter((p:any) => p.id !=product.id);

     this.getsearchprosuct();
     }
    })
   
    }
    

      handlegotopage(page: number) {
        this.appstate.productsState.currentpage=page;
        this.getsearchprosuct();

        }


        handleEdit(product: product) {
          this.router.navigateByUrl(`/editproduct/${product.id}`)
 

         
          }
          
      
}
