import React from 'react'
import { MapContainer, TileLayer, } from "react-leaflet"


const Map = ({ mapRef, children }) => {
  return (
    <>
      <MapContainer 
        center={[40, 10]} 
        zoom={3} 
        worldCopyJump={false}
        maxBounds={L.latLngBounds([100, 200], [-100, -200])}
        mapBoundsVisconsity={1}
        markerZoomAnimation={false}
        ref={mapRef}
      >
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={18}
        minZoom={3}
        />
          {children}
      </MapContainer>

    </>
  )
}

export default Map