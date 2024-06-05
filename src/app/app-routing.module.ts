import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddViagemComponent } from './components/add-viagem/add-viagem.component';
import { AddGastoComponent } from './components/addGastos/add-gasto/add-gasto.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TabelaGastosComponent } from './components/tabela-gastos/tabela-gastos.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { BoasVindasComponent } from './layout/boas-vindas/boas-vindas.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './service/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  {
    path: 'main',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [


      {
        path: '',
        component: BoasVindasComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'addGasto/:idviagem/:lugar',
        component: AddGastoComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'gastos/:id',
        component: TabelaGastosComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'add',
        component: AddViagemComponent,
        canActivate: [AuthGuard]
      }

    ]
  }

]

;

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
