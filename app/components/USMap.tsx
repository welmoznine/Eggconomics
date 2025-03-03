import * as d3 from "d3";
import * as topojson from "topojson-client";
import {
  Topology,
  GeometryCollection,
  GeometryObject,
} from "topojson-specification";
import Link from "next/link";
import { Location } from "@/utils/supabase/locations";

type Marker = {
  name: string;
  position: [number, number];
  location_id: string;
  avg_price: number | null;
};

async function fetchUSMap() {
  const usResponse = await fetch(
    "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"
  );
  return (await usResponse.json()) as Topology;
}

interface USMapProps {
  locations: Location[];
}

export default async function USMap({ locations }: USMapProps) {
  const width = 975;
  const height = 610;

  const us = await fetchUSMap();

  if (!us) {
    return <p>Error loading map data.</p>;
  }

  // D3 Projection
  const projection = d3
    .geoAlbersUsa()
    .scale(1300)
    .translate([width / 2, height / 2]);
  const path = d3.geoPath(projection);

  // Process map geometry
  const states = topojson.feature(us, us.objects.states as GeometryCollection);
  const statemesh = topojson.mesh(
    us,
    us.objects.states as GeometryObject<object>,
    (a, b) => a !== b
  );

  // Convert states and borders to path data
  const statesPath = path(states);
  const stateBordersPath = path(statemesh);

  // Convert location markers to positions
  const markers: Marker[] = locations.reduce((acc: Marker[], loc: Location) => {
    const projectedPoint = projection([loc.longitude, loc.latitude]);
    if (projectedPoint) {
      acc.push({
        name: loc.location_name,
        position: projectedPoint as [number, number],
        location_id: loc.location_id,
        avg_price: loc.avg_regular_price
      });
    }
    return acc;
  }, []);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ maxWidth: "100%", height: "auto" }}
    >
      {/* States */}
      <path d={statesPath || ""} fill="#d3d3d3" stroke="#ffffff" />

      {/* State Borders */}
      <path
        d={stateBordersPath || ""}
        fill="none"
        stroke="#ffffff"
        strokeLinejoin="round"
      />

      {/* Location Markers */}
      <g>
        {markers.map((marker: Marker, i: number) => (
          <g key={i}>
            <text
              x={marker.position[0]}
              y={marker.position[1]}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="10px"
              style={{ cursor: "pointer" }}
            >
              <Link href={`/locations/${marker.location_id}`}>🥚</Link>
              <title>{`${marker.name}`}</title>
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}