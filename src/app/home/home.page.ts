import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { CompileNgModuleSummary } from '@angular/compiler';
import { NavController } from '@ionic/angular';
import { TabsPage } from '../tabs/tabs.page';
import { Routes, RouterModule } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  email: string = ""
  password: string = "" 
  
  
  constructor(private nacCtrl: NavController, public afAuth: AngularFireAuth, public user: UserService) {}

  ngOnInit(){

  }

  async login() {

    const { email, password } = this
    try{

      const res = await this.afAuth.auth.signInWithEmailAndPassword(email,password)
      
      if(res.user){
        this.user.setUser({
          email,
          uid:res.user.uid
        })

      }
      
      console.log(res)
      this.nacCtrl.navigateRoot(['./tabs'])
      
    }
    catch(err){
      console.dir(err)
      if(err.code == "auth/user-not-found"){

        console.log("User Not Found")

      }
    }
    
  }

  async continue_Guest(){

    this.nacCtrl.navigateRoot(['./tabs'])

  }

  
}
