import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon, type LatLngExpression } from "leaflet";
import { useMemo } from "react";

const markerIcon = icon({
  iconUrl: "/ip-address-tracker/images/icon-location.svg",
  iconSize: [46, 56],
});

export function ChangeView({ coords }: { coords: LatLngExpression }) {
  const map = useMap();
  map.setView(coords, 12);
  return null;
}

export default function GeoMap({
  geoData,
}: {
  geoData: {
    lat: number;
    lng: number;
  };
}) {
  const center = useMemo<LatLngExpression>(() => {
    return [geoData.lat, geoData.lng];
  }, [geoData]);

  return (
    <MapContainer
      center={center}
      zoom={13}
      className="left-1/2 z-[5] h-[calc(100dvh-300px)] w-screen -translate-x-1/2 max-lg:min-h-[528px] lg:h-[calc(100dvh-280px)]"
      scrollWheelZoom={true}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geoData.lat && geoData.lng && (
        <Marker icon={markerIcon} position={[geoData.lat, geoData.lng]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
      <ChangeView coords={center} />
    </MapContainer>
  );
}
