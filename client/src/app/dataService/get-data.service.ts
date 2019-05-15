import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const getAllUsersUrl = "/api/getallusers";
const getUserBySkillUrl = "/api/usersbyskill";
const getAdminGraphUrl = "/api/graphdata";

const addUserUrl = "/api/newuser";
const addSkillUrl = "/api/newskill";

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient) { }

//Get all users from the database

public getAllUsers(searchBody: object, headers: object) {
  if(searchBody && headers) {
    this.http.post(getAllUsersUrl, searchBody, headers).subscribe(data => {
      return data;
    });
  } else {
    return console.error("Invalid database get. Include URL, body, and headers");
  };
}

//Get users by skill

public getUserBySkill(searchBody: object, headers: object) {
  if(searchBody && headers) {
    this.http.post(getUserBySkillUrl, searchBody, headers).subscribe(data => {
      return data;
    });
  } else {
    return console.error("Invalid database get. Include body, and headers");
  };
}

//Get admin graph data

public getAdminGraph(searchBody: object, headers: object) {
  if(searchBody && headers) {
    this.http.post(getUserBySkillUrl, searchBody, headers).subscribe(data => {
      return data;
    });
  } else {
    return console.error("Invalid database get. Include body and headers");
  };
}
  

//Add user to the database
public sendDatabase(sendBody: object, headers: object) {
  if(sendBody && headers) {
    this.http.post(addUserUrl, sendBody, headers).subscribe(data => {
      return data
    })
  } else {
    return console.error("Invalid database post. Include body and headers");
  }
}

//Add skill to database

public addSkill(sendBody: object, headers: object) {
  if(sendBody && headers) {
    this.http.post(addUserUrl, sendBody, headers).subscribe(data => {
      return data
    })
  } else {
    return console.error("Invalid database post. Include body and headers");
  }
}

}
