import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';
import { UserService } from '../user.service';
import { firestore} from 'firebase/app';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
 
  itemName: string
  userItems;
  
  
  constructor(public afstore: AngularFirestore, public user: UserService) { 

    const items = afstore.doc(`users/${this.user.getUID()}`)
    this.userItems = items.valueChanges()
  }

  ngOnInit() {
   
  }

  checkOut(){

    const itemName = this.itemName

    this.afstore.doc(`users/${this.user.getUID()}`).update({
      items: firestore.FieldValue.arrayUnion({
        itemName
      })
    })
      
        
     

  }

}
