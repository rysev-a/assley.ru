import { ErrorHandler, Injectable } from '@angular/core';
import { MessageService } from '../services/message.service';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  constructor(private messageService: MessageService) {}
  handleError(error) {
    this.messageService.add({
      status: 'danger',
      content: 'Что-то не так с сервисом, попробуйте перезагрузить страницу',
    });
  }
}
