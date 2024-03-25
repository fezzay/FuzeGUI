import { Component, OnInit } from '@angular/core';
import { KubeService } from '../../services/kube.service';
import * as fg from 'force-graph';
import { Pod } from '../../services/Models/pod.model';
import { Link } from '../../services/Models/link.model';
import { NodePoint } from '../../services/Models/node.model';
import { BubbleMap } from '../../services/Models/bubble-map.model';
import { Deployment } from '../../services/Models/deployment.model';
import { forceManyBody } from 'd3-force';

@Component({
  selector: 'node-dashboard-graph',
  templateUrl: './node.dashboard.graph.component.html',
  styleUrl: './node.dashboard.graph.component.scss'
})
export class NodeDashboardGraphComponent {
  pods: Pod[];
  deployments: Deployment[];
  bubbleMap: BubbleMap;

  constructor(private kubeService:KubeService) 
  {
    this.pods = [];
    this.deployments = [];
    this.bubbleMap = {nodes: [], links : []};
  }

  ngOnInit(): void {
    (async () => {
      await this.kubeService.getAllPods().subscribe(response =>
        {
          this.pods = response;
        });
  
      await this.kubeService.getAllDeployments().subscribe(response =>
        {
          this.deployments = response;
          this.bubbleMap = this.MapToForceGraph();
          const graph = fg.default()
          (document.getElementById('graph')!)
          .graphData(this.bubbleMap)
          .nodeAutoColorBy('group')
          .nodeLabel('name')
          .nodeVal('val')
          .d3Force('charge', forceManyBody().strength(-110))
        });
    })();
  }

  MapToForceGraph(): BubbleMap {
    const nodesMap: { [id: string]: number } = {};
    const nodes: NodePoint[] = [];
    const links: Link[] = [];
    let groupID = 1;

    for(let deployment of this.deployments) {
      if(!(deployment.namespace in nodesMap)){
        console.log(deployment.selectors)
        nodesMap[deployment.namespace] = groupID;
        groupID++;
      }

      nodes.push({ id: deployment.id, name: deployment.name, group: nodesMap[deployment.namespace], val: 9})
    }

    for (let pod of this.pods) {
      if (!(pod.namespace in nodesMap)) {
        nodesMap[pod.namespace] = groupID;
        groupID++;
      }

      nodes.push({ id: pod.id, name: pod.name, group: nodesMap[pod.namespace], val: 2 });

      for (let otherPod of this.pods) {
        if (pod !== otherPod && (this.ShareSelector(pod, otherPod) || pod.namespace == otherPod.namespace)) {
            links.push({ source: pod.id, target: otherPod.id, value: 1 });
        }
      }

      for(let deployment of this.deployments) {
        if (pod.namespace == deployment.namespace ) {

          links.push({ source: pod.id, target: deployment.id, value: 100 });
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
