import { Component, OnInit } from '@angular/core';
import {UsuarioVO} from '../entities/usuario';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-pagina-home',
  templateUrl: './pagina-home.component.html',
  styleUrls: ['./pagina-home.component.sass']
})
export class PaginaHomeComponent implements OnInit {

  currentUser: UsuarioVO;

  constructor(private authService: AuthService) { }

  ngOnInit(): void
  {
    this.authService.getCurrentUser().subscribe(user => this.currentUser = user);
  }

}
