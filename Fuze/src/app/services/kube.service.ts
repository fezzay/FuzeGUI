import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pod } from './Models/pod.model';
import { Deployment } from './Models/deployment.model';

@Injectable({
  providedIn: 'root'
})
export class KubeService {

  constructor(public client:HttpClient) 
  { 
  }

  getAllPods(): Observable<Pod[]>
  {
    return this.client.get<Pod[]>('http://192.168.1.55:32535/Kube/Pods');
  }

  getAllDeployments(): Observable<Deployment[]>
  {
    return this.client.get<Deployment[]>('http://192.168.1.55:32535/Kube/Deployments');
  }
}
