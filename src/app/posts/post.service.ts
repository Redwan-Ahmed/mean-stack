import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from './../../environments/environment';
const BACKEND_URL = environment.apiUrl + "/posts/";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] =[];
  private postsUpdated = new Subject<{posts: Post[], postCount: number}>();

  constructor(private http: HttpClient, private router: Router) { }

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http.get<{ message: string, posts: any, maxPosts: number }>(BACKEND_URL + queryParams)
    .pipe(map((postData) => {
      return { posts: postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id,
          imagePath: post.imagePath,
          creator: post.creator
        };
      }), maxPosts: postData.maxPosts };
    }))
    .subscribe(changedPostData => {
      console.log(changedPostData);
      this.posts = changedPostData.posts;
      this.postsUpdated.next({posts: [...this.posts], postCount: changedPostData.maxPosts});
    });
  }

  getPost(id: string){
    //getting post via local stoarge
    //return {...this.posts.find( p => p.id === id)};
    //get post from DB
    return this.http.get<{ _id: string, title: string, content: string, imagePath: string, creator: string }>(
      BACKEND_URL + id);
  }

  getPostsUpdatedListner(){
    return this.postsUpdated.asObservable();
  }

  addPosts(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    this.http.post<{message: string, post: Post}>(BACKEND_URL, postData)
    .subscribe(resData => {
      //navigate back to the home page after adding
      this.router.navigate(["/"]);
    });
  }

  deletePost(postId: string) {
    return this.http.delete(BACKEND_URL + postId);
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if(typeof image === "object") {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        creator: null
      };
    }
    this.http.put(BACKEND_URL + id, postData)
    .subscribe(resp => {
      //navigate back to the home page after updating
      this.router.navigate(["/"]);
    });
  }

}
