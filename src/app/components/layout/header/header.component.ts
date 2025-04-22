import { Component, OnInit } from '@angular/core';
import { objSessionStorage } from '@/app/types/constants/const-session-storage';
import { sessionStorageListValue } from '@/app/utils/func/sessionStorage';
import IObjSessionStorage from '@/app/types/interfaces/interface-session-storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  objSessionStorage: IObjSessionStorage = {
    username: sessionStorageListValue(objSessionStorage.username!),
  }

  constructor() { }

  ngOnInit() { }

}
