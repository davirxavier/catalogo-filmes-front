import {AfterContentInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FilmeService} from '../filme.service';
import {FilmeVO} from '../entities/filme';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {sanitizeImage} from '../util/sanitizing';
import * as moment from 'moment';
import {duration} from 'moment';
import {TranslateService} from '@ngx-translate/core';
import {LoadingService} from '../loading.service';
import {getDurationFormatted} from '../util/string';

@Component({
  selector: 'app-pagina-filme',
  templateUrl: './pagina-filme.component.html',
  styleUrls: ['./pagina-filme.component.sass']
})
export class PaginaFilmeComponent implements OnInit, AfterContentInit
{
  private filmeId: number;
  filme: FilmeVO;
  sanitizedImage: SafeUrl;
  lastUrl = '';

  constructor(private route: ActivatedRoute,
              private filmeService: FilmeService,
              private sanitizer: DomSanitizer,
              private translate: TranslateService,
              private router: Router)
  {
  }

  ngOnInit(): void
  {
    this.route.queryParams.subscribe(params =>
    {
      this.lastUrl = params.from || '';
    });
  }

  ngAfterContentInit()
  {
    this.route.params.subscribe(params =>
    {
      this.filmeId = params.id;
      this.updateFilme();
    });
  }

  updateFilme(): void
  {
    this.filmeService.getFilme(this.filmeId).subscribe(res =>
    {
      this.filme = res;
      if (this.filme)
      {
        this.sanitizedImage = sanitizeImage(this.filme.imagem, this.sanitizer);

        let dur = getDurationFormatted(this.filme.duracao);
        const durUnit = dur.charAt(dur.length - 1);
        dur = dur.substr(0, dur.length - 1);
        dur = this.translate.instant('info.duration_' + durUnit, {val: dur});

        this.filme.duracao = dur;
      }
    });
  }

  onNavigate(): void
  {
    if (this.lastUrl && this.lastUrl.length > 0)
    {
      this.router.navigate([this.lastUrl]);
    }
  }

  getDataLancamentoDay(): string
  {
    const mom = moment(this.filme.dataLancamento);
    mom.locale(this.translate.currentLang);
    return mom.format('DD');
  }

  getDataLancamentoMonth(): string
  {
    const mom = moment(this.filme.dataLancamento);
    mom.locale(this.translate.currentLang);
    return mom.format('MMMM');
  }

  getDataLancamentoYear(): string
  {
    const mom = moment(this.filme.dataLancamento);
    mom.locale(this.translate.currentLang);
    return mom.format('yyyy');
  }
}
