import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesService } from './components/messages/messages.service';
import { LoadingService } from './components/loading/loading.service';

import { FormsModule }   from '@angular/forms';
import { CdkMenuModule } from '@angular/cdk/menu';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { RouterModule } from '@angular/router';

import { LoadingComponent } from './components/loading/loading.component';
import { MessagesComponent } from './components/messages/messages.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { AgoPipe } from './pipes/ago.pipe';
import { CommentDepthPipe } from './pipes/comment-depth';
import { SortByPipe } from './pipes/sort-by.pipe';
import { WrapLinePipe } from './pipes/wrap-line.pipe';
import { BlockquotePipe } from './pipes/blockquote.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { TooltipDirective } from './components/tooltip/tooltip.directive';
// import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { FiltersComponent } from './components/filters/filters.component';
import { PreviewComponent } from './components/preview/preview.component';
import { ReactPopoutComponent } from './components/react-popout/react-popout.component';
import { ServicesModule } from './services/services.module';
import { DialogReportComponent } from './components/dialog-report/dialog-report.component';
import { DialogShareComponent } from './components/dialog-share/dialog-share.component';
import { PreviewLoadingComponent } from './components/preview-loading/preview-loading.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    MessagesComponent,
    LoadingComponent,
    TooltipComponent,
    NavbarComponent,
    SearchInputComponent,
    TooltipDirective,
    SafeUrlPipe,
    SortByPipe,
    WrapLinePipe,
    AgoPipe,
    BlockquotePipe,
    CommentDepthPipe,
    // CheckboxComponent,
    FiltersComponent,
    PreviewComponent,
    DialogReportComponent,
    DialogShareComponent,
    ReactPopoutComponent,
    PreviewLoadingComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    CdkMenuModule,
    CdkAccordionModule,
    FormsModule,
    RouterModule,
    ServicesModule,
  ],
  exports: [
    MessagesComponent,
    LoadingComponent,
    TooltipComponent,
    NavbarComponent,
    SearchInputComponent,
    TooltipDirective,
    SafeUrlPipe,
    SortByPipe,
    WrapLinePipe,
    AgoPipe,
    CommentDepthPipe,
    // CheckboxComponent,
    FiltersComponent,
    PreviewComponent,
    ReactPopoutComponent,
    PreviewLoadingComponent,
    SidebarComponent,
  ],
})
export class SharedModule {}
