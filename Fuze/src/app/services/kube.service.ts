import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KubeService {

  constructor(private client:HttpClient) 
  { 
  }

  getAllPods()
  {
    return this.client.get('https:10.43.0.1:443/api');
  }
}
