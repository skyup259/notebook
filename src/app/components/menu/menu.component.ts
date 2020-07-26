import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  constructor(public globalService: GlobalService) { }

  ngOnInit(): void {
    this.globalService.currentTime = Date.now();
  }

  deleteNote(){
    this.globalService.notebookData['notebook'].splice(this.globalService.notebookIndex, 1);
  }

  newNote() {
    this.globalService.currentTime = Date.now();
    const note = {
      "timestamp" : this.globalService.currentTime,
      "msg": "New Note ",
      "addtitionalText": ""
    };
    this.globalService.notebookData['notebook'].unshift(note);
  }

}
