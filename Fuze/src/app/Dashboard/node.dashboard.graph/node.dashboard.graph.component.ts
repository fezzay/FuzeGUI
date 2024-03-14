import { Component, OnInit } from '@angular/core';
import * as fg from 'force-graph';
@Component({
  selector: 'node-dashboard-graph',
  templateUrl: './node.dashboard.graph.component.html',
  styleUrl: './node.dashboard.graph.component.scss'
})
export class NodeDashboardGraphComponent {

  constructor() {}

  ngOnInit(): void {
    fetch('assets/fakeData.json').then(res => res.json()).then(data => {
      const graph = fg.default()
    (document.getElementById('graph')!)
      .graphData(data)
    });
  }
}
