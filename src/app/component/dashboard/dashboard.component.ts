import { Component , OnInit } from '@angular/core';
import { Articles } from 'src/app/model/articles';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  articleList: Articles[] = [];
  articleObj: Articles = {
    id: '',
    title: '',
    content: '',
    likes:'',
    comments:'',
    email:''
  };
  id: string = '';
  title: string = '';
  content: string = '';
  likes: string = '';
  comments: string = '';
  Uemail: any;
  isAdmin: boolean=false;

  constructor(private auth: AuthService, private data: DataService) { }

  ngOnInit(): void {
    this.getAllArticle();

    this.auth.getUser().subscribe(user => {
      this.Uemail = user?.email;
      console.log(this.Uemail)
      if(this.Uemail==="admin@gmail.com"){
        this.isAdmin=true
      }
      
    });
  }

  getAllArticle() {

    this.data.getAllArticles().subscribe(res => {

      this.articleList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        console.log(data.id,e.payload.doc.data());
        return data;
      })

    }, err => {
      alert('Error while fetching Article data');
    })

  }

  handlePostClick(e:any){
    
    console.log(e.currentTarget.dataset.uid);
  }

 
  



  updateStudent() {

  }
  deleteArticle(article: Articles) {
    if (window.confirm('Are you sure you want to delete ' + article.title + ' ' + article.content + ' ?')) {
      this.data.deleteArticle(article);
    }
  }

}