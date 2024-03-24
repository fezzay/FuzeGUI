import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pod } from './Models/pod.model';

@Injectable({
  providedIn: 'root'
})
export class KubeService {

  constructor(public client:HttpClient) 
  { 
  }

  getAllPods(): Observable<Pod[]>
  {
    return this.client.get<Pod[]>('http://localhost:5000/Kube/Pods');
  }
}
