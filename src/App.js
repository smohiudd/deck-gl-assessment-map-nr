import React from 'react';
import DeckGL from '@deck.gl/react';
import {MapboxLayer} from "@deck.gl/mapbox";
import {StaticMap} from 'react-map-gl';
import {TileLayer} from '@deck.gl/geo-layers';
import {VectorTile} from '@mapbox/vector-tile';
import Protobuf from 'pbf';
import {ScatterplotLayer} from '@deck.gl/layers';

import SelectionContainer from "./SelectionContainer"

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoic2FhZGlxbSIsImEiOiJjamJpMXcxa3AyMG9zMzNyNmdxNDlneGRvIn0.wjlI8r1S_-xxtq2d-W5qPA';

const initialView = {
  longitude: -114.062019,
  latitude: 51.044270,
  zoom:10.5,
};

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      zoom:initialView.zoom,
    };
    this._onViewStateChange = this._onViewStateChange.bind(this);
  }

  _onWebGLInitialized = (gl) => {
    this.setState({gl});
  }

  _onMapLoad = () => {
    const map = this._map;
    const deck = this._deck;

    let name = "assessment-NR"
    map.addLayer(new MapboxLayer({id: name, deck}),'waterway-label');
  }

  _onViewStateChange({viewState}) {
    this.setState({zoom:viewState.zoom});
  }

  _renderLayers() {

    const scatter_layer =  new TileLayer({
      id: "assessment-NR",
      type: TileLayer,
      getTileData: ({x, y, z}) => {
        const mapSource = `https://a.tiles.mapbox.com/v4/saadiqm.azk20mv4/${z}/${x}/${y}.vector.pbf?access_token=${MAPBOX_ACCESS_TOKEN}`;
        return fetch(mapSource)
          .then(response => response.arrayBuffer())
          .then(buffer => {
            const tile = new VectorTile(new Protobuf(buffer));

            const features = [];
            let vectorTileLayer = tile.layers["NR"]

            for (let i = 0; i < vectorTileLayer.length; i++) {
              const vectorTileFeature = vectorTileLayer.feature(i);
              const feature = vectorTileFeature.toGeoJSON(x, y, z);
              features.push(feature);
            }
            return features;
          });
      },
      onTileError:(e) => console.error(e),
      maxZoom:14,
      onHover: info => this.setState({
       hoveredObject: info.object,
       pointerX: info.x,
       pointerY: info.y
      }),
      renderSubLayers: props => {
        return new ScatterplotLayer(props,{
            opacity:0.5,
            pickable: true,
            getLineWidth:0,
            radiusScale: Math.pow(2, Math.max(14 - this.state.zoom, 0)),
            radiusMinPixels: 1,
            radiusMaxPixels:90,
            getPosition: d => d.geometry.coordinates,
            getFillColor: d => [66, 135, 245],
            getRadius: d => Math.sqrt(d.properties.NR_ASSESSED_VALUE)/500,
          });
        }
      })

    return [scatter_layer]
  }

  _renderTooltip() {
    const {hoveredObject, pointerX, pointerY} = this.state || {};
    return hoveredObject && (
      <div style={{position: 'absolute', zIndex: 1, pointerEvents: 'none', left: pointerX, top: pointerY}} className="bg-lighten75 py6 px12">
        <p className="txt-bold">{"$"+hoveredObject.properties['NR_ASSESSED_VALUE'].toLocaleString()}</p>
        <p className="txt-s">{hoveredObject.properties.ADDRESS}</p>
      </div>
    );
  }

  render() {

    const {gl} = this.state;

    return (
      <div>
      <DeckGL
        ref={ref => {
          this._deck = ref && ref.deck;
        }}
        layers={this._renderLayers()}
        initialViewState={initialView}
        controller={true}
        onWebGLInitialized={this._onWebGLInitialized}
        onViewStateChange={this._onViewStateChange}

      >
      {gl && (
        <StaticMap
          ref={ref => {
            this._map = ref && ref.getMap();
          }}
          gl={gl}
          mapStyle="mapbox://styles/saadiqm/cjxbd493m05cc1cl29jntlb1w?optimize=true"
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          onLoad={this._onMapLoad}
        />
      )}
      {this._renderTooltip()}
      </DeckGL>
        <SelectionContainer/>
      </div>


    );
  }
}

export default App;
