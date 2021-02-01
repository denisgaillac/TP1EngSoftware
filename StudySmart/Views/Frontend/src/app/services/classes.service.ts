import { environment } from './../../environments/environment';
import { Class } from './../interfaces/Class';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  baseRoute: string = environment.baseRoute;
  controller: string = "Class/";

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(){
    return new Promise<Class[]>((resolve, reject) => {
      this.httpClient.get<Class[]>(this.baseRoute + this.controller)
      .subscribe(data => {
          resolve(data);
        }, err => {
          reject(err);
      });
    })
  }

  save(newClass: Class): Promise<Class>{
    return new Promise<Class>((resolve, reject) => {
      this.httpClient.post<Class>(this.baseRoute + this.controller + 'CreateClass', newClass)
      .subscribe(data => {
          resolve(data);
        }, err => {
          reject(err);
      });
    })
  }

  update(classToUpdate: Class): Promise<Class>{
    return new Promise<Class>((resolve, reject) => {
      this.httpClient.patch<Class>(this.baseRoute + this.controller + 'UpdateClass', classToUpdate)
      .subscribe(data => {
          resolve(data);
        }, err => {
          reject(err);
      });
    })
  }

  delete(classId: number){
    return new Promise<JSON>((resolve, reject) => {
      this.httpClient.delete<JSON>(this.baseRoute + this.controller + 'DeleteClass/' + classId)
      .subscribe(data => {
          resolve(data);
        }, err => {
          reject(err);
      });
    })
  }

}
