import { Component, OnInit } from '@angular/core';
import { KubeService } from '../../services/kube.service';
import * as fg from 'force-graph';
import { Pod } from '../../services/Models/pod.model';
import { Link } from '../../services/Models/link.model';
import { NodePoint } from '../../services/Models/node.model';
import { BubbleMap } from '../../services/Models/bubble-map.model';

@Component({
  selector: 'node-dashboard-graph',
  templateUrl: './node.dashboard.graph.component.html',
  styleUrl: './node.dashboard.graph.component.scss'
})
export class NodeDashboardGraphComponent {
  pods: Pod[];
  bubbleMap: BubbleMap;

  constructor(private kubeService:KubeService) 
  {
    this.pods = [];
    this.bubbleMap = {nodes: [], links : []};
  }

  ngOnInit(): void {
    this.kubeService.getAllPods().subscribe(response =>
      {
        this.pods = response
        this.bubbleMap = this.MapPodsToJSON();
        const graph = fg.default()
    (document.getElementById('graph')!)
      .graphData(this.bubbleMap)
      .nodeAutoColorBy('group')
      .nodeLabel('id');
      });
  }

  MapPodsToJSON(): BubbleMap {
    const nodesMap: { [id: string]: number } = {};
    const nodes: NodePoint[] = [];
    const links: Link[] = [];
    console.log("hello");
    let groupID = 1;
    console.log(this.pods)
    for (let pod of this.pods) {
      if (!(pod.namespace in nodesMap)) {
          nodesMap[pod.namespace] = groupID;
          groupID++;
      }

      nodes.push({ id: pod.name, group: nodesMap[pod.namespace] });

      // Check if the pod shares a selector with any other pod
      for (let otherPod of this.pods) {
          if (pod !== otherPod && (this.ShareSelector(pod, otherPod) || pod.namespace == otherPod.namespace)) {
              links.push({ source: pod.name, target: otherPod.name, value: 1 });
          }
      }
    }

    const jsonModel: BubbleMap = {
        nodes: nodes,
        links: links
    };

    return jsonModel;
  }

  ShareSelector(pod: Pod, pod2: Pod): boolean {
    return pod.selectors.some(selector => pod2.selectors.includes(selector));
  }
}
