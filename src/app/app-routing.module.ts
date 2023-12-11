import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddTodosComponent } from './components/add-todos/add-todos.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'app-add-todos',
    component:AddTodosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
