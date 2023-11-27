import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {UsuarioVO} from '../entities/usuario';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {isStringEmpty} from '../util/string';
import {withoutProperty, withProperty} from '../util/objects';
import {LANGUAGES} from '../app.component';
import {environment} from '../../environments/environment';
import {TranslateService} from '@ngx-translate/core';

export interface UsuarioFormData
{
  nome: string;
  username: string;
  idioma: { id: number };
  cpf: string;
  telefone: string;
  email: string;
  senhaNova: string;
  confirmarSenha: string;
}

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.sass']
})
export class UsuarioFormComponent implements OnInit, OnChanges
{
  @Input() usuario: UsuarioVO;
  @Output() submitForm = new EventEmitter<UsuarioFormData>();
  languages = LANGUAGES;
  readonly telefoneMask = environment.telefoneMask;
  form = this.fb.group({
    nome: ['', Validators.required],
    username: ['', Validators.required],
    idioma: ['', Validators.required],
    cpf: ['', Validators.required],
    telefone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    senhaNova: [''],
    confirmarSenha: ['']
  }, { validators: [this.formValidator()], updateOn: 'change'});
  errorConfirmPassword: string;
  passFieldsError: string;
  hideSenhaNova = true;
  hideConfirmarSenha = true;

  constructor(private fb: FormBuilder,
              private translate: TranslateService)
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

  updateForm(): void
  {
    const username = this.form.get('username');
    const senhaNova = this.form.get('senhaNova');
    const confirmarSenha = this.form.get('confirmarSenha');
    let validators = [];

    if (this.usuario)
    {
      this.form.patchValue({
        nome: this.usuario.nome,
        idioma: this.usuario.idioma.id,
        cpf: this.usuario.cpf,
        telefone: this.usuario.telefone,
        email: this.usuario.email
      });

      username.disable();
    }
    else
    {
      validators = [Validators.required];
      username.enable();
    }

    senhaNova.clearValidators();
    confirmarSenha.clearValidators();

    senhaNova.setValidators(validators);
    confirmarSenha.setValidators(validators);

    senhaNova.updateValueAndValidity();
    confirmarSenha.updateValueAndValidity();
  }

  onSubmit(): void
  {
    const raw = this.form.getRawValue();
    const data: UsuarioFormData = {
      confirmarSenha: raw.confirmarSenha,
      cpf: raw.cpf,
      email: raw.email,
      idioma: {id: raw.idioma},
      nome: raw.nome,
      senhaNova: raw.senhaNova,
      telefone: raw.telefone,
      username: raw.username
    };
    this.submitForm.emit(data);
  }

  formValidator()
  {
    const passFieldsError = 'error_empty_fields';
    this.passFieldsError = passFieldsError;
    const errorConfirmPassword = 'error_confirm_password';
    this.errorConfirmPassword = errorConfirmPassword;

    return (group: FormGroup): ValidationErrors =>
    {
      const senhaNova = group.get('senhaNova');
      const confirmarSenha = group.get('confirmarSenha');

      let ret = group.errors;

      const senhaNovaEmpty = isStringEmpty(senhaNova.value);
      const confirmarSenhaEmpty = isStringEmpty(confirmarSenha.value);
      if ((!senhaNovaEmpty || !confirmarSenhaEmpty) &&
        !(!senhaNovaEmpty && !confirmarSenhaEmpty))
      {
        ret = withProperty(ret, passFieldsError, true);

        if (!senhaNovaEmpty)
        {
          senhaNova.setErrors(withProperty(senhaNova.errors, passFieldsError, true));
        }
        if (!confirmarSenhaEmpty)
        {
          confirmarSenha.setErrors(withProperty(confirmarSenha.errors, passFieldsError, true));
        }
      }
      else
      {
        ret = withoutProperty(ret, passFieldsError);

        senhaNova.setErrors(withoutProperty(senhaNova.errors, passFieldsError));
        confirmarSenha.setErrors(withoutProperty(confirmarSenha.errors, passFieldsError));
      }

      if (senhaNova.value !== confirmarSenha.value)
      {
        ret = withProperty(ret, errorConfirmPassword, true);

        confirmarSenha.setErrors(withProperty(confirmarSenha.errors, errorConfirmPassword, true));
      }
      else
      {
        ret = withoutProperty(ret, this.errorConfirmPassword);

        confirmarSenha.setErrors(withoutProperty(confirmarSenha.errors, errorConfirmPassword));
      }

      // if (!this.usuario)
      // {
      //   senha.setErrors(withoutProperty(senha.errors, 'required'));
      // }
      // Código de teste
      // for (const key of Object.keys(group.controls))
      // {
      //   console.log(key + ': ');
      //   console.log(group.get(key).errors);
      //   console.log('');
      // }
      return ret;
    };
  }

  getErrorMessage(errString): string
  {
    return this.translate.instant('update_usuario.' + errString);
  }
}
