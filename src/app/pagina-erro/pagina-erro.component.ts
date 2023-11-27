import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-pagina-erro',
  templateUrl: './pagina-erro.component.html',
  styleUrls: ['./pagina-erro.component.sass']
})
export class PaginaErroComponent implements OnInit
{

  lastUrl: string;

  constructor(private route: ActivatedRoute,
              private router: Router)
  {
    route.params.subscribe(params =>
    {
      this.lastUrl = params.lasturl;
    });
  }

  ngOnInit(): void
  {
  }

  onTryAgainNow(): void
  {
    if (this.lastUrl)
    {
      this.router.navigate([this.lastUrl]);
    }
  }
}
