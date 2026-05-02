import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
// import { RecaptchaModule } from 'ng-recaptcha';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from './shared/shared.module';
import { PostComponent } from './post/post.component';
import { DetailsComponent } from './account/details/details.component';
import { NotificationsComponent } from './account/notifications/notifications.component';
import { FaqComponent } from './faq/faq.component';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';

@NgModule({ declarations: [
        AppComponent,
        LoginComponent,
        DialogLoginComponent,
        PageNotFoundComponent,
        PostComponent,
        DetailsComponent,
        NotificationsComponent,
        FaqComponent,
        ContactComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule], providers: [provideHttpClient(withInterceptorsFromDi())] })

export class AppModule {}
