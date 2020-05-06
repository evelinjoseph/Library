import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { UserService } from '../user.service';
import { firestore} from 'firebase/app';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs'; // also added

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  sampleArr=[];
  resultArr=[];
  scannedData: {};
  scanArr=[];
  barcodeScannerOptions: BarcodeScannerOptions; 
  items: Observable<any[]>;// also added

  constructor(public fs: AngularFirestore, private barcodeScanner: BarcodeScanner, public user: UserService, private router: Router, public alertCtrl: AlertController) { 
    this.barcodeScannerOptions = {
      preferFrontCamera : false, // iOS and Android
      showFlipCameraButton : true, // iOS and Android
      showTorchButton : true, // iOS and Android
      torchOn: true, // Android, launch with the torch switched on (if available)
      prompt : "Place a barcode inside the scan area", // Android
      resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
      disableAnimations : true, // iOS
      disableSuccessBeep: false // iOS and Android
    };

    this.items = fs.collection('item').valueChanges(); 
  }

  ngOnInit() {
  }

  cart(item){

    firebase.auth().onAuthStateChanged(function(user) {
      console.log(user);
      if (user) {
        
        var isAnonymous = user.isAnonymous;
        if(isAnonymous)
        {
          
          alert("Please sign up or log in for this feature!");

        }
        
          
      }
     else {

     
        
        }
      });


    //let btn = document.getElementById(itemName);
    
    //if(btn.textContent == 'Add to Cart'){

      this.fs.doc(`users/${this.user.getUID()}`).update({
        cart: firestore.FieldValue.arrayUnion({
          itemName: item.itemName,
          Description: item.Description,
          aFname: item.aFname,
          aLname: item.aLname
        })
      })

    //btn.textContent = 'Remove from Cart';
      
    //}

    /*else{

      this.fs.doc(`users/${this.user.getUID()}`).update({
        cart: firestore.FieldValue.arrayRemove({
          itemName
        })
      })

      btn.textContent = 'Add to Cart';
      
    }*/

    


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

  scanBarcode(){
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        this.scannedData = barcodeData;

        this.fs.collection('item', ref => ref.where('ISBN-13', '==', this.scannedData["text"])).snapshotChanges()
        .subscribe(data => {
          data.forEach(childData => {
            console.log(childData.payload.doc.data())
            this.scanArr.push(childData.payload.doc.data())            
  
          })
        })
       
        
      })
      .catch(err => {
        console.log("Error", err);
      });

      this.scanArr = [];

      
      
      /*this.fs.collection("scan").doc("scan1").set({
        ISBN: this.scannedData['text']
        
      })    

      
      this.fs.collection('item', ref => ref.where('ISBN-13', '==', this.scannedData["text"])).snapshotChanges()
      .subscribe(data => {
        data.forEach(childData => {
          this.scanArr.push(childData.payload.doc.data())

        })
      })

      console.log(this.scanArr.pop().itemName)


      this.fs.collection("item").ref.where('ISBN-13', '==', this.scannedData["text"])
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });*/

    
  }

  search(event){

    let searchKey: string = event.target.value;
    let firstLetter = searchKey.toUpperCase();

    this.scanArr = [];

    if(searchKey.length==0){
      this.sampleArr=[];
      this.resultArr=[];
      this.scanArr = [];

    }
    if(this.sampleArr.length == 0){

      this.scanArr = [];

      this.fs.collection('item', ref => ref.where('SearchIndex', '==', firstLetter)).snapshotChanges()
      .subscribe(data => {
        data.forEach(childData => {
          this.sampleArr.push(childData.payload.doc.data())

        })
      })
    }

    else{

      this.scanArr = [];
      this.resultArr=[];
      this.sampleArr.forEach(val=>{
        let name:string=val['itemName'];
        if(name.toUpperCase().startsWith(searchKey.toUpperCase())){
          if(true){
            this.resultArr.push(val);

          }

        }
      })

    }

  }

}
