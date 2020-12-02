import {
  BrowserModule,
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BsDatepickerModule, BsDropdownModule, ButtonsModule, PaginationModule, TabsModule } from "ngx-bootstrap";
import { RouterModule } from "@angular/router";
import { JwtModule } from "@auth0/angular-jwt";
import { NgxGalleryModule } from "ngx-gallery";
import { FileUploadModule } from 'ng2-file-upload';
import { AppComponent } from "./app.component";
import { NavComponent } from "./nav/nav.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "./_services/auth.service";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { ErrorInterceptorProvider } from "./_services/error.interceptor";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ListsComponent } from "./lists/lists.component";
import { MessagesComponent } from "./messages/messages.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { appRoutes } from "./routes";
import { MemberCardComponent } from "./members/member-card/member-card.component";
import { MemberDetailComponent } from "./members/member-detail/member-detail.component";
import { MemberDetailResolver } from "./_resolver/member-detail.resolver";
import { MemberListResolver } from "./_resolver/member-list.resolver";
import { MemberEditComponent } from "./members/member-edit/member-edit.component";
import { MemberEditResolver } from "./_resolver/member-edit.resolver";
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { ListsResolver } from './_resolver/lists.resolver';
import { MessagesResolver } from './_resolver/messages.resolver';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}
export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    pinch: { enable: false },
    rotate: { enable: false },
  };
}
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    ListsComponent,
    MessagesComponent,
    MemberListComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TimeAgoPipe,
    MemberMessagesComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGalleryModule,
    FileUploadModule,
    BrowserAnimationsModule,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    TabsModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"],
        disallowedRoutes: ["localhost:5001/api/auth"],
      },
    }),
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig },
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    PreventUnsavedChanges,
    ListsResolver,
    MessagesResolver
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
