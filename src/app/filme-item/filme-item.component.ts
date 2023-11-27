import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FilmeVO} from '../entities/filme';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {sanitizeImage} from '../util/sanitizing';
import {Router} from '@angular/router';

@Component({
  selector: 'app-filme-item',
  templateUrl: './filme-item.component.html',
  styleUrls: ['./filme-item.component.sass']
})
export class FilmeItemComponent implements OnInit, OnChanges {

  @Input() filme: FilmeVO;
  sanitizedImage: SafeUrl;

  constructor(private sanitizer: DomSanitizer,
              private router: Router) { }

  ngOnInit(): void
  {
  }

  ngOnChanges(): void
  {
    if (this.filme)
    {
      this.sanitizedImage = sanitizeImage(this.filme.imagem, this.sanitizer);
    }
  }

  getQueryParams(): object
  {
    return {from: this.router.url};
  }
}

export const filmeComponentWidth = 180;
export const filmeComponentHeight = 200;
