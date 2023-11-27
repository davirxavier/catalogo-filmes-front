import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {LANGUAGES} from '../app.component';
import {FilmeVO} from '../entities/filme';
import {LoadingService} from '../loading.service';
import * as moment from 'moment';
import {environment} from '../../environments/environment';
import {Idioma} from '../entities/idioma';
import {CategoriaVO} from '../entities/categoria';
import {CategoriaService} from '../categoria.service';
import {getDateFormattedForDB, getDateFromDBString, getDurationFormatted, stringComparatorUppercase} from '../util/string';

@Component({
  selector: 'app-filme-form',
  templateUrl: './filme-form.component.html',
  styleUrls: ['./filme-form.component.sass']
})
export class FilmeFormComponent implements OnInit, OnChanges
{

  @Input() filme: FilmeVO;
  @Input() dateFormat = 'DD/MM/yyyy';
  @Output() submitForm = new EventEmitter<FilmeVO>();

  categorias: Array<CategoriaVO> = [];
  private maxImageSize = environment.maxImageSize;
  form = this.fb.group({
    titulo: ['', Validators.required],
    sinopse: [''],
    dataLancamento: ['', Validators.required],
    idioma: ['', Validators.required],
    categoria: ['', Validators.required],
    imagem: [''],
    imagemAlt: [''],
    duracao: ['', Validators.required],
    duracaoUnit: ['', Validators.required]
  });
  private imagemSave = '';
  readonly languages = LANGUAGES;
  readonly duracaoUnits: Array<{ name: string, value: string }> = [
    {name: 'filme.duracao_hours', value: 'H'},
    {name: 'filme.duracao_minutes', value: 'M'},
    {name: 'filme.duracao_seconds', value: 'S'}
  ];

  constructor(private fb: FormBuilder,
              private changeDetector: ChangeDetectorRef,
              private loadingService: LoadingService,
              private categoriaService: CategoriaService)
  {
  }

  ngOnInit(): void
  {
    this.updateForm();

    this.onIdiomaChanged();
    const idioma = this.form.get('idioma');
    idioma.valueChanges.subscribe(() => this.onIdiomaChanged());
  }

  ngOnChanges(): void
  {
    this.updateForm();
  }

  onSubmit(): void
  {
    const raw = this.form.getRawValue();
    const idioma: Idioma = {
      id: raw.idioma,
    } as Idioma;

    let imagem = this.imagemSave;
    if (!imagem && this.filme)
    {
      imagem = this.filme.imagem;
    }

    const data = getDateFormattedForDB(moment(raw.dataLancamento));
    const filme: FilmeVO = {
      id: (this.filme) ? this.filme.id : -1,
      titulo: raw.titulo,
      sinopse: raw.sinopse,
      dataLancamento: data,
      categoria: {id: raw.categoria} as CategoriaVO,
      idioma,
      duracao: 'PT' + raw.duracao + raw.duracaoUnit.toUpperCase(),
      imagem,
      imagemAlt: raw.imagemAlt,
      desativado: false,
    };

    this.submitForm.emit(filme);
  }

  updateForm(): void
  {
    if (this.filme)
    {
      const data = getDateFromDBString(this.filme.dataLancamento);
      const dur = getDurationFormatted(this.filme.duracao);

      this.form.patchValue({
        titulo: this.filme.titulo,
        sinopse: this.filme.sinopse,
        dataLancamento: data.toISOString(),
        idioma: this.filme.idioma.id,
        categoria: this.filme.categoria.id,
        // imagem: this.filme.imagem,
        imagemAlt: this.filme.imagemAlt,
        duracao: dur.replace(/h|H|m|M|s|S|pt/, ''),
        duracaoUnit: dur.charAt(dur.length - 1).toUpperCase()
      });
    }
  }

  updateCategorias(lang: string): void
  {
    const obs = this.categoriaService.getCategoriasWithLang(lang);
    obs.subscribe(res =>
    {
      this.categorias = res;
      this.categorias.sort((c1, c2) =>
      {
        return stringComparatorUppercase(c1.nome, c2.nome);
      });
    });
  }

  onIdiomaChanged(): void
  {
    const idioma = this.form.get('idioma');
    const categoria = this.form.get('categoria');

    categoria.setValue(undefined);
    if (idioma.valid)
    {
      categoria.enable();

      const lang = this.languages[idioma.value - 1];
      if (lang)
      {
        this.updateCategorias(this.languages[idioma.value - 1].tag);
      }
      else
      {
        this.categorias = [];
      }
    }
    else
    {
      categoria.disable();
      this.categorias = [];
    }
  }

  onImagemChange(event): void
  {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length)
    {
      const file = event.target.files[0];

      reader.onload = () =>
      {
        const split = (reader.result as string).split(',');
        this.imagemSave = (split.length > 1) ? split[1] : split[0];
        this.changeDetector.markForCheck();
        this.loadingService.loading = false;
      };
      this.loadingService.loading = true;
      reader.readAsDataURL(file);
    }
  }

}
