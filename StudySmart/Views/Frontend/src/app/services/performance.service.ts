import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  baseRoute: string = environment.baseRoute;
  controller: string = "Performance/";

  constructor(
    private httpClient: HttpClient,
    private snackBar: MatSnackBar
    ) { }

  getProgressLastWeek(){
    return new Promise<any[]>((resolve, reject) => {
      this.httpClient.get<any[]>(this.baseRoute + this.controller)
      .subscribe(data => {
          resolve(data);
        }, err => {
          reject(err);
      });
    })
  }

  getProgress(filter: any) {
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.baseRoute + this.controller + 'filter', filter)
      .subscribe(data => {
          resolve(data);
      }, err => {
          reject(err);
      });
    });
  }
  
}

