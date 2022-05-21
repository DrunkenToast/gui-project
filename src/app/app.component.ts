import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { AudioService } from './services/audio-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Pillow';

  constructor(private titleService: Title, private route: ActivatedRoute,
    private router: Router) { }

  // https://blog.bitsrc.io/dynamic-page-titles-in-angular-98ce20b5c334
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        const child = this.route.firstChild;
        if (child?.snapshot.data['title']) {
          return child.snapshot.data['title'];
        }
        return this.title;
      })
    ).subscribe((title: string) => this.titleService.setTitle(title));
  }

}
