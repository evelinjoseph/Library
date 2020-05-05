import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollectionGroup} from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { firestore} from 'firebase/app';
import * as firebase from 'firebase/app';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {


  constructor(private afstore: AngularFirestore, private user: UserService, public nacCtrl: NavController) { 

    firebase.auth().onAuthStateChanged(function(user1) {
      console.log(user1);
      if (user1) {

        console.log(user);
        
        var isAnonymous = user1.isAnonymous;
        if(isAnonymous)
        {
          
          alert("Please sign up or log in for this feature!")
          nacCtrl.navigateRoot(['./tabs'])  
          

        }
 
      }
     else {
        
        }
      });

     

  }

  ngOnInit() {
  }

  public captureName(event: any) : void
  {
     console.log(`Captured name by event value: ${event}`);
  }

  async signOut(){

    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });

    this.nacCtrl.navigateRoot(['/home']);

  }

  

}
