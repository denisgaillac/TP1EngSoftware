import { Activity } from './../interfaces/Activity';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  baseRoute: string = "http://localhost:5001/";

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(){
    return new Promise<Activity[]>((resolve, reject) => {
      this.httpClient.get<Activity[]>(this.baseRoute + 'Activities')
      .subscribe(data => {
          resolve(data);
        }, err => {
          reject(err);
      });
    })
  }

}
