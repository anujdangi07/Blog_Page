import { Component ,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Articles } from 'src/app/model/articles';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';
import { Comments } from 'src/app/model/comments';
import { Likes } from 'src/app/model/likes';


@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.css']
})
export class ViewPageComponent implements OnInit{

  Zlike:boolean=false;
  Uemail: any;
  Ucomments: string='';
  uid: any;
  commentList: Comments[] = [];
  CommentObj: Comments = {
    uid: '',
    Ucomments:'',
    Uemail:'',
    commentId:''
  };
likeList: Likes[] = [];
LikeObj:Likes ={
  Zlike: false,
  Zemail: '',
  Zid: '',
  likeId: '',
  Zuid: '',
  id:''
}

  
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
  likes: string='';
  comments: string = '';
  email:string='';
  renderer: any;
  sample: any;
 constructor(private auth: AuthService, private data: DataService, private route:ActivatedRoute){}
 showCommentInput = false;

  ngOnInit(): void {
    this.uid=this.route.snapshot.params['id']
    console.log(this.uid)
    this.getAllArticle();
    this.getAllComments();
    this.getAllLikes();

    this.auth.getUser().subscribe(user => {
      this.Uemail = user?.email;
      console.log(this.Uemail)
      
    });
    
    }
    
 getAllArticle() {

    this.data.getAllArticles().subscribe((res: any[]) => {

      this.articleList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        // console.log(data.id)
      if(data.id==this.uid)
      return data ;
      
    })

  }, () => {
    alert('Error while fetching Article data');
  })

}
getAllComments() {

  this.data.getAllComments().subscribe(res => {

    this.commentList = res.map((e: any) => {
        const data = e.payload.doc.data();
      data.id = e.payload.doc.id;
      // console.log(data.id,e.payload.doc.data());
      // console.log(this.uid)
      console.log(data.commentId);
      if(this.uid===data.commentId)
      return data ;


    })
      
      

  }, err => {
    alert('Error while fetching Article data');
  })

}
myLike(event: MouseEvent) {
  const target = event.target as HTMLElement;

  if (this.Zlike) {
    target.classList.remove("fa-heart");
    target.classList.add("fa-heart-o");

    // Remove like object from database
    const likeToRemove = this.likeList.find((like) => like.Zemail === this.Uemail && like.Zuid === this.uid);
    if (likeToRemove) {
      console.log(likeToRemove.id)
      this.data.deleteLikes(likeToRemove.id);
      const likeToAdd = this.articleList.find((article) => article?.id === this.uid );
      if (likeToAdd && likeToAdd.likes !== undefined) {
        this.articleObj.id = likeToAdd.id;
        this.articleObj.likes = (parseInt(likeToAdd.likes) - 1).toString();
        this.articleObj.content=likeToAdd?.content;
        this.articleObj.email=likeToAdd?.email;
        this.articleObj.comments=likeToAdd?.comments;
        this.articleObj.title=likeToAdd?.title;
      }      this.data.updateArticle(this.articleObj.id, this.articleObj);
    }

    this.Zlike = false; // set the user's like status to false
  } else {
    target.classList.remove("fa-heart-o");
    target.classList.add("fa-heart");
    const likeToAdd = this.articleList.find((article) => article?.id === this.uid );
    console.log(likeToAdd)   // Create new like object
    this.LikeObj.Zemail = this.Uemail;
    this.LikeObj.Zuid = this.uid;
    this.LikeObj.Zlike = true;
    this.data.addLike(this.LikeObj);
    
    // add new like to Firebase
    // this.articleObj.id = likeToAdd?.id;
    if (likeToAdd && likeToAdd.likes !== undefined) {
      this.articleObj.id = likeToAdd.id;
      this.articleObj.likes = (parseInt(likeToAdd.likes) + 1).toString();
      this.articleObj.content=likeToAdd?.content;
      this.articleObj.email=likeToAdd?.email;
      this.articleObj.comments=likeToAdd?.comments;
      this.articleObj.title=likeToAdd?.title;
    }
   
    console.log(this.articleObj.likes)
    console.log(this.articleObj)

    this.data.updateArticle(this.articleObj.id, this.articleObj);
    this.Zlike = true;
     // set the user's like status to true
  }
}


resetForm() {
  this.Ucomments='';
  
}


addComment() {
  if (this.Ucomments == '') {
    alert('Fill all input fields');
    return;
  }

  this.CommentObj.uid = '';
  this.CommentObj.commentId = this.uid;

  this.CommentObj.Ucomments = this.Ucomments;
  this.CommentObj.Uemail=this.Uemail;

  this.data.addComment(this.CommentObj);
  this.resetForm();

}

getAllLikes() {
  this.data.getAllLikes().subscribe(res => {
    this.likeList = res.map((e: any) => {
      const data = e.payload.doc.data();
      data.id = e.payload.doc.id;
      if (this.Uemail === data.Zemail && this.uid === data.Zuid) {
        this.Zlike = true; 
        // set the user's like status for the current article
      }
      return data;
    });
  });
}



}
function elseif(arg0: boolean) {
  throw new Error('Function not implemented.');
}

