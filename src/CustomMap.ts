import { User } from './User';
import { Company } from './Company';

interface LatLngLiteral {
  lat: number;
  lng: number;
}

export interface Mappable {
  location: LatLngLiteral;
  markerContent(): string;
  color: string;
}

interface MapProps {
  zoom: number;
  center: LatLngLiteral
}

const defaultMapProps: MapProps = {
  zoom: 1,
  center: {
    lat: 0,
    lng: 0 
  }
};

export class CustomMap {
  private map: google.maps.Map;

  constructor(public divId: string, public mapProps: MapProps = defaultMapProps) {
    this.map = new google.maps.Map(document.getElementById(this.divId), mapProps );
  }

  addMarker(mappable: Mappable): void {
    const marker = new google.maps.Marker({
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng
      },
      map: this.map,
      title: mappable.markerContent()
    })
    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent()
      });
      infoWindow.open(this.map, marker);
    })
  }
}