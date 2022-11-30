import { Component, OnInit } from '@angular/core';
import { team, member} from './about-team';
@Component({
  templateUrl: './about.component.html'
})
export class AboutComponent {
  members: member[];
  constructor() {
    this.members = team;
  }

  ngOnInit(): void {
  }

}
