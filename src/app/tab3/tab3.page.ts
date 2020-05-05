import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollectionGroup} from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { firestore} from 'firebase/app';
import * as firebase from 'firebase/app';
import { AlertController, NavController } from '@ionic/angular';
import { format, formatDistance, formatRelative, subDays, addWeeks} from 'date-fns';
import { Button } from 'protractor';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  itemName: string
  isCurrent: boolean
  userItems;
  btnText: string = 'Select';

  constructor(public nacCtrl: NavController, private afstore: AngularFirestore, private user: UserService, public alertCtrl: AlertController) {

    firebase.auth().onAuthStateChanged(function(user) {
      console.log(user);
      if (user) {
        
        var isAnonymous = user.isAnonymous;
        if(isAnonymous)
        {          
          alert("Please sign up or log in for this feature!")
          nacCtrl.navigateRoot(['./tabs'])          

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

  public select(item, name){

    let  Btn  =  document.getElementById(name);
    console.log(name);
    console.log(Btn.textContent);

    if(Btn.textContent == 'Select'){

      this.afstore.doc(`users/${this.user.getUID()}`).update({
        Selected: firestore.FieldValue.arrayUnion({
          itemName: item.itemName,
          isCurrent: true,
          date: item.date,
          returnDate: item.returnDate       
        })
      })
  
         
      
      Btn.textContent = 'Selected';


    }

    else{

      this.afstore.doc(`users/${this.user.getUID()}`).update({
        Selected: firestore.FieldValue.arrayRemove({
          itemName: item.itemName,
          isCurrent: true,
          date: item.date,
          returnDate: item.returnDate       
        })
      })
  
         
      
      Btn.textContent = 'Select';


    }

    
  }

  public async return(checkedOut){

    const confirm = await this.presentAlertReturn();

    if (confirm) {

      for(var item of checkedOut){ 

        if(item.returnDate.toDate() < new Date()){

          const increment = firebase.firestore.FieldValue.increment(0.35);

          this.afstore.doc(`users/${this.user.getUID()}`).update({
            fees: increment
          })

          alert("There has been a fine added to your account associated with your return of " + item.itemName);

        }

        this.afstore.doc(`users/${this.user.getUID()}`).update({
          Returned: firestore.FieldValue.arrayUnion({
            itemName: item.itemName,
            isCurrent: false,
            returnDate: new Date()
           
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

        this.afstore.doc(`users/${this.user.getUID()}`).update({
          Selected: firestore.FieldValue.arrayRemove({
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

  

  public async returnSelected(checkedOut){

    const confirm = await this.presentAlertReturn();

    if (confirm) {

      for(var item of checkedOut){ 

        if(item.returnDate.toDate() < new Date()){

          const increment = firebase.firestore.FieldValue.increment(0.35);

          this.afstore.doc(`users/${this.user.getUID()}`).update({
            fees: increment
          })

          alert("There has been a fine added to your account associated with your return of " + item.itemName);

        }
      
        this.afstore.doc(`users/${this.user.getUID()}`).update({
          Returned: firestore.FieldValue.arrayUnion({
            itemName: item.itemName,
            isCurrent: false,
            returnDate: new Date()
           
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

        this.afstore.doc(`users/${this.user.getUID()}`).update({
          Selected: firestore.FieldValue.arrayRemove({
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
