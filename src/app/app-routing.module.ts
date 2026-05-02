import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSerializer } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostComponent } from './post/post.component';
import { ContactComponent } from './contact/contact.component';

import { CanLoadAuthGuard } from './services/can-load-auth.guard';
import { CustomPreloadingStrategy } from './services/custom-preloading.strategy';
import { ConfirmExitGuard } from './services/confirm-exit.guard';
import { AuthGuard } from './services/auth.guard';
import { CustomUrlSerializer } from './services/custom-url-serializer';

const customUrlSerializer = new CustomUrlSerializer();
const CustomUrlSerializerProvider = {
  provide: UrlSerializer,
  useValue: customUrlSerializer
};

const routes: Routes = [
  {
    path: '',
    redirectTo: '/confessions',
    pathMatch: 'full',
  },
  {
    path: 'confessions',
    loadChildren: () =>
      import('./confessions/confessions.module').then(m => m.ConfessionsModule),
    // canLoad: [CanLoadAuthGuard]
    data: {
      preload: false,
    },
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./confessions/confessions.module').then(m => m.ConfessionsModule),
    // canLoad: [CanLoadAuthGuard]
    data: {
      preload: false,
    },
  },
  {
    path: 'post',
    component: PostComponent,
    title: 'Confess Your Sin',
    canDeactivate: [ConfirmExitGuard],
    // canActivate: [AuthGuard],
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then(m => m.AccountModule),
    canActivate: [AuthGuard],
    data: {
      preload: false,
    },
  },
  {
    path: 'tags',
    loadChildren: () =>
      import('./tags/tags.module').then(m => m.TagsModule),
    data: {
      preload: false,
    },
  },
  {
    path: 'contact',
    title: 'Contact Us',
    component: ContactComponent,
  },
  {
    path: 'policies',
    loadChildren: () =>
      import('./about/about.module').then(m => m.AboutModule),
    data: {
      preload: false,
    },
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomPreloadingStrategy,
      scrollPositionRestoration: 'enabled',
      paramsInheritanceStrategy: 'always',
    }),
  ],
  exports: [RouterModule],
  providers: [
    CanLoadAuthGuard,
    CustomPreloadingStrategy,
    ConfirmExitGuard,
    AuthGuard,
    CustomUrlSerializerProvider,
  ],
})
export class AppRoutingModule {}
