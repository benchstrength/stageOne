// import { AdminGraphComponent } from '../admin/components/admin-graph/admin-graph.component';
// import { FiltersComponent} from '../admin/components/filters/filters.component';
// import { UserPageComponent } from '../pages/user-page/user-page.component';
import { LoginPageComponent } from '../pages/login-page/login-page.component'
import { AdminPageComponent } from '../pages/admin-page/admin-page.component';
import { UserPageComponent } from '../pages/user-page/user-page.component'
import { AuthGuard } from '../guards/auth.guard'
import { AdminGraphComponent } from '../admin/components/graphs/admin-graph.component';
import { UserAreaComponent } from '../user-area/user-area.component';
import { UnauthorizedComponent } from '../unauthorized/unauthorized.component';
import { PermissionGuard } from '../guards/permission.guard';
import { AdminUserPageComponent } from '../pages/admin-user-page/admin-user-page.component';
import { AdminUserProfileComponent } from '../pages/admin-user-profile/admin-user-profile.component';
import { Stage4Component } from '../stage4/stage4.component'
import { CallbackComponent } from '../callback/callback.component';
 //AuthGuard only allows authenticated users onto the site.
export const Routes = [
    {path: '', component: LoginPageComponent},
    {path: 'admin', canActivate: [AuthGuard], component: AdminPageComponent},
    {path: 'callback', component: CallbackComponent},
    {path: 'home', canActivate: [AuthGuard], component: AdminGraphComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'user', canActivate: [AuthGuard], component: UserPageComponent},
    {path: 'test', component: UserAreaComponent},
    {path: 'unauthorized', component: UnauthorizedComponent},
    {path: 'admin/users', canActivate: [AuthGuard], component: AdminUserPageComponent},
    {path: 'admin/users/:id', component: AdminUserProfileComponent},
    {path: 'stage4', component: Stage4Component},

  ]