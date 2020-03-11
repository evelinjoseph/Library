import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { NavController } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email: string = "";
  password: string = "";
  cpassword: string = "";
  
  constructor(private nacCtrl: NavController, public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  async register() {

    const { email, password, cpassword} = this
    if(password !== cpassword){
      return console.error("Passwords don't match")
    }

    try{

      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      console.log(res)
      this.nacCtrl.navigateRoot(["./home"])

    }catch(error){

      console.dir(error)
    }

    

  }

}
