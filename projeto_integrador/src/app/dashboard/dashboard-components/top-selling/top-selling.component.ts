import { Component, OnInit } from '@angular/core';
import {Product,TopSelling} from './top-selling-data';
import { Loader } from '@googlemaps/js-api-loader';
import * as echarts from 'echarts';
import 'echarts-extension-gmap';

@Component({
  selector: 'app-top-selling',
  templateUrl: './top-selling.component.html',
  styleUrls: ['./top-selling.component.css']
})
export class TopSellingComponent implements OnInit {
  public lat: any= 0;
  public long: any= 0;
  topSelling:Product[];

  constructor() { 

    this.topSelling=TopSelling;
  }

  async ngOnInit() {
    await this.getLocation();
    let option = this.setOption();

    const loader = new Loader({
      apiKey: "AIzaSyAZB6RC9ZT2MO05-DfKMN7h9R0PM_Y4-YE",
      version: "weekly"
    });


    loader.load().then(() => {
      // let map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      //   center: { lat: this.lat, lng: this.long },
      //   zoom: 8,
      // });
      let chartDom: any = document.getElementById('echarts-google-map');
      let chart = echarts.init(chartDom);
      chart.setOption(option);
      // get google map instance
      var gmap = chart.getModel().getComponent("gmap").getGoogleMap();
      
      // Add some markers to map
      var marker = new google.maps.Marker({ position: gmap.getCenter() });
      marker.setMap(gmap);
      // Add TrafficLayer to map
      // var trafficLayer = new google.maps.TrafficLayer();
      // trafficLayer.setMap(gmap);
    });
  }

  getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          if (position) {
            this.lat = position.coords.latitude;
            this.long = position.coords.longitude;
            resolve({
              lat:position.coords.latitude,
              lng:position.coords.longitude
            })
          }
        },
          (error: any) => reject(error));
      } else {
        alert("Geolocation is not supported by this browser.");
        this.lat = -47.158695;
        this.long = -22.842966;
      }
    });
  }
  
  setOption(){
    return {
      // google map component
      gmap: {
        // initial options of Google Map
        // See https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions for details
        // initial map center, accepts an array like [lng, lat] or an object like { lng, lat }
        center: [this.long, this.lat],
        // center: { lng: 120.095349, lat: 30.23592 },
        // initial map zoom
        zoom: 10,

        // whether echarts layer should be rendered when the map is moving. `true` by default.
        // if false, it will only be re-rendered after the map `moveend`.
        // It's better to set this option to false if data is large.
        renderOnMoving: true,
        // the zIndex of echarts layer for Google Map. `2000` by default.
        echartsLayerZIndex: 2022,
        // whether to enable gesture handling. `true` by default.
        // since v1.4.0
        roam: true

        // More initial options...
      },
      visualMap: {
        show: true,
        right: 20,
        min: 0,
        max: 5,
        seriesIndex: 0,
        calculable: true,
        inRange: {
          color: ['blue', 'blue', 'green', 'yellow', 'red']
        }
      },
      animation: false,
      series: [
        {
          type: 'heatmap',
          // use `gmap` as the coordinate system
          coordinateSystem: 'gmap',
          data: [],
          pointSize: 5,
          blurSize: 6
        }
      ]
    };
  }

}
