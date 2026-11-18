import * as React from "react";
import CubeLabel from "./CubeLabel";
import { worldCountries } from "../resource/map/worldCountries";
import { visitedCountries } from "./visitedCountries";
import type { VisitedCountry } from "./visitedCountries";
import "./Travel.sass";

const mapWidth = 1000;
const mapHeight = 480;
const zoom = 2.75;
const visitedByCode = new Map(visitedCountries.map(country => [country.code, country]));

function mapPoint([longitude, latitude]: VisitedCountry["marker"])
{
  return [500 + 2.6 * longitude, 244 - 2.4 * latitude] as const;
}

export default function Travel({ active }: { active: boolean })
{
  const [activeCountry, setActiveCountry] = React.useState<VisitedCountry | null>(null);
  const countryHeading = React.useRef<HTMLHeadingElement>(null);
  const map = React.useRef<HTMLDivElement>(null);
  const places = React.useRef<HTMLDivElement>(null);
  const [focusX, focusY] = activeCountry ? mapPoint(activeCountry.marker) : [mapWidth / 2, mapHeight / 2];
  const scale = activeCountry ? zoom : 1;

  React.useEffect(() => {
    if (!active) setActiveCountry(null);
  }, [active]);

  React.useEffect(() => {
    if (active && activeCountry)
    {
      countryHeading.current?.focus({ preventScroll: true });
      places.current?.scrollIntoView({
        block: 'start',
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      });
    }
  }, [active, activeCountry]);

  function returnToWorldMap()
  {
    const marker = map.current?.querySelector<HTMLButtonElement>(`button[data-country="${activeCountry.code}"]`);
    setActiveCountry(null);
    marker?.focus({ preventScroll: true });
    map.current?.scrollIntoView({
      block: 'start',
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  }

  return <section className="travel" aria-labelledby="travel-heading">
    <div ref={map} className="travel-map">
      <svg viewBox={`0 0 ${mapWidth} ${mapHeight}`} aria-hidden="true">
        <g
          className="travel-map-camera"
          style={{
            transform: `translate(${mapWidth / 2 - focusX * scale}px, ${mapHeight / 2 - focusY * scale}px) scale(${scale})`,
          }}
        >
          <path
            className="travel-map-grid"
            d="M110 30V450M188 30V450M266 30V450M344 30V450M422 30V450M500 30V450M578 30V450M656 30V450M734 30V450M812 30V450M890 30V450M32 100H968M32 172H968M32 244H968M32 316H968M32 388H968"
          />
          {worldCountries.map(([code, outline]) => {
            const country = visitedByCode.get(code);
            const isSelectable = country && (!activeCountry || activeCountry === country);

            return <path
              key={code}
              d={outline}
              data-country={code}
              className={country ? "travel-map-visited" : "travel-map-land"}
              onClick={isSelectable ? () => setActiveCountry(country) : undefined}
            />;
          })}
        </g>
      </svg>
      {(activeCountry ? [activeCountry] : visitedCountries).map(country => {
        const [x, y] = mapPoint(country.marker);
        const left = activeCountry ? 50 : x / mapWidth * 100;
        const top = activeCountry ? 50 : y / mapHeight * 100;
        return <button
          key={country.code}
          type="button"
          className="travel-map-marker"
          data-country={country.code}
          style={{ left: `${left}%`, top: `${top}%` }}
          aria-expanded={activeCountry === country}
          aria-controls="travel-places"
          onClick={() => activeCountry === country ? returnToWorldMap() : setActiveCountry(country)}
        >
          {country.name}
        </button>;
      })}
    </div>
    <div className="travel-map-caption">
      <span className="travel-map-legend">Visited</span>
      <a href="https://www.naturalearthdata.com/downloads/110m-cultural-vectors/">Natural Earth</a>
    </div>
    <div id="travel-places" ref={places} hidden={!activeCountry}>
      {activeCountry && <>
        <div className="travel-country-heading">
          <h3 ref={countryHeading} tabIndex={-1}>{activeCountry.name}</h3>
          <button type="button" className="travel-world-back" onClick={returnToWorldMap}>
            <CubeLabel><span aria-hidden="true">←</span> Back to world map</CubeLabel>
          </button>
        </div>
        <ul className="travel-postcards">
          {activeCountry.places.map(place => <li key={place.name} className="travel-postcard">
            <img src={place.image} alt={place.alt} loading="lazy" />
            <div className="travel-postcard-caption">
              <h4>{place.name}</h4>
              <p>{place.location}</p>
            </div>
          </li>)}
        </ul>
      </>}
    </div>
  </section>;
}
