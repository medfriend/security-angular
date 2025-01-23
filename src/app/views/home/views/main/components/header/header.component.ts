import {Component, OnInit} from '@angular/core';
import { MatIconModule } from '@angular/material/icon'
import { BasicPopupComponent } from '../../../../../../components/popupList/basic-popup/basic-popup.component';
import { UserListComponent } from '../../../../../../components/list/user-list/user-list.component';
import { Router } from '@angular/router';
import { clearToken } from '../../../../../../store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../../../../store/auth/auth.state';
import { StorageService } from '../../../../../../util/localstorage/localstorage.service';
import {sharedModules} from "../../../../../../shared/shared.module";
import {enviroment} from "../../../../../../enviroment/service.enviroment";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ... sharedModules,
    BasicPopupComponent,
    UserListComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isUserArrowActive: boolean = false;
  username = ""

  enviromentP = enviroment

  constructor(
    private router: Router,
    private store: Store<{ auth: AuthState }>,
    private localstorageService: StorageService
  ){}

  ngOnInit() {
    this.getUserInfo()
  }

  getUserInfo(){
    const userInfo = this.localstorageService.getItem('userInfo')

    // @ts-ignore
    this.username = userInfo.user.nombre_1;
  }

  userArrowActive(){
    this.isUserArrowActive = true
  }

  userArrowDeactive(){
    this.isUserArrowActive = false
  }

  navegateHome() {
    this.router.navigate([`/home`])
  }

  logoutHandler(){
    this.store.dispatch(clearToken())
    this.localstorageService.clear()

    const prefix = this.enviromentP.https ? 'https://' : 'http://'

    window.location.href = prefix + this.enviromentP.admin + '/login'

  }
}
