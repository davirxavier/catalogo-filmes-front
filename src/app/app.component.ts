import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Idioma} from './entities/idioma';
import {LoadingService} from './loading.service';
import {Title} from '@angular/platform-browser';
import {DateAdapter} from '@angular/material/core';
import {NavigationEnd, Router} from '@angular/router';

// Default language = 0
export const LANGUAGES: Array<Language> = [
  { tag: 'pt-BR', iconClass: 'flag-icon-br', name: 'Português Brasileiro' },
  { tag: 'en-US', iconClass: 'flag-icon-us', name: 'US English' }
];
export interface Language
{
  tag: string;
  iconClass: string;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit
{
  loading = false;

  constructor(public translate: TranslateService,
              private loadingService: LoadingService,
              private cd: ChangeDetectorRef,
              private titleService: Title,
              private dateAdapter: DateAdapter<any>,
              private router: Router)
  {
    const languagesString = LANGUAGES.map(l =>
    {
      return l.tag;
    });

    document.body.classList.add('app-font-size-4');
    translate.addLangs(languagesString);
    translate.setDefaultLang(languagesString[0]);
    translate.currentLang = languagesString[0];
    dateAdapter.setLocale(languagesString[0]);
    titleService.setTitle('Catálogo de Filmes');

    router.events.subscribe(event =>
    {
      if (event instanceof NavigationEnd)
      {
        loadingService.loading = false;
      }
    });
  }

  ngOnInit(): void
  {
    this.loadingService.loading$.subscribe((isLoading: boolean) =>
    {
      this.loading = isLoading;
      this.cd.detectChanges();
    });

    this.updateTitle();
    this.translate.onLangChange.subscribe(() =>
    {
      this.dateAdapter.setLocale(this.translate.currentLang);
      this.updateTitle();
    });
  }

  updateTitle(): void
  {
    this.translate.get('navbar.title').subscribe(res =>
    {
      this.titleService.setTitle(res);
    });
  }
}
