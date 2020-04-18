import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollectionGroup} from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { firestore} from 'firebase/app';
import * as firebase from 'firebase/app';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  itemName: string
  isCurrent: boolean
  userItems;

  constructor(private afstore: AngularFirestore, private user: UserService) {

    firebase.auth().onAuthStateChanged(function(user) {
      console.log(user);
      if (user) {
        
        var isAnonymous = user.isAnonymous;
        if(isAnonymous)
        {
          
          alert("Please sign up or log in for this feature!")
          

        }
        
          
      }
     else {
        
        }
      });

      const items = afstore.doc(`users/${this.user.getUID()}`)
      this.userItems = items.valueChanges()
   

   }

  ngOnInit() {
  }

}
