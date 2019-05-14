import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const sendDatabaseUrl = ""
const getDatabaseUrl = ""

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient) { }
//Return data from the database on the server
public getDatabase(searchBody: object, headers: object) {
  if(searchBody && headers) {
    this.http.post(getDatabaseUrl, searchBody, headers).subscribe(data => {
      return data;
    });
  } else {
    return console.error("Invalid database get. Include URL, body, and headers");
  };
}
//Send data to the database from the server
public sendDatabase(sendBody: object, headers: object) {
  if(sendBody && headers) {
    this.http.post(sendDatabaseUrl, sendBody, headers).subscribe(data => {
      return data
    })
  } else {
    return console.error("Invalid database post. Include URL, body, and headers");
  }
}

}
