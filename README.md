# Two-line element set (TLE)
[![npm](https://img.shields.io/npm/v/tle.svg?style=flat-square)](https://www.npmjs.com/package/web-tle)
[![npm license](https://img.shields.io/npm/l/tle.svg?style=flat-square)](https://www.npmjs.com/package/web-tle)
[![npm downloads](https://img.shields.io/npm/dm/tle.svg?style=flat-square)](https://www.npmjs.com/package/web-tle)

Two-line element set (TLE) data format parser, *but bundled for the browser!*

A two-line element set ([TLE]) is a data format used to convey sets of orbital elements that describe the orbits of Earth-orbiting satellites. A computer program called a model can use the TLE to compute the position of a satellite at a particular time. The TLE is a format specified by NORAD and used by [NORAD] and [NASA]. The TLE can be used directly by the [SGP4] model (or one of the SGP8, [SDP4], SDP8 models). Orbital elements are determined for many thousands of space objects by NORAD and are freely distributed on the Internet in the form of TLEs. A TLE consists of a title line followed by two lines of formatted text.

— From [Wikipedia](http://en.wikipedia.org/wiki/Two-line_element_set)

[TLE]: http://en.wikipedia.org/wiki/Two-line_element_set
[NORAD]: http://en.wikipedia.org/wiki/NORAD
[NASA]: http://en.wikipedia.org/wiki/NASA
[SGP4]: http://en.wikipedia.org/wiki/SGP4
[SDP4]: http://en.wikipedia.org/wiki/SDP4

## Install via [npm](https://npmjs.com/package/tle)

```sh
$ npm install --save web-tle
```

## Format

**More,  detailed information is available at [NASA Human Space Flight](https://web.archive.org/web/20200609193115/https://spaceflight.nasa.gov/realdata/sightings/SSapplications/Post/JavaSSOP/SSOP_Help/tle_def.html):**

<h3 align="center">
  <a href="https://web.archive.org/web/20200609193115/https://spaceflight.nasa.gov/realdata/sightings/SSapplications/Post/JavaSSOP/SSOP_Help/tle_def.html">
    <img alt="Definition of Two-line Element Set Coordinate System" src="./doc/2line.gif">
  </a>
</h3>

Some data to play around with can be found at [Celestrak](http://www.celestrak.com/NORAD/elements/) and in [Celestrak's Master Index](http://www.celestrak.com/NORAD/elements/master.asp).

## Usage

```js
import TLE from 'web-tle'
```

### Parsing a single set

```js
var set = 'ISS (ZARYA)\n' +
  '1 25544U 98067A   08264.51782528 -.00002182  00000-0 -11606-4 0  2927\n' +
  '2 25544  51.6416 247.4627 0006703 130.5360 325.0288 15.72125391563537'
```

```js
var tle = TLE.parse( set )
```

```js
TLE {
  name: 'ISS (ZARYA)',
  number: 25544,
  class: 'U',
  id: '98067A',
  date: Date<'2008-09-20T12:25:40.104Z'>,
  fdmm: -0.00002182,
  sdmm: 0,
  drag: -0.000011606,
  ephemeris: 0,
  esn: 292,
  inclination: 51.6416,
  ascension: 247.4627,
  eccentricity: 0.0006703,
  perigee: 130.536,
  anomaly: 325.0288,
  motion: 15.72125391,
  revolution: 56353,
}
```

### Parsing a stream

```js
var parser = new TLE.Parser( options ) // OR
var parser = TLE.createParser( options )
````

```js
fs.createReadStream( FILEPATH )
  .pipe( new TLE.Parser() )
  .on( 'data', function( tle ) {
    // ...
  })
```

### Creating a TLE instance from existing data

```js
// From a JSON string
var tle = TLE.fromJSON( '{"name":"ISS (ZARYA)","number":25544,"class":"U","id":"98067A","date":"2008-09-20T12:25:40.104Z","fdmm":-0.00002182,"sdmm":0,"drag":-0.000011606,"ephemeris":0,"esn":292,"inclination":51.6416,"ascension":247.4627,"eccentricity":0.0006703,"perigee":130.536,"anomaly":325.0288,"motion":15.72125391,"revolution":56353}' )
```

```js
// From an object
var tle = TLE.fromJSON({
  name: 'FENGYUN 1C DEB',
  class: 'U',
  id: '29740',
})
```

## Speed

It can read, stream & parse ~2500 TLEs from the file system in about 100ms.

```
node example/fs-stream.js
Parser: 2517 TLEs, 108ms, 23306 op/s
Parser: 23 op/ms
```

## Examples

See `examples` folder for runnable examples:
```
node examples/fs-stream.js
node examples/http-stream.js
```
