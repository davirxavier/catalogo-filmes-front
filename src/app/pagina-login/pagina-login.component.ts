import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {handleConnectionError} from '../util/errorhandling';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-pagina-login',
  templateUrl: './pagina-login.component.html',
  styleUrls: ['./pagina-login.component.sass']
})
export class PaginaLoginComponent implements OnInit
{
  @ViewChild('usuarioInput') usuarioInput: ElementRef;
  @ViewChild('passInput') passInput: ElementRef;
  loading = false;
  hideSenha = true;

  constructor(private authService: AuthService,
              private toastr: ToastrService,
              private translate: TranslateService,
              private router: Router) { }

  ngOnInit(): void
  {
    this.redirectIfLogged();
  }

  redirectIfLogged(): void
  {
    if (this.authService.isLogged())
    {
      this.router.navigate(['home']);
    }
  }

  onLogin(): void
  {
    const user = this.usuarioInput.nativeElement.value;
    const pass = this.passInput.nativeElement.value;

    this.loading = true;
    const obs = this.authService.login(user, pass);
    obs.subscribe(res =>
    {
      this.redirectIfLogged();
      this.loading = false;
    }, err =>
    {
      if (err.status === 403 || err.status === 400)
      {
        this.toastr.error(this.translate.instant('error.incorrect_credentials'));
      }
      else if (err.status === 401)
      {
        this.toastr.error(this.translate.instant('error.deactivated_user'));
      }
      else
      {
        this.toastr.error(this.translate.instant('error.error'));
      }
      console.error(err);

      this.loading = false;
    });
    handleConnectionError(obs, this.translate, this.toastr, this.router, false, 'login');
  }
}
