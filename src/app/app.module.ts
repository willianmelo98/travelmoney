import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
import { AddGastoComponent } from './components/addGastos/add-gasto/add-gasto.component';
import { AddViagemComponent } from './components/add-viagem/add-viagem.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabelaGastosComponent } from './components/tabela-gastos/tabela-gastos.component';
import { CardGastoComponent } from './components/tabela-gastos/card-gasto/card-gasto.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import {MatExpansionModule} from '@angular/material/expansion';
import { EditarGastoComponent } from './components/tabela-gastos/card-gasto/editar-gasto/editar-gasto.component';
import {MatDialogModule} from '@angular/material/dialog';
import { BoasVindasComponent } from './layout/boas-vindas/boas-vindas.component';
import {MatDividerModule} from '@angular/material/divider';
import { EditarViagemComponent } from './layout/editar-viagem/editar-viagem.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AddGastoComponent,
    AddViagemComponent,
    TabelaGastosComponent,
    CardGastoComponent,
    EditarGastoComponent,
    BoasVindasComponent,
    EditarViagemComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatExpansionModule,
    FormsModule,
    MatButtonToggleModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
