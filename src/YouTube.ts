import {Http, HttpConfig} from 'http/http';
import {Injectable} from 'angular2/angular2';
import {Observable} from 'rx'

const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_TOKEN = 'AIzaSyAJk1xUI72YYfBMgEc84gjHUX-k2AN6-B0';

@Injectable()
export class YouTubeAPI {
  constructor(http:Http){
    this.http = http;
  }
  
  search(query){
    //wouldnt need this if .partition was in angular2's rx :(
    if(!query.length){
      return Observable.just([])
    }
    return this.http.get(`${BASE_URL}?q=${query}&part=snippet&key=${API_TOKEN}`)
     .toRx()
     .map(res => res.json())
     .map(json => json.items);
  }
}