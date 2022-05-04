import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-status-code-page',
  templateUrl: './status-code-page.component.html',
  styleUrls: ['./status-code-page.component.css']
})
export class StatusCodePageComponent implements OnInit {
  code: number = 404;
  msg: string = 'Not Found';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let c = params.get('code');
      if (c) {
        this.code = parseInt(c);
      }
      else {
        this.code = 404;
      }

      switch (this.code) {
        case 404:
          this.msg = 'Not Found';
          break;
        case 500:
          this.msg = 'Internal Server Error';
          break;
        default:
          this.msg = 'Unknown Error';
          break;
      }
    });
  }

}
