import 'echarts-extension-gmap';

import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import * as echarts from 'echarts';

import { Notifies } from './notifies';
import { Product, TopSelling } from './top-selling-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-top-selling',
  templateUrl: './top-selling.component.html',
  styleUrls: ['./top-selling.component.css']
})
export class TopSellingComponent implements OnInit {
  public lat: any= 0;
  public long: any= 0;
  public apiKeyValue: string = "AIzaSyAZB6RC9ZT2MO05-DfKMN7h9R0PM_Y4-YE";
  public username: string = 'user-public-notificacoes';
  public password: string = 'Za4qNXdyQNSa9YaA';
  public url: string = 'https://elasticsearch-saps.saude.gov.br/desc-esus-notifica-estado-sp/_search';
  topSelling:Product[];

  constructor(public http: HttpClient) {

    this.topSelling=TopSelling;
  }

  async ngOnInit() {
    await this.getLocation();
    let option = this.setOption();

    const loader = new Loader({
      apiKey: this.apiKeyValue,
      version: "weekly"
    });


    loader.load().then(() => {
      let chartDom: any = document.getElementById('echarts-google-map');
      let chart = echarts.init(chartDom);


      chart.setOption(option);
      // get google map instance
      let gmap = chart.getModel().getComponent("gmap").getGoogleMap();

      // Add some markers to map
      let marker = new google.maps.Marker({ position: gmap.getCenter() });
      marker.setMap(gmap);
      // Add TrafficLayer to map
      // let trafficLayer = new google.maps.TrafficLayer();
      // trafficLayer.setMap(gmap);
    });
  }

  getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          if (position) {
            this.lat  = position.coords.latitude;
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
    let data = [
      { name: "Andradina", value: 152 },
      { name: "Americana", value: 169 },
      { name: "Hortolandia", value: 201 },
      { name: "Nova Odessa", value: 89 },
      { name: "Sumaré", value: 210 },
      { name: "Artur Nogueira", value: 276 },
      { name: "Campinas", value: 280 },
      { name: "Valinhos", value: 125 },
      { name: "Vinhedo", value: 104 },
      { name: "São Paulo", value: 480 },
      { name:'Sorocaba'  , value: 124},
      { name:'Jundiaí'   , value: 117},
      { name:'Louveira'  , value: 165},
      { name:'Indaiatuba', value: 142},
      { name:'Jaguariuna', value: 234}
    ];

    let geoCoordMap: any = {
      'Andradina':        [-51.378568, -20.8967688],
      'Americana':        [-47.333119, -22.73736],
      'Hortolandia':      [-47.214259, -22.852854],
      'Nova Odessa':      [-47.294059, -22.783186],
      'Sumaré':           [-47.272823, -22.820416],
      'Artur Nogueira':   [-47.172679, -22.572737],
      'Campinas':         [-47.06595,  -22.905346],
      'Valinhos':         [-46.997367, -22.969805],
      'Vinhedo':          [-46.983312, -23.030184],
      'São Paulo':        [-46.63952,  -23.532905],
      'Sorocaba':         [-47.445073, -23.496886],
      'Jundiaí':          [-46.897358, -23.185218],
      'Louveira':         [-46.948369, -23.085572],
      'Indaiatuba':        [-47.210093, -23.081591],
      'Jaguariuna':        [-46.985062, -22.70374]
    };

    let convertData: any = function (data: any) {
      let res: any = [];
      for (const element of data) {
        let cityName: any = element.name;
        let geoCoord: any = geoCoordMap[cityName];
        if (geoCoord) {
          res.push({
            name: cityName,
            value: geoCoord.concat(element.value)
          });
        }
      }
      return res;
    };

    return {
      // google map component
      gmap: {
        // initial options of Google Map
        // See https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions for details
        // initial map center, accepts an array like [lng, lat] or an object like { lng, lat }
        center: [this.long, this.lat],
        // center: { lng: 108.39, lat: 39.9 },
        // initial map zoom
        zoom: 8,

        // whether ECharts layer should be re-rendered when the map is moving. `true` by default.
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
      tooltip: {
        trigger: "item"
      },
      animation: true,
      series: [
        {
          name: "Contaminações",
          type: "scatter",
          // use `amap` as the coordinate system
          coordinateSystem: "gmap",
          // data items [[lng, lat, value], [lng, lat, value], ...]
          data: convertData(data),
          symbolSize: function (val: any) {
            return val[2] / 10;
          },
          encode: {
            value: 2,
            lng: 0,
            lat: 1
          },
          label: {
            formatter: "{b}",
            position: "right",
            show: false
          },
          itemStyle: {
            color: "#00c1de"
          },
          emphasis: {
            label: {
              show: true
            }
          }
        },
        {
          name: "Top 3 - Contaminações",
          type: "effectScatter",
          coordinateSystem: "gmap",
          data: convertData(
            data
              .sort(function (a, b) {
                return b.value - a.value;
              })
              .slice(0, 3)
          ),
          symbolSize: function (val: any) {
            return val[2] / 10;
          },
          encode: {
            value: 2,
            lng: 0,
            lat: 1
          },
          showEffectOn: "render",
          rippleEffect: {
            brushType: "stroke"
          },
          label: {
            formatter: "{b}",
            position: "right",
            show: true
          },
          itemStyle: {
            color: "#fff",
            shadowBlur: 10,
            shadowColor: "#333"
          },
          zlevel: 1
        },
        {
          type: "pie",
          name: "Category",
          coordinateSystem: "gmap",
          center: [121, 23],
          radius: 20,
          data: [
            {
              name: "A",
              value: 100
            },
            {
              name: "B",
              value: 80
            },
            {
              name: "C",
              value: 120
            }
          ]
        }
      ]
    };

  //   return {
  //     // google map component
  //     gmap: {
  //       // initial options of Google Map
  //       // See https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions for details
  //       // initial map center, accepts an array like [lng, lat] or an object like { lng, lat }
  //       center: [this.long, this.lat],
  //       // center: { lng: 120.095349, lat: 30.23592 },
  //       // initial map zoom
  //       zoom: 10,

  //       // whether echarts layer should be rendered when the map is moving. `true` by default.
  //       // if false, it will only be re-rendered after the map `moveend`.
  //       // It's better to set this option to false if data is large.
  //       renderOnMoving: true,
  //       // the zIndex of echarts layer for Google Map. `2000` by default.
  //       echartsLayerZIndex: 2022,
  //       // whether to enable gesture handling. `true` by default.
  //       // since v1.4.0
  //       roam: true

  //       // More initial options...
  //     },
  //     visualMap: {
  //       show: true,
  //       right: 20,
  //       min: 0,
  //       max: 5,
  //       seriesIndex: 0,
  //       calculable: true,
  //       inRange: {
  //         color: ['blue', 'blue', 'green', 'yellow', 'red']
  //       }
  //     },
  //     animation: false,
  //     series: [
  //       {
  //         type: 'heatmap',
  //         // use `gmap` as the coordinate system
  //         coordinateSystem: 'gmap',
  //         data: [],
  //         pointSize: 5,
  //         blurSize: 6
  //       },
  //     ]
  //   };
  }
}
