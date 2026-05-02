import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { RulesComponent } from './rules/rules.component';
import { UaComponent } from './ua/ua.component';
import { ModeratorCocComponent } from './moderator-coc/moderator-coc.component';
import { PrivacyComponent } from './privacy/privacy.component';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
    children: [
      {
        path: '',
        redirectTo: 'content-policy',
        pathMatch: 'full'
      },
      {
        path: 'content-policy',
        title: 'Content Policy',
        component: RulesComponent,
      },
      {
        path: 'user-agreement',
        title: 'User Agreement',
        component: UaComponent,
      },
      {
        path: 'moderator-code-of-conduct',
        title: 'Code of Conduct',
        component: ModeratorCocComponent,
      },
      {
        path: 'privacy-policy',
        title: 'Privacy Policy',
        component: PrivacyComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AboutRoutingModule {}
