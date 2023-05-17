import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-tableau-embedded-viz',
  templateUrl: './tableau-embedded-viz.component.html',
  styleUrls: ['./tableau-embedded-viz.component.scss']
})
export class TableauEmbeddedVizComponent implements OnInit {
  constructor() { }

  // Inherit attributes from the parent component
  @Input() dashboardIndex = 0;
  @Input() toolbar = 'hidden';
  @Input() vizUrl = '';
  @Input() type   = 'default'

  // Dashboard properties
  public VizIndex = 'Tableau-Viz-' + this.dashboardIndex;
  // Handle dashboard resizing
  public getScreenWidth: any;
  public getScreenHeight: any;
  private calculateDashboardSize = () => {
    const bufferSize = 70;
    this.getScreenWidth = window.innerWidth-bufferSize;
    this.getScreenHeight = window.innerHeight-bufferSize;
    console.log(this.getScreenHeight)
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.calculateDashboardSize();
}

  ngOnInit(): void {
    this.calculateDashboardSize();
  }
}
