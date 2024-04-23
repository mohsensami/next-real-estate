import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function MapWithMarkers({ data }) {
    return (
        <MapContainer center={[38.0738612, 46.2978789]} zoom={10} style={{ height: '400px' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {data.map((item) => (
                <Marker position={[item.coordinates.lat, item.coordinates.lng]} key={item.id}>
                    <Popup>
                        ID: {item.id}
                        <br />
                        Coordinates: {item.coordinates.lat}, {item.coordinates.lng}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default MapWithMarkers;
