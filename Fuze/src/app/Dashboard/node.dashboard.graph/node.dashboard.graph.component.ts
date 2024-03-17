import { Component, OnInit } from '@angular/core';
import { KubeService } from '../../services/kube.service';
import * as fg from 'force-graph';
@Component({
  selector: 'node-dashboard-graph',
  templateUrl: './node.dashboard.graph.component.html',
  styleUrl: './node.dashboard.graph.component.scss'
})
export class NodeDashboardGraphComponent {

  constructor(private kubeService:KubeService) {}

  ngOnInit(): void {
    fetch('assets/fakeData.json').then(res => res.json()).then(data => {
      const graph = fg.default()
    (document.getElementById('graph')!)
      .graphData(data)
      .nodeLabel('id')
    });
    this.kubeService.getAllPods().subscribe(data =>
      {
        console.log(data);
      });
  }
}
