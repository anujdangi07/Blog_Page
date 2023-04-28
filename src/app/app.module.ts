import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule} from '@angular/fire/compat'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { CreateComponent } from './component/create/create.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { ViewPageComponent } from './component/view-page/view-page.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    DashboardComponent,
    CreateComponent,
    NavbarComponent,
    AddArticleComponent,
    ViewPageComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCDOxr6fNMBq5OTi1s-MFXOkhfC3mkKjlA",
      authDomain: "authentication-system-87b1d.firebaseapp.com",
      projectId: "authentication-system-87b1d",
      storageBucket: "authentication-system-87b1d.appspot.com",
      messagingSenderId: "272162707023",
      appId: "1:272162707023:web:0f799892ae64d7d5b0fc3a",
      measurementId: "G-7K4XK2JB13"
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
