import { Component, OnInit } from '@angular/core'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  constructor() {}

  faEnvelope = faEnvelope
  faLock = faLock

  ngOnInit(): void {}
}
