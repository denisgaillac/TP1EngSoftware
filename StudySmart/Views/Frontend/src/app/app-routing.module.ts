import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerformanceComponent } from "./performance/performance.component";
import { ActivitiesComponent } from "./activities/activities.component";

const routes: Routes = [
  {
    path: "",
    component: ActivitiesComponent
  },
  {
    path:"performance",
    component: PerformanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
