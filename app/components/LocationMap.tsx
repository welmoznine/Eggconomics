"use client";

import React, { useEffect, useRef, useMemo } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import EggIcon from "@/components/EggIconSVG";
import ReactDOMServer from "react-dom/server";

interface LocationMapProps {
  locations: {
    location_id: string;
    location_name: string;
    latitude: number;
    longitude: number;
    latest_timestamp: string;
    avg_regular_price: number | null;
  }[];
}

const LocationMap: React.FC<LocationMapProps> = ({ locations }) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const mapContainerId = "map";

  // Calculate min and max prices for color scaling
  const priceStats = useMemo(() => {
    const validPrices = locations
      .map((loc) => loc.avg_regular_price)
      .filter((price): price is number => price !== null);

    return {
      min: Math.min(...validPrices),
      max: Math.max(...validPrices),
    };
  }, [locations]);

  // Function to get color based on price
  const getPriceColor = (price: number | null): string => {
    if (price === null) return "#808080"; // Gray for missing data

    const { min, max } = priceStats;

    // Handle edge case where all prices are the same
    if (min === max) return "#ffc579"; // Default to amber if no range

    // Normalize price (0 to 1)
    const normalizedPrice = (price - min) / (max - min);

    // Green to Yellow to Red scaling
    if (normalizedPrice < 0.5) {
      const r = Math.floor(normalizedPrice * 2 * 255);
      return `rgb(${r}, 255, 0)`;
    } else {
      const g = Math.floor((1 - (normalizedPrice - 0.5) * 2) * 255);
      return `rgb(255, ${g}, 0)`;
    }
  };

  // Initialize the map only once
  useEffect(() => {
    if (!mapRef.current) {
      // Check if map element exists
      const mapElement = document.getElementById(mapContainerId);
      if (!mapElement) return;

      // Clear any existing map instance on the element
      if ((mapElement as any)._leaflet_id != null) {
        (mapElement as any)._leaflet_id = null;
      }

      // US bounds for optimal viewing
      const usBounds = L.latLngBounds(
        L.latLng(24.396308, -125.000000), 
        L.latLng(49.384358, -66.93457)
      );

      // Create the map
      const map = L.map(mapContainerId, {
        attributionControl: false,
        zoomSnap: 0.25,
        maxBoundsViscosity: 1.0,
        minZoom: 2,
        maxZoom: 18,
      });

      // Fit the map to the US bounds
      map.fitBounds(usBounds);
      mapRef.current = map;

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 18,
      }).addTo(map);

      // Add legend
      const legend = new L.Control({ position: "bottomright" });

      legend.onAdd = function () {
        const div = L.DomUtil.create("div", "info legend");
        div.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        div.style.padding = "10px";
        div.style.borderRadius = "5px";
        div.style.boxShadow = "0 0 15px rgba(0,0,0,0.2)";
        div.style.color = "#000";
        div.style.fontWeight = "bold";
      
        const min = priceStats.min;
        const max = priceStats.max;
      
        div.innerHTML += '<div style="margin-bottom: 5px;">Average Price Per Dozen Eggs:</div>';
        
        // Create a gradient bar
        div.innerHTML += `
          <div style="position: relative; width: 100%; height: 20px; margin-bottom: 8px;">
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
                 background: linear-gradient(to right, 
                   rgb(0, 255, 0), 
                   rgb(255, 255, 0), 
                   rgb(255, 0, 0));">
            </div>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>$${min.toFixed(2)}</span>
            <span>$${max.toFixed(2)}</span>
          </div>
        `;
      
        return div;
      };

      legend.addTo(map);

      // Add event listeners
      const handleResize = () => map.invalidateSize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      };
    }
  }, []);

  // Only update markers when needed
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Remove existing markers
    markersRef.current.forEach(marker => {
      if (mapRef.current) {
        mapRef.current.removeLayer(marker);
      }
    });
    markersRef.current = [];

    // Add new markers
    const newMarkers = locations.map((loc, index) => {
      const price = loc.avg_regular_price;
      const color = getPriceColor(price);

      // Create a colored egg icon for each location
      const eggIconHtml = ReactDOMServer.renderToString(
        <EggIcon color={color} size={24} />
      );

      const eggIcon = L.divIcon({
        html: `<div>${eggIconHtml}</div>`,
        className: "egg-icon",
        iconSize: [24, 24],
        iconAnchor: [12, 24],
      });

      const popupContent = `
        <div style="text-align: center;">
          <strong>${loc.location_name}</strong>
          <br>
          <br>
          <strong style="font-weight: extrabold; font-size: 16px;">
            ${price ? `$${price.toFixed(2)}` : "N/A"}
          </strong>
          <br>
          <a href="/locations/${loc.location_id}" class="location-link">
            <button id="popup-button-${index}" style="margin-top: 8px; padding: 6px 12px; background-color: ${color}; color: ${price && price > (priceStats.min + priceStats.max) / 2 ? "white" : "black"}; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
              View Details
            </button>
          </a>
          <br>
          <br>
          <em>Last updated: ${new Date(loc.latest_timestamp).toLocaleDateString()}</em>
        </div>
      `;

      const marker = L.marker([loc.latitude, loc.longitude], { icon: eggIcon })
        .addTo(mapRef.current!)
        .bindPopup(popupContent, {
          className: "custom-popup",
          closeButton: true,
          autoClose: false,
          closeOnEscapeKey: true,
        });

      return marker;
    });

    markersRef.current = newMarkers;
  }, [locations, priceStats]);

  return <div id={mapContainerId} className="w-full h-full z-0" />;
};

export default LocationMap;