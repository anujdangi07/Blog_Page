import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { getAuth } from "firebase/auth";
import { Observable, map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getUser(): Observable<any> {
    return this.fireauth.authState;
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token === 'true';
  }

  constructor(private fireauth : AngularFireAuth, private router : Router) {
    
   }
   login(email : string ,password : string  ) {
    this.fireauth.signInWithEmailAndPassword(email,password).then(()=>{
      localStorage.setItem('token','true');
      this.router.navigate(['dashboard']);

    },err => {
        alert('Something went wrong');
        this.router.navigate(['/login']);
    })
  }

  register(email : string , password : string , username: string){
    this.fireauth.createUserWithEmailAndPassword(email,password).then(()=>{
       alert('Registration Successful');
       this.router.navigate(['/login'])
    },err =>{
      alert(err.message);
      this.router.navigate(['/register']);
    

    })
  }  
  logout(){
    this.fireauth.signOut().then(()=>{
      localStorage.removeItem('token');
      this.router.navigate(['/login']); 
    },err =>{
       alert(err.message)
    })
  }
}
