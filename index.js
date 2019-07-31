import 'ol/ol.css';

import {Map, View} from 'ol';

import GPX from 'ol/format/GPX.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import BingMaps from 'ol/source/BingMaps.js';
import VectorSource from 'ol/source/Vector.js';
import {Fill, Stroke, Style} from 'ol/style.js';

import Image from 'ol/layer/Image';
import StaticImage from 'ol/source/ImageStatic';

import OSM from 'ol/source/OSM';

import {fromLonLat} from 'ol/proj.js';

const backgroundSources = {
  osm: new OSM(),
  bing: new BingMaps({
    key: "AnzJ8GUrq-Q-tkdVYWFWs-3H9pIyykpZBwnLXyGTXDA8WV6-1kg-veWxC9XBpMAt",
    imagerySet: "Aerial",
    maxZoom: 19
  })
};

const overlaySources = {
  // 1908: https://gallica.bnf.fr/ark:/12148/btv1b530633704
  // 1914: https://gallica.bnf.fr/ark:/12148/btv1b52502585g/f1.item
  // 1927: https://gallica.bnf.fr/ark:/12148/btv1b52508925k
  french1927: new StaticImage({
    url: 'french1927.png',
    projection: 'EPSG:4326',
    imageExtent: [ 102.6903, 25.0256, 102.7236, 25.0621 ], // left bottom right top
    attributions: 'Source <a href="https://gallica.bnf.fr/ark:/12148/btv1b52508925k">gallica.bnf.fr / Bibliothèque nationale de France</a>'
  }),
  refurbishment: new StaticImage({
    url: 'map.jpeg',
    projection: 'EPSG:4326',
    imageExtent: [ 102.6935, 25.0367, 102.7178, 25.0583 ], // left bottom right top
    attributions: '空愁居 kcjun.5d6d.com'
  }),
  historical: new StaticImage({
    url: 'map2.jpeg',
    projection: 'EPSG:4326',
    imageExtent: [ 102.6896, 25.0305, 102.7195, 25.0625 ], // left bottom right top
    attributions: '空愁居 kcjmap.com'
  })
}

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: backgroundSources['osm']
    }),
    new Image({
      opacity: 0.65,
      source: overlaySources['french1927']
    }),
    new VectorLayer({
      source: new VectorSource({
        url: 'walk.gpx',
        format: new GPX()
      }),
      style: new Style({
        stroke: new Stroke({
          color: '#00f',
          width: 2
        })
      })
    })
  ],
  view: new View({
    center: fromLonLat([102.702, 25.052]),
    zoom: 14,
    minZoom: 13,
    maxZoom: 18
  })
});

var backgroundlayer = document.getElementById('backgroundlayer');
backgroundlayer.onchange = function() {
  map.getLayers().item(0).setSource(backgroundSources[this.value]);
}

var overlay = document.getElementById('overlay');
overlay.onchange = function() {
  map.getLayers().item(1).setSource(overlaySources[this.value]);
}


var mapOpacitySlider = document.getElementById('map-opacity-slider');
mapOpacitySlider.oninput = function() {
  map.getLayers().item(1).setOpacity(this.value);
}
mapOpacitySlider.oninput();

var trackOpacitySlider = document.getElementById('track-opacity-slider');
trackOpacitySlider.oninput = function() {
  map.getLayers().item(2).setOpacity(this.value);
}
trackOpacitySlider.oninput();
