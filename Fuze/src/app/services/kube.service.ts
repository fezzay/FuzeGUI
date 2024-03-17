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
    return this.client.get('https://kubernetes.default.svs/api');
  }
}
