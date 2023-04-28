import { Component ,OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { Articles } from 'src/app/model/articles';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit{
  email: any;
  articleList: Articles[] = [];
  articleObj: Articles = {
    id: '',
    title: '',
    content: '',
    likes:'0',
    comments:'',
    email:''
  };
  id: string = '';
  title: string = '';
  content: string = '';
  likes: string = '0';
  comments: string = '';
  user: any;
  constructor(private data: DataService , private authService : AuthService , private router : Router) { }
  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.email = user?.email;
    });
  }
 
  resetForm() {
    this.id = '';
    this.title = '';
    this.content = '';
    this.likes='';
    this.comments='';
    
  }
  

  addArticle() {
    if (this.title == '' || this.content == '') {
      alert('Fill all input fields');
      return;
    }

    this.articleObj.id = '';
    this.articleObj.title = this.title;
    this.articleObj.content = this.content;
    this.articleObj.likes = this.likes;
    this.articleObj.comments = this.comments;
    this.articleObj.email=this.email;

    this.data.addArticle(this.articleObj);
    this.resetForm();
    this.router.navigate(['/dashboard']);

    }
  
  
  

}
