import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Retrieve data
const getAllUsersUrl = "/api/getallusers";
const getUserBySkillUrl = "/api/usersbyskill";
const getAdminGraphUrl = "/api/graphdata";
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
  skill: string[],
}

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient) { }

//Get all users from the database

public getAllUsers(searchBody: GetAllUsers | 'all', headers: object) {
  
  if(searchBody && headers) {
    this.http.post(getAllUsersUrl, searchBody, headers).subscribe(data => {
      return data;
    });
  } 
  else {
    return console.error("Invalid database get. Include body and headers");
  };
}

//Get users by skill

public getUserBySkill(searchBody: UsersBySkill, headers: object) {
  if(searchBody && headers) {
    this.http.post(getUserBySkillUrl, searchBody, headers).subscribe(data => {
      return data;
    });
  } 
  else {
    return console.error("Invalid database get. Include body, and headers");
  };
}

//Get admin graph data

public getAdminGraph(searchBody: GetAdminGraph, headers: object) {
  if(searchBody && headers) {
    this.http.post(getAdminGraphUrl, searchBody, headers).subscribe(data => {
      return data;
    });
  } 
  else {
    return console.error("Invalid database get. Include body and headers");
  };
}
  

//Add user to the database
public sendDatabase(sendBody: AddUser, headers: object) {
  if(sendBody && headers) {
    this.http.post(addSkillUrl, sendBody, headers).subscribe(data => {
      return data
    })
  } 
  else {
    return console.error("Invalid database post. Include body and headers");
  }
}

//Add skill to database

public addSkill(sendBody: AddSkill, headers: object) {
  if(sendBody && headers) {
    this.http.post(addUserUrl, sendBody, headers).subscribe(data => {
      return data
    })
  } 
  else {
    return console.error("Invalid database post. Include body and headers");
  }
}

}
