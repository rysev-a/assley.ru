import { Component, OnInit } from '@angular/core'
import {
  faEnvelope,
  faLock,
  faUserPlus,
  faUser,
} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass'],
})
export class SignupComponent implements OnInit {
  faEnvelope = faEnvelope
  faLock = faLock
  faUserPlus = faUserPlus
  faUser = faUser

  constructor() {}

  ngOnInit(): void {}
}
