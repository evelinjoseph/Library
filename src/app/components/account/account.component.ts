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
  name : string;

  @Input()
  bookHistory;

  @Input()
  fees : string;
  


  /**
   * The description of the technology that will be displayed within the accordion body (when activated 
   * by the user)
   * @public
   * @property description
   * @type {string}
   
  @Input()
  description : string;*/


  /**
   * The official logo identifying the technology that will be displayed within the accordion body (when activated 
   * by the user)
   * @public
   * @property image
   * @type {string}
   
  @Input()
  image : string;
*/

  /**
   * The change event that will be broadcast to the parent component when the user interacts with the component's 
   * <ion-button> element
   * @public
   * @property change
   * @type {EventEmitter}
   */
  @Output()
  change : EventEmitter<string> = new EventEmitter<string>();


  /**
   * Determines and stores the accordion state (I.e. opened or closed)
   * @public
   * @property isMenuOpen
   * @type {boolean}
   */
  public isMenuOpen : boolean = false;
  public isMenuOpen2 : boolean = false;
  public isMenuOpen3 : boolean = false;

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


  /**
   * Allows the value for the <ion-button> element to be broadcast to the parent component
   * @public
   * @method broadcastName
   * @returns {none}
   */
  public broadcastName(name : string) : void
  {
     this.change.emit(name);
  }

}
