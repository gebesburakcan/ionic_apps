import { Component ,OnInit} from '@angular/core';
import { WeatherApiService } from '../api/weather-api.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})//implements OnInit ekledik alta
export class Tab2Page implements OnInit {
  icon:string ="heart-outline";
  isLike:boolean = false;
  fetchData:any;
  fetch5DaysData:any=null;
  city:string = "";
  country : string = "";
  deg:string = "";
  statu:string = "";
  wind:string = "";
  windDeg : string = "";
  currentIcon : string ="";
  humidity:string = "";
  icon1:string ="";

  constructor(private weatherApi: WeatherApiService) {}

  ngOnInit(): void {
      console.log('ng on init çalıştı');
      this.getCurrentPossition().then((coordinates)=>{
        //console.log(coordinates);
        this.getCurrentWeather(coordinates.coords.longitude,coordinates.coords.latitude);
        this.getFiveDaysWeather(coordinates.coords.longitude,coordinates.coords.latitude);
        //this.watchPossition();
      });
      
  }

  async getCurrentPossition(){
      const coordinates = await Geolocation.getCurrentPosition();
      return coordinates;
  }



    async watchPosition(){
      await Geolocation.watchPosition({enableHighAccuracy: true, timeout: 1000},(position,err) =>{
        try{
        if(position){
          
          this.getCurrentWeather(position?.coords.longitude,position?.coords.latitude);
          this.getFiveDaysWeather(position?.coords.longitude,position?.coords.latitude);
        }
          }catch(error){
            
        }
      });
    }



  getCurrentWeather(lat:any,lon:any){
    this.weatherApi.getCurrentWeather(lat,lon).subscribe(
      (data) => {
        console.log(data);
        this.fetchData = data;
        this.city = this.fetchData.name;
        this.country = this.fetchData.sys.country;
        this.statu = this.fetchData.weather[0].description;
        this.deg = this.fetchData.main.temp;
        this.wind = this.fetchData.wind.speed;
        this.humidity = this.fetchData.main.humidity;
        if(this.fetchData.weather[0].main == "Clear") this.currentIcon="sunny";
        else if(this.fetchData.weather[0].main == "Sunny") this.currentIcon="sunny";
        else if(this.fetchData.weather[0].main == "Rainy") this.currentIcon="rainy";
       // this.currentIcon = "https://openweathermap.org/img/w/"+this.fetchData.weather[0].icon+".png";
      }
    );
  }
  getFiveDaysWeather(lat:any,lon:any){
    this.weatherApi.getFiveDaysWeather(lat,lon).subscribe(
      (data) => {
        this.fetch5DaysData = data;
      }
    );
  }

  like(){
    if(this.isLike==false){
      this.isLike=true;
      this.icon = "heart";
    }else{
      this.isLike=false;
      this.icon = "heart-outline";
    }
  }

}
