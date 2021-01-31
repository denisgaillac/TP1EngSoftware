import { environment } from './../../environments/environment';
import { Activity } from './../interfaces/Activity';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  baseRoute: string = environment.baseRoute;
  controller: string = "Activities/";

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(){
    return new Promise<Activity[]>((resolve, reject) => {
      this.httpClient.get<Activity[]>(this.baseRoute + this.controller)
      .subscribe(data => {
          data.forEach(act => {
            act.expirationDate = new Date(act.expirationDate);
            act.conclusionDate = act.conclusionDate ? new Date(act.conclusionDate) : null;
          });
          resolve(data);
        }, err => {
          reject(err);
      });
    })
  }

  save(activity: Activity): Promise<Activity>{
    return new Promise<Activity>((resolve, reject) => {
      this.httpClient.post<Activity>(this.baseRoute + this.controller + 'CreateActivity', activity)
      .subscribe(data => {
          data.expirationDate = new Date(new Date(data.expirationDate).setHours(0,0,0,0));
          data.conclusionDate = data.conclusionDate ? new Date(new Date(data.conclusionDate).setHours(0,0,0,0)) : null;
          resolve(data);
        }, err => {
          reject(err);
      });
    })
  }

  update(activity: Activity): Promise<Activity>{
    return new Promise<Activity>((resolve, reject) => {
      this.httpClient.patch<Activity>(this.baseRoute + this.controller + 'UpdateActivity', activity)
      .subscribe(data => {
          data.expirationDate = new Date(data.expirationDate);
          data.conclusionDate = data.conclusionDate ? new Date(data.conclusionDate) : null;
          resolve(data);
        }, err => {
          reject(err);
      });
    })
  }

  delete(activityId: number){
    return new Promise<JSON>((resolve, reject) => {
      this.httpClient.delete<JSON>(this.baseRoute + this.controller + 'DeleteActivity/' + activityId)
      .subscribe(data => {
          resolve(data);
        }, err => {
          reject(err);
      });
    })
  }

}
