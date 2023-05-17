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
    const bufferSize = 35;
    this.getScreenWidth = window.innerWidth-bufferSize;
    console.log(this.getScreenHeight)
    this.getScreenHeight = (window.innerWidth-bufferSize)*3/4;
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (this.type == 'default')
      this.calculateDashboardSize();
}

  ngOnInit(): void {
    if (this.type == 'default')
      this.calculateDashboardSize();
    else if (this.type == 'card')
      {this.getScreenWidth = 200
      this.getScreenHeight = 100}
  }
}
