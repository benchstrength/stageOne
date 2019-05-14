import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient) { }

public getDatabase(url: string, searchBody: object, headers: object) {
  if(url && searchBody && headers) {
    this.http.post(url, searchBody, headers).subscribe(data => {
      return data;
    });
  } else {
    return console.error("Invalid database get. Include URL, body, and headers");
  };
}

public sendDatabase(url: string, sendBody: object, headers: object) {
  if(url && sendBody && headers) {
    this.http.post(url, sendBody, headers).subscribe(data => {
      return data
    })
  } else {
    return console.error("Invalid database post. Include URL, body, and headers");
  }
}

}
