import { GraphComponent } from '../graph/graph.component';
import { UserComponent } from '../user/user.component';
import { LoginComponent } from '../login/login.component';

export const Routes = [
    {path: '', component: UserComponent, GraphComponent},
    {path: 'home', component: GraphComponent},
    {path: 'callback', component: UserComponent},
    {path: 'logout', component: LoginComponent},
    {path: 'login', component: LoginComponent}
  ]