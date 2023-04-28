import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Articles } from '../model/articles';
import { Comments } from '../model/comments';
import { Likes } from '../model/likes';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  deleteLike(id: any) {
    throw new Error('Method not implemented.');
  }
  Zemail: any;
  Zuid: any;

   constructor(private afs : AngularFirestore, private fireStorage : AngularFireStorage) { }


  // add student
  addArticle(articles : Articles) {
    articles.id = this.afs.createId();
    return this.afs.collection('/articles').add(articles);
  }

  // get all students
  getAllArticles() {
    return this.afs.collection('/articles').snapshotChanges();
  }

  // delete student
  deleteArticle(article : Articles) {
     this.afs.doc('/articles/'+article.id).delete();
  }

  // update student
  updateStudent(article : Articles) {
    this.deleteArticle(article);
    this.addArticle(article);
  }

  addComment(comments : Comments) {
    comments.uid = this.afs.createId();
    return this.afs.collection('/comments').add(comments);
  }

  getAllComments() {
    return this.afs.collection('/comments').snapshotChanges();
  }

  addLike( likes : Likes){
    likes.Zid = this.afs.createId();
    return this.afs.collection('/likes').add(likes);

  }
    
  getAllLikes() {
    return this.afs.collection('/likes').snapshotChanges();
  }

  updateArticle(id: string, article : Articles) {
    const articleDoc: AngularFirestoreDocument<Articles> = this.afs.doc('/articles/'+id);
    return articleDoc.update(article);
  }

  deleteLikes(id: string) {
    return this.afs.doc('/likes/' +id).delete();
  }
}
