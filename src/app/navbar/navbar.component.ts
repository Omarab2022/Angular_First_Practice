import { Component } from '@angular/core';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  actions : Array<any> =[
    { title:"home" , "route" :"/home" , icon : "house"},
    { title:"product" , "route" :"/product" , icon : "search"},
    { title:"newproduct" , "route" :"/newproduct" , icon : "safe"}
   ]
  
   currentaction : any;
  
   constructor( public appastat : AppStateService , ){

   }


   setCurrentAction(action:any){
    this.currentaction = action;
   }
}
