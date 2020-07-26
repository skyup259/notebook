import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  dataStatus: string;

  constructor(public globalService: GlobalService) { }

  async ngOnInit() {
    if(!localStorage.getItem('data')) {
      await this.globalService.getNotebookData().toPromise();
    }
    if(Object.keys(this.globalService.notebookData).length === 0 ) {
      this.globalService.notebookData = JSON.parse(localStorage.getItem('data'));
      this.globalService.notebookData['notebook'].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }
  }

  notebookBoxClicked(index): void {
    if( JSON.stringify(this.globalService.notebookData) !== localStorage.getItem('data')) {
      this.globalService.notebookData['notebook'][this.globalService.notebookIndex].timestamp = Date.now();
      this.upateChangeData();
    }
    
    this.globalService.notebookIndex = index;
  }

  upateChangeData(): void {
    localStorage.setItem('data', JSON.stringify(this.globalService.notebookData))
  }

  showDateTime (recorddate) {
    const diff = Date.now()-recorddate;
    if(diff <= 86400000) {
      this.dataStatus = 'h:mm a';
    } else if(diff <= 604800000) {
      this.dataStatus = 'EEEE';
    } else {
      this.dataStatus = 'MM/d/yyyy';
    }

    return true
  }

}
