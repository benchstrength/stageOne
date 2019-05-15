import { GraphComponent } from '../graph/graph.component';
import { UserComponent } from '../user/user.component';
import { LoginComponent } from '../login/login.component';
import { LoginPageComponent } from '../pages/login-page/login-page.component'
import { AdminPageComponent } from '../pages/admin-page/admin-page.component';

export const Routes = [
    {path: '', component: UserComponent},
    {path: 'admin', component: AdminPageComponent},
    {path: 'callback', component: UserComponent},
    {path: 'logout', component: LoginComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'user', component: UserComponent}
  ]