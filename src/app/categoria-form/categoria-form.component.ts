import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {CategoriaVO} from '../entities/categoria';
import {LANGUAGES} from '../app.component';
import {Idioma} from '../entities/idioma';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.sass']
})
export class CategoriaFormComponent implements OnInit, OnChanges
{
  @Input() categoria: CategoriaVO;
  @Output() submitForm = new EventEmitter<CategoriaVO>();
  form = this.fb.group({
    nome: ['', Validators.required],
    tag: ['', Validators.required],
    idioma: ['', Validators.required]
  });
  readonly languages = LANGUAGES;

  constructor(private fb: FormBuilder)
  {
    this.updateForm();
  }

  ngOnInit(): void
  {
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

    const categoria: CategoriaVO = {
      id: (this.categoria) ? this.categoria.id : -1,
      nome: raw.nome,
      tag: raw.tag,
      idioma,
      filmes: [],
      hasFilmes: false,
      desativado: false
    };

    this.submitForm.emit(categoria);
  }

  updateForm(): void
  {
    if (this.categoria)
    {
      this.form.patchValue({
        nome: this.categoria.nome,
        tag: this.categoria.tag,
        idioma: this.categoria.idioma.id
      });
    }
  }
}
