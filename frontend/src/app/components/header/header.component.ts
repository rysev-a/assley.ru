import { Component, OnInit } from '@angular/core'
import { faUserPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons'

interface Link {
  url: string
  name: string
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  faUserPlus = faUserPlus
  faSignInAlt = faSignInAlt

  categories: Link[] = [
    { name: 'Манги', url: 'manga' },
    { name: 'Манхвы', url: 'manga' },
    { name: 'Маньхуа', url: 'manga' },
    { name: 'OEL-манги', url: 'manga' },
    { name: 'Руманга', url: 'manga' },
    { name: 'Комикс западный', url: 'manga' },
    { name: 'Синглов', url: 'manga' },
    { name: 'Весь', url: 'manga' },
    { name: 'Случайный тайтл', url: 'manga' },
  ]

  ngOnInit(): void {}
}
