import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';
import { RulesComponent } from './rules/rules.component';
import { UaComponent } from './ua/ua.component';
import { ModeratorCocComponent } from './moderator-coc/moderator-coc.component';
import { PrivacyComponent } from './privacy/privacy.component';

@NgModule({
  declarations: [
    AboutComponent,
    RulesComponent,
    UaComponent,
    ModeratorCocComponent,
    PrivacyComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
  ],
  providers: [],
})
export class AboutModule {}
