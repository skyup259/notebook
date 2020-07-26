import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  notebookData = {};
  checking = '';
  notebookIndex = 0;
  currentTime: any;
  searchInput = '';
  // deployment 'assets/data.json';
  private jsonIndexLocation = '../../assets/data.json';

  constructor(public httpClient: HttpClient) { }

  getNotebookData(): Observable<void> {
    return this.httpClient.get(this.jsonIndexLocation).pipe(
      map(response => {
        this.notebookData = response;
        this.notebookData['notebook'].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        localStorage.setItem('data', JSON.stringify(response));
      })
    );
  }

}
