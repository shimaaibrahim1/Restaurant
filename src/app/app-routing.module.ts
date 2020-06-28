import { NgModule } from '@angular/core';
import { Routes, RouterModule , CanActivate} from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import {ReservationComponent} from './reservation/reservation.component';
import {AvailableTablesComponent} from './available-tables/available-tables.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'user',
   component: UserHomeComponent,
   canActivate: [AuthGuard],
    data: { 
      expectedRole: 'USER'
    }  
  },
  { path: 'admin', component: AdminHomeComponent,
    canActivate: [AuthGuard],
    data: { 
      expectedRole: 'ADMIN'
    }   
  },
  { path: 'admin-books', component: ReservationComponent,
    canActivate: [AuthGuard],
    data: { 
      expectedRole: 'ADMIN'
    }  
  },
  { path: 'available', component: AvailableTablesComponent,
    canActivate: [AuthGuard],
    data: { 
      expectedRole: 'USER'
    }  
 },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
