import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { product } from '../model/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{


  productid! : number;
  productformgroup! : FormGroup ;

  constructor( private activatedroute : ActivatedRoute , private productservice: ProductService , 
    private fb: FormBuilder){


  }


  ngOnInit(): void {
    this.productid = this.activatedroute.snapshot.params['id'];
    this.productservice.getproductbyID(this.productid).subscribe({
      next : (product) => {
        this.productformgroup= this.fb.group({
          id : this.fb.control(product.id , Validators.required),
          name : this.fb.control(product.name ,Validators.required),
          price : this.fb.control(product.price , Validators.required),
          checked : this.fb.control(product.checked , Validators.required),

        })


      },
      error : err =>{
        console.log(err);
      }

    });
  }

  updateProduct() {

    let product :product = this.productformgroup.value ;

   
    this.productservice.updateProduct(product).subscribe({
      next : data =>{
        alert(JSON.stringify(data));
      }
    })
    }

}
