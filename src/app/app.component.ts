import { AuthService } from './auth/auth.service';
import { Post } from './posts/post.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // title = 'mean-course';

  constructor(private authService: AuthService) {}

  ngOnInit(){
    this.authService.autoAuthUser();
  }

}
