import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  sampleArr=[];
  resultArr=[];
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;

  constructor(public fs: AngularFirestore, private barcodeScanner: BarcodeScanner) { 
    this.barcodeScannerOptions = {
      preferFrontCamera : true, // iOS and Android
      showFlipCameraButton : true, // iOS and Android
      showTorchButton : true, // iOS and Android
      torchOn: true, // Android, launch with the torch switched on (if available)
      prompt : "Place a barcode inside the scan area", // Android
      resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
      disableAnimations : true, // iOS
      disableSuccessBeep: false // iOS and Android
    };
  }

  ngOnInit() {
  }

  scanBarcode(){
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        alert("Barcode data " + JSON.stringify(barcodeData));
        this.scannedData = barcodeData;
      })
      .catch(err => {
        console.log("Error", err);
      });

  }

  search(event){

    let searchKey: string = event.target.value;
    let firstLetter = searchKey.toUpperCase();

    if(searchKey.length==0){
      this.sampleArr=[];
      this.resultArr=[];

    }
    if(this.sampleArr.length == 0){

      this.fs.collection('item', ref => ref.where('SearchIndex', '==', firstLetter)).snapshotChanges()
      .subscribe(data => {
        data.forEach(childData => {
          this.sampleArr.push(childData.payload.doc.data())

        })
      })
    }

    else{
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
