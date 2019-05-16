import { AdminGraphComponent } from '../admin/components/admin-graph/admin-graph.component';
// import { FiltersComponent} from '../admin/components/filters/filters.component';
import { UserComponent } from '../user/user.component';
import { LoginComponent } from '../login/login.component';
import { AdminComponent } from '../admin/admin.component'

export const Routes = [
    {path: '', component: UserComponent},
    {path: 'home', component: AdminGraphComponent},
    {path: 'callback', component: UserComponent},
    {path: 'logout', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'admin', component: AdminComponent},
  ]