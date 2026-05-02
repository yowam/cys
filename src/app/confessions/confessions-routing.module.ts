import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SingularComponent } from './singular/singular.component';
import { ConfessionResolver } from './services/confession.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: ':confessionId/:slug',
        component: SingularComponent,
        outlet: 'modal',
        resolve: {
          confession: ConfessionResolver,
        },
      },
    ],
  },
  {
    path: ':confessionId/:slug',
    component: SingularComponent,
    resolve: {
      confession: ConfessionResolver,
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [
    ConfessionResolver,
  ],
})
export class ConfessionsRoutingModule {}
