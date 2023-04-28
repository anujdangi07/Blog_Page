import { Component , OnInit} from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  Uemail: any;
  isAdmin: boolean=false;
  constructor(private auth:AuthService ){}
  ngOnInit(): void {
    this.auth.getUser().subscribe(user => {
      this.Uemail = user?.email;
      console.log(this.Uemail)
      if(this.Uemail==="admin@gmail.com"){
        this.isAdmin=true
      }
    }
)}
}
