import { ClassesComponent } from './components/classes/classes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerformanceComponent } from "./components/performance/performance.component";
import { ActivitiesComponent } from "./components/activities/activities.component";

const routes: Routes = [
  {
    path: "",
    component: ActivitiesComponent
  },
  {
    path:"desempenho",
    component: PerformanceComponent
  },
  {
    path:"materias",
    component: ClassesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
