import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeDashboardGraphComponent } from './node.dashboard.graph.component';

describe('NodeDashboardGraphComponent', () => {
  let component: NodeDashboardGraphComponent;
  let fixture: ComponentFixture<NodeDashboardGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NodeDashboardGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NodeDashboardGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
