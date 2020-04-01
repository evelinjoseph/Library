import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
interface  user {
    email: string,
    uid: string

}
export class UserService{
    private user: user

    constructor(){


    }

    setUser(user:user){
        this.user = user
    }

    getUID(){
        
        return this.user.uid
    }
}