import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { NavController } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: string = "";
  email: string = "";
  password: string = "";
  cpassword: string = "";
  checkedOut;
  Returned;
  fees = 0.00;
  
  constructor(private nacCtrl: NavController, public afAuth: AngularFireAuth, public afstore: AngularFirestore, public user:UserService) { }

  ngOnInit() {
  }

  async register() {

    const { name, email, password, cpassword, fees} = this
    if(password !== cpassword){
      return console.error("Passwords don't match")
    }

    try{

      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)

      this.afstore.doc(`users/${res.user.uid}`).set({
        email,
        name,
        password,
        checkedOut: [],
        Returned: [],
        fees


      })
      
      this.user.setUser({
          email,
          uid: res.user.uid
      })

      

      console.log(res)
      this.nacCtrl.navigateRoot(["./home"])

    }catch(error){

      console.dir(error)
    }

    

  }

}
