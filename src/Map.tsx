import GoogleMapReact, { BootstrapURLKeys, Coords } from "google-map-react";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getSelectedLocation } from "./app/features/locations/locationSlice";
import LocationModel from "./model/Location";

interface ContainerProps {
  width: number;
  height: number;
}

const Container = styled.div<ContainerProps>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border: 10px solid white;
  border-radius: 10px;
`;

interface MapProps {
  width: number;
  height: number;
  children: Iterable<ReactNode> | ReactNode;
}

interface MapRef {
  panTo: (args: { lat: number; lng: number }) => void;
  setCenter: (args: { lat: number; lng: number }) => void;
  getDiv: () => HTMLElement;
}

const Map = ({ width, height, children }: MapProps) => {
  const center: LocationModel | null = useSelector(getSelectedLocation);
  const [mapRef, setMapRef] = useState<MapRef>();
  const [zoom, setZoom] = useState(1);
  const defaultCoords = {
    lat: -17.8977457,
    lng: -52.3772972,
  } as Coords;

  const zoomMap = useCallback(
    (deltaY: number) => {
      if (deltaY < 0 && center) {
        mapRef?.panTo(center.getPos());
        mapRef?.setCenter(center.getPos());
      }

      setZoom((zoom) => {
        let newZoom = zoom - deltaY * 0.005;

        if (newZoom < 0) {
          newZoom = 0;
        }

        if (newZoom > 22.5) {
          newZoom = 22.5;
        }

        return newZoom;
      });
    },
    [mapRef, center]
  );

  useEffect(() => {
    const mapDiv = mapRef?.getDiv();

    const listener = (e: WheelEvent) => {
      e.preventDefault();

      zoomMap(e.deltaY);
    };
    mapDiv?.addEventListener("wheel", listener);

    return () => mapDiv?.removeEventListener("wheel", listener);
  }, [zoomMap]);

  const storeMapRef = (ref: MapRef) => {
    setMapRef(ref);
  };

  return (
    <Container width={width} height={height}>
      <GoogleMapReact
        bootstrapURLKeys={
          {
            language: "pt-br",
            region: "br",
            key: "",
          } as BootstrapURLKeys
        }
        center={center?.getPos() || defaultCoords}
        zoom={Math.round(zoom)}
        onZoomAnimationEnd={(param) => {
          console.log(param);
        }}
        onGoogleApiLoaded={({ map }) => storeMapRef(map)}
        options={{
          scrollwheel: false,
        }}
      >
        {children}
      </GoogleMapReact>
    </Container>
  );
};

export default Map;
