import { Component, Inject, OnInit } from '@angular/core';
import { SignalRService } from '../services/signal-r.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private signalrService: SignalRService) {

  }

  ngOnInit(): void {
    console.log("ng on init home");
    this.signalrService.startConnection().then(() => {
      console.log("connected");
      this.signalrService.listenToAllFeeds();

      this.http.get<WeatherForecast[]>(this.baseUrl + 'weatherforecast').subscribe(result => {
        console.log(result);
      }, error => console.error(error));
    });

  }
}


interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
