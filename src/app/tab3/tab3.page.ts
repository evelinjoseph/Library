import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollectionGroup} from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { firestore} from 'firebase/app';
import * as firebase from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { format, formatDistance, formatRelative, subDays, addWeeks} from 'date-fns';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  itemName: string
  isCurrent: boolean
  userItems;

  constructor(private afstore: AngularFirestore, private user: UserService, public alertCtrl: AlertController) {

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

  public async return(checkedOut){

    const confirm = await this.presentAlertReturn();

    if (confirm) {

      for(var item of checkedOut){ 
      
        this.afstore.doc(`users/${this.user.getUID()}`).update({
          Returned: firestore.FieldValue.arrayUnion({
            itemName: item.itemName,
            isCurrent: false,
            returndate: new Date()
           
          })
        })

        this.afstore.doc(`users/${this.user.getUID()}`).update({
          checkedOut: firestore.FieldValue.arrayRemove({
            itemName: item.itemName,
            isCurrent: true,
            date: item.date,
            returnDate: item.returnDate            
          })
        })

        
  
      }
  
       
  
      console.log("return complete!")
    }
     




  }

  public async presentAlertReturn() : Promise<boolean> {
    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>(resolve => {
      resolveFunction = resolve;
    });
    const alert = await this.alertCtrl.create({
      header: 'Confirm Return',
      message: 'Are you sure you want to return these items?',
      buttons: [
        {
          text: 'Yes',
            handler: () => resolveFunction(true)
        }, {
          text: 'No',
          handler: () => resolveFunction(false)
        }
      ]
    });

    await alert.present();
    return promise;
  }


}
