import { GraphComponent } from '../graph/graph.component';
import { UserComponent } from '../user/user.component';
import { LoginPageComponent } from '../pages/login-page/login-page.component'
import { AdminPageComponent } from '../pages/admin-page/admin-page.component';
import { UserPageComponent } from '../pages/user-page/user-page.component'
import { AuthGuard } from '../guards/auth.guard'
import { AdminGraphComponent } from '../admin/components/admin-graph/admin-graph.component';
 //AuthGuard only allows authenticated users onto the site.
export const Routes = [
    {path: '',component: AdminGraphComponent},
    {path: 'admin', canActivate: [AuthGuard], component: AdminPageComponent},
    {path: 'callback', component: UserComponent},
    {path: 'home', canActivate: [AuthGuard], component: AdminGraphComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'user', canActivate: [AuthGuard], component: UserPageComponent}
  ]