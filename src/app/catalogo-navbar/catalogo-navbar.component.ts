import {AfterContentInit, Component, OnChanges, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LANGUAGES} from '../app.component';
import {NavigationEnd, Router} from '@angular/router';
import {Location} from '@angular/common';
import {AuthService} from '../auth.service';
import {UsuarioVO} from '../entities/usuario';
import {SearchEvent} from '../catalogo-search-bar/catalogo-search-bar.component';
import {FilmeSearchService} from '../filme-search.service';
import {OptionsService} from '../options.service';
import {state} from '@angular/animations';

interface NavbarLink {
  text: string;
  link: string;
}

@Component({
  selector: 'app-catalogo-navbar',
  templateUrl: './catalogo-navbar.component.html',
  styleUrls: ['./catalogo-navbar.component.sass']
})
export class CatalogoNavbarComponent implements OnInit, OnChanges
{
  languages = LANGUAGES;
  selected: number;
  fontSize = 4;
  highContrast = false;
  activePage = 0;
  currentUser: UsuarioVO;
  shouldShowOptions = true;
  searchBarExpanded: boolean;
  private readonly highContrastClass = 'app-high-contrast';

  // Links do navbar, utilizar chave do translate no campo de texto.
  readonly navbarLinks: Array<NavbarLink> = [
    { text: 'navbar.all_button', link: '/filmes' },
    { text: 'navbar.categoria_button', link: '/categorias' }
  ];
  dropDownLinks: Array<NavbarLink> = [].concat(this.navbarLinks);
  // TODO Setar links
  readonly manageLinks: Array<NavbarLink> = [
    { text: 'navigation.manage_filmes', link: 'gerencia/filmes'},
    { text: 'navigation.manage_categorias', link: 'gerencia/categorias'},
    { text: 'navigation.manage_usuarios', link: 'gerencia/usuarios'}
  ];
  // Opções de busca para filmes
  readonly filmeSearchFiltersTranslationKeys: Array<string> = [
    'filme.titulo',
    'filme.sinopse',
    'filme.ano'
  ];
  readonly filmeSearchKeys: Array<string> = [
    'titulo',
    'sinopse',
    'anoLancamento'
  ];
  readonly configDropdownButtons: Array<{text: string, call: (() => any)}> = [
    {text: 'navbar.change_language_pt', call: () => this.setLanguage(this.languages[0].tag, 0)},
    {text: 'navbar.change_language_en', call: () => this.setLanguage(this.languages[1].tag, 1)},
    {text: 'navbar.high_contrast', call: () => this.onInvertColors()},
    {text: 'navbar.font_increase', call: () => this.onIncreaseFontSize()},
    {text: 'navbar.font_restore', call: () => this.onRestoreFontSize()},
    {text: 'navbar.font_decrease', call: () => this.onDecreaseFontSize()}
  ];
  readonly configDropdownText: Array<string> = this.configDropdownButtons.map(p => p.text);

  constructor(private translate: TranslateService,
              private router: Router,
              private location: Location,
              private authService: AuthService,
              private searchService: FilmeSearchService,
              private optService: OptionsService)
  {
    this.selected = 0;
  }

  ngOnInit(): void
  {
    this.updateCurrentPage();

    this.router.events.subscribe(event =>
    {
      if (event instanceof NavigationEnd)
      {
        this.updateCurrentPage();
        const link = this.navbarLinks[this.activePage];
        if (link && this.router.url !== link.link)
        {
          this.activePage = -1;
        }

        this.shouldShowOptions = (this.searchBarExpanded && this.activePage === 0) ? false : true;
      }
    });

    this.updateCurrentUser();
    this.authService.onIsLoggedChange().subscribe(() =>
    {
      this.updateCurrentUser();
    });
    this.initOptions();
  }

  ngOnChanges(): void
  {
  }

  initOptions(): void
  {
    this.highContrast = this.optService.highContrast;
    if (this.highContrast)
    {
      document.body.classList.add(this.highContrastClass);
    }
    this.fontSize = this.optService.fontSize;
    this.fontSize = (isNaN(this.fontSize)) ? 4 : this.fontSize;
    this.updateFont(this.fontSize);
  }

  updateCurrentPage(): void
  {
    this.navbarLinks.forEach((link, index) =>
    {
      if (link.link === this.location.path())
      {
        this.activePage = index;
      }
    });
  }

  isMinimal(): boolean
  {
    return this.router.url.startsWith('/filmes/');
  }

  isAdmin(): boolean
  {
    // TODO Minimizar overhead
    return this.authService.isLogged();
  }

  // Search Bar
  showSearchBar(): boolean
  {
    return this.activePage === 0;
  }

  onSearch(event: SearchEvent): void
  {
    this.searchService.search(event.text, this.filmeSearchKeys[event.selectFilterIndex]);
  }

  onClearSearchbar(): void
  {
    this.searchService.clear();
  }

  onSearchBarExpand(expanded: boolean): void
  {
    this.searchBarExpanded = expanded;
    this.shouldShowOptions = !expanded;
  }
  //

  updateCurrentUser(): void
  {
    this.authService.getCurrentUser().subscribe(user =>
    {
      this.currentUser = user;

      this.languages.forEach((value, index) =>
      {
        if (this.currentUser && this.currentUser.idioma && value.tag === this.currentUser.idioma.tag)
        {
          this.setLanguage(value.tag, index);
        }
      });
      if (this.currentUser && this.navbarLinks.length <= 2)
      {
        this.dropDownLinks = this.navbarLinks.concat(this.manageLinks);
      }
      else
      {
        this.dropDownLinks = [].concat(this.navbarLinks);
      }
    });
  }

  onAccountClicked(index: number): void
  {
    if (index === 0)
    {
      this.router.navigate(['conta']);
    }
    else
    {
      this.authService.logout();
      this.updateCurrentUser();

      this.router.navigate(['login']);
    }
  }

  setLanguage(lang: string, index: number): void
  {
    this.translate.use(lang);
    this.selected = index;
  }

  getDropdownTextArray(links: Array<NavbarLink>): Array<string>
  {
    return links.map(link =>
    {
      return link.text;
    });
  }

  onDropdownClicked(index: number, links: Array<NavbarLink>): void
  {
    if (index !== undefined)
    {
      const link: string = links[index].link;
      this.router.navigate([link]);
    }
  }

  onIncreaseFontSize(): void
  {
    if (this.fontSize < 7)
    {
      this.fontSize += 1;
      this.updateFont(this.fontSize - 1);
    }
  }

  onDecreaseFontSize(): void
  {
    if (this.fontSize > 1)
    {
      this.fontSize -= 1;
      this.updateFont(this.fontSize + 1);
    }
  }

  onRestoreFontSize(): void
  {
    const lastSize = this.fontSize;
    this.fontSize = 4;
    this.updateFont(lastSize);
  }

  private updateFont(lastSize: number)
  {
    document.body.classList.remove('app-font-size-' + lastSize);
    document.body.classList.add('app-font-size-' + this.fontSize);
    this.optService.fontSize = this.fontSize;
  }

  onInvertColors(): void
  {
    if (this.highContrast)
    {
      document.body.classList.remove(this.highContrastClass);
    }
    else
    {
      document.body.classList.add(this.highContrastClass);
    }
    this.highContrast = !this.highContrast;
    this.optService.highContrast = this.highContrast;
  }

  onNavigateClicked(index: number, link: string): void
  {
    this.activePage = index;
    this.router.navigate([link]);
  }

  currentUrl(): string
  {
    return this.router.url;
  }
}
