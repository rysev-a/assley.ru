import { Injectable } from '@angular/core';

type MessageStatus = 'error' | 'success' | 'info' | 'danger';

export interface Message {
  id: number;
  content: string;
  status: MessageStatus;
  active: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: Message[] = [];

  cool = 'cool data';

  genId(): number {
    return this.messages.length > 0
      ? Math.max(...this.messages.map((message) => message.id)) + 1
      : 11;
  }

  add({
    content,
    status = 'info',
  }: {
    content: string;
    status: MessageStatus;
  }) {
    const message: Message = {
      id: this.genId(),
      content,
      status,
      active: false,
    };
    this.messages.push(message);
    setTimeout(() => {
      message.active = true;
    }, 0);
  }

  clear(id) {
    this.messages = this.messages.filter((message) => {
      return message.id !== id;
    });
  }
}
