import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  sampleArr=[];
  resultArr=[];

  constructor(public fs: AngularFirestore) { }

  ngOnInit() {
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
