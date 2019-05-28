import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service.spec';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { headersToString } from 'selenium-webdriver/http';

//Retrieve data
const getAllUsersUrl = "/api/getallusers";
const getUserBySkillUrl = "/api/usersbyskill";
const getAdminGraphUrl = "/api/graph";
const getUserByNameUrl = "/api/usersbyname"
const getOneUserUrl = "/api/getoneuser"
//Send Data
const addUserUrl = "/api/newuser";
const addSkillUrl = "/api/add-skill";
const checkPermsUrl = "/api/checkperms"
const authUser = "/api/authuser"

interface GetAllUsers {
  searchItem: string, //this can probably just be hard-coded to always return all the users
}

//Skill to search for - does this need to be an array for multiple skill search option?
interface UsersBySkill {
  skills: string[],
}

//What data does this need to return/search for? Hard code to return all data needed for the entire graph?
interface GetAdminGraph {
  skill: string[],
}

interface AddUser {
  email: string, //email would go here to add that email
  firstName: string,
  lastName: string,
  isEmployee?: string,
  imageUrl?: string
}

//Should this be an array for the ability to add multiple skills in one request?
interface AddSkill {
  skill: object[],
}

interface CheckPerms {
  email: string
}

interface UserByName {
    firstName: string,
    lastName: string
}

interface GetOneUser {
  email: string
}

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

log;

  constructor(private http: HttpClient,
              private auth: AuthService) { }

private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
  
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
  
    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);
  
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

//Set authorization header based off the access token of logged in user
headers = new HttpHeaders().set('Authorization', `Bearer ${this.auth.accessToken}`);

private addHeader(): any {
  return this.headers.append('Permissions', `${sessionStorage.getItem('userEmail')}`) 
}
//Get all users from the database

public getAllUsers(searchBody: GetAllUsers | 'all') {
  return this.http.post(getAllUsersUrl, searchBody, {headers: this.addHeader()}).toPromise();
};

//Get users by skill

public getUserBySkill(searchBody: UsersBySkill) {
  return this.http.post(getUserBySkillUrl, searchBody, {headers: this.addHeader()});
};

//Get admin graph data

public getAdminGraph(searchBody: GetAdminGraph): any {
  return this.http.post(getAdminGraphUrl, searchBody, {headers: this.addHeader()}).toPromise();
}
  

//Add user to the database
public addUser(sendBody: AddUser) {
  return this.http.post(addUserUrl, sendBody, {headers: this.addHeader()}).toPromise();
};

//Add user upon Auth
public authUser(sendBody: AddUser) {
  return this.http.post(authUser, sendBody, {headers: this.addHeader()}).toPromise();
};

//Add skill to database

public addSkill(sendBody: AddSkill) {
  return this.http.post(addSkillUrl, sendBody, {headers: this.addHeader()}).toPromise();
};

public checkPermissions() {
  return this.http.post(checkPermsUrl, {}, {headers: this.addHeader()}).toPromise();
}

public getUsersByName(searchBody: UserByName) {
  return this.http.post(getUserByNameUrl, searchBody, {headers: this.addHeader()}).toPromise();
};

searchHeroes(term: string): Observable<any> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.post(getUserBySkillUrl, {skills: [term]}, {headers: this.addHeader()}).pipe(
    tap(_ => console.log(`found heroes matching "${term}"`)),
    tap(res => console.log(res)),
    catchError(this.handleError<any>('searchHeroes', []))
  );
}

  public getOneUser(sendBody: GetOneUser) {
  return this.http.post(getOneUserUrl, sendBody, {headers: this.addHeader()}).toPromise()
}

}
