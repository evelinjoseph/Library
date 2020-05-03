import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollectionGroup} from '@angular/fire/firestore';
import { firestore} from 'firebase/app';
import * as firebase from 'firebase/app';
import { UserService } from '../../user.service';



@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {

   /**
   * The name of the technology that will be displayed as the title for the accordion header
   * @public
   * @property name
   * @type {string}
   */
  @Input()
  bookHistory;

  

  buttonText: string = "Edit";
  name: string = "";
  email: string = "";
  password: string = "";

  /**
   * Determines and stores the accordion state (I.e. opened or closed)
   * @public
   * @property isMenuOpen
   * @type {boolean}
   */
  public isMenuOpen : boolean = false;
  public isMenuOpen2 : boolean = false;
  public isMenuOpen3 : boolean = false;
  public isRead: boolean = true;

  constructor(private afstore: AngularFirestore, private user: UserService) {

    const items = afstore.doc(`users/${this.user.getUID()}`)
    this.bookHistory= items.valueChanges();  

   }

  ngOnInit() {}

  
  /**
   * Allows the accordion state to be toggled (I.e. opened/closed)
   * @public
   * @method toggleAccordion
   * @returns {none}
   */
  public toggleAccordion() : void
  {
      this.isMenuOpen = !this.isMenuOpen;
      
  }

  public toggleAccordion2() : void
  {
      this.isMenuOpen2 = !this.isMenuOpen2;
  }

  public toggleAccordion3() : void
  {
      this.isMenuOpen3 = !this.isMenuOpen3;
  }

  isReadonly() {
    return this.isRead;   //return true/false 
  }




  public edit() : void
  {

    if(this.buttonText == 'Edit'){

      this.isRead = false;
      this.buttonText = "Save";


    }
    else{

      const { name} = this
      if(name.trim().length != 0){

        var user1 = firebase.auth().currentUser;

      try{

        this.afstore.doc(`users/${user1.uid}`).update({
          
          name
               
        })       
  
          
      }catch(error){
  
        console.dir(error)
      }
      

      }

      else{

       alert("Please enter a value for name");
       
      }
      this.isRead = true;
      this.buttonText = "Edit";     

      
    }
    
  }

}
