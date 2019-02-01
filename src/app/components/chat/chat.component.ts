import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/shared/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message: String;
  messages: string[] = [];
  constructor( private chatService: ChatService) { }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }
  ngOnInit() {
    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        this.messages.push(message);
      });
  }
}
