import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  public productsState :any ={
    products:[],
    keyword : "",
    totalPages:3,
    pagesize:3,
    currentpage :1,
    totalProducts : 0,
    status : "",
    errormessage : " " ,
   
  }
  constructor() { }


  public setProductState ( state : any ) : void{
    this.productsState = {...this.productsState , ...state} ;

  }
}
