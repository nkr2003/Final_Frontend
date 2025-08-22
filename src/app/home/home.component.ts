import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone:false,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // You can add properties here if needed
  upcomingEvents = [
    { name: 'Music Concert', location: 'City Hall' },
    { name: 'Tech Meetup', location: 'Tech Park' },
    { name: 'Art Exhibition', location: 'Art Gallery' }
  ];
}
