import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: Post[] = [];
  habilitado = true;

  constructor( private postService: PostsService) {}

  ngOnInit() {
    this.siguiente();
    this.postService.nuevoPost.subscribe(post => {
      this.posts.unshift(post);
    });
  }

  recargar(event) {
    this.siguiente(event, true);
    this.habilitado = true;
    this.posts = [];
  }

  siguiente(event?, pull: boolean = false) {
    this.postService.getPosts(pull).subscribe( resp => {
      console.log(resp);
      this.posts.push(...resp.posts);

      if (event) {
        event.target.complete();

        if (resp.posts.length === 0){
          this.habilitado = false;
        }
      }
    });
  }

}
