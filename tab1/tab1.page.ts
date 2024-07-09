import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../api/weather-api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  city: string = "";
  searchHistory: any[] = [];

  constructor(private weatherApi: WeatherApiService) {}

  ngOnInit() {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      this.searchHistory = JSON.parse(history);
    }
  }

  searchCity() {
    if (this.city) {
      this.weatherApi.searchWeather(this.city).subscribe((data) => {
        this.addToHistory(data);
      });
    }
  }

  addToHistory(weatherData: any) {
    weatherData.isLike = false;
    this.searchHistory.unshift(weatherData);
    if (this.searchHistory.length > 5) {
      this.searchHistory.pop();
    }
    localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
  }

  like(index: number) {
    this.searchHistory[index].isLike = !this.searchHistory[index].isLike;
    localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
  }
}
