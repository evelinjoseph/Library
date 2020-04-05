import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';
import { UserService } from '../user.service';
import { firestore} from 'firebase/app';
import * as firebase from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CheckboxControlValueAccessor } from '@angular/forms';


@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
 
  itemName: string
  isCurrent: boolean
  userItems;
  
  
  
  constructor(public afstore: AngularFirestore, public user: UserService, public alertCtrl: AlertController, private router: Router) { 

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

  
  checkOut(cart){

    for(var item of cart){ 
      
      this.afstore.doc(`users/${this.user.getUID()}`).update({
        checkedOut: firestore.FieldValue.arrayUnion({
          itemName: item.itemName,
          isCurrent: true
        })
      })

    }

    var cartRef = this.afstore.collection('users').doc(`${this.user.getUID()}`);

    // Remove the 'cart' field from the document
    var removeCart = cartRef.update({
        cart: firebase.firestore.FieldValue.delete()
    });

    console.log("checkout complete!")

   

      

  }

  public async delete(itemName: string){

    const confirm = await this.presentAlertDelete();
    if (confirm) {
    this.afstore.doc(`users/${this.user.getUID()}`).update({
      cart: firestore.FieldValue.arrayRemove({
        itemName
      })
    })
  }
 

  }

  public async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Guest Account',
      message: 'Please sign up or login to use this feature!',
      buttons: [
        {
          text: 'Sign Up',
            handler: () => {
            console.log('Sign Up');
            this.router.navigateByUrl('/register');
          }
        }, {
          text: 'Login',
          handler: () => {
            console.log('Login');
            this.router.navigateByUrl('/home');
          }
        }
      ]
    });

    await alert.present();
  }

  public async presentAlertDelete() : Promise<boolean> {
    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>(resolve => {
      resolveFunction = resolve;
    });
    const alert = await this.alertCtrl.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this item from your cart?',
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
