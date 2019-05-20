import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service.spec';
import { InternalFormsSharedModule } from '@angular/forms/src/directives';

//Retrieve data
const getAllUsersUrl = "/api/getallusers";
const getUserBySkillUrl = "/api/usersbyskill";
const getAdminGraphUrl = "/api/graph";
//Send Data
const addUserUrl = "/api/newuser";
const addSkillUrl = "/api/newskill";

interface GetAllUsers {
  searchItem: string, //this can probably just be hard-coded to always return all the users
}

//Skill to search for - does this need to be an array for multiple skill search option?
interface UsersBySkill {
  skill: string[],
}

//What data does this need to return/search for? Hard code to return all data needed for the entire graph?
interface GetAdminGraph {
  skill: string[],
}

interface AddUser {
  userEmail: string, //email would go here to add that email
  firstName: string,
  lastName: string
}

//Should this be an array for the ability to add multiple skills in one request?
interface AddSkill {
  skill: object[],
}

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient,
              private auth: AuthService) { }

//Set authorization header based off the access token of logged in user
headers = new HttpHeaders().set('Authorization', `Bearer ${this.auth.accessToken}`)

//Get all users from the database

public async getAllUsers(searchBody: GetAllUsers | 'all') {
  return this.http.post(getAllUsersUrl, searchBody, {headers: this.headers}).toPromise();
};

//Get users by skill

public getUserBySkill(searchBody: UsersBySkill) {
  return this.http.post(getUserBySkillUrl, searchBody, {headers: this.headers}).toPromise();
};

//Get admin graph data

public getAdminGraph(searchBody: GetAdminGraph): any {
  return this.http.post(getAdminGraphUrl, searchBody, {headers: this.headers}).toPromise();
}
  

//Add user to the database
public sendDatabase(sendBody: AddUser) {
  return this.http.post(addSkillUrl, sendBody, {headers: this.headers}).toPromise();
};

//Add skill to database

public addSkill(sendBody: AddSkill) {
  return this.http.post(addUserUrl, sendBody, {headers: this.headers}).toPromise();
};

}
