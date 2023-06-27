import { Coords } from "google-map-react";

export interface LocationData {
    id: number;
    lat: number;
    lng: number;
    text?: string;
}

class Location {
    private static lastID = 0;
    private id: number;
    private lat: number;
    private lng: number;
    private text: string | undefined;

    constructor(latOrJSON: number | string, lng?: number, description?: string) {
        if (typeof latOrJSON === 'string') {
            const data: LocationData = JSON.parse(latOrJSON);
            this.id = data.id;
            this.lat = data.lat;
            this.lng = data.lng;
            this.text = data.text;

            if (Location.lastID < this.id) {
                Location.lastID = this.id;
            }
            
        } else {
            if (typeof latOrJSON !== 'number') {
                throw new Error('latitude deve ser um número !');
            }

            if (lng === undefined) {
                throw new Error('longitude deve estar definida !');
            }

            this.id = ++Location.lastID;
            this.lat = latOrJSON;
            this.lng = lng as number;
            this.text = description;   
        }
    }

    setLat(lat: number): void {
        this.lat = lat;
    }

    setLng(lng: number): void {
        this.lng = lng;
    }

    setText(description: string): void {
        this.text = description;
    }

    getId(): number {
        return this.id;
    }

    getPos(): Coords {
        return {
            lat: this.lat,
            lng: this.lng
        };
    }

    getLat(): number {
        return this.lat;
    }

    getLng(): number {
        return this.lng;
    }

    getText(): string {
        return this.text || '';
    }
}

export default Location;