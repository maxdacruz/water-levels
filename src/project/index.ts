// AUTO-GENERATED FILE PLEASE DO NOT MODIFY MANUALLY
/* eslint-disable */
// @ts-nocheck

import * as $sdk from '@greycat/web';
import * as project_n from '../../project_n/index.js';

export namespace project {
  export function importStations($g: $sdk.GreyCat = globalThis.greycat.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::importStations', undefined, $signal);
  }
  export function importWaterLevels($g: $sdk.GreyCat = globalThis.greycat.default, $signal?: AbortSignal): Promise<$sdk.std.runtime.Task> {
    return $g.call('project::importWaterLevels', undefined, $signal);
  }
  export function impportWeatherData($g: $sdk.GreyCat = globalThis.greycat.default, $signal?: AbortSignal): Promise<$sdk.std.runtime.Task> {
    return $g.call('project::impportWeatherData', undefined, $signal);
  }
  export function toogleImporterPeriodicTask($g: $sdk.GreyCat = globalThis.greycat.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::toogleImporterPeriodicTask', undefined, $signal);
  }
}

export namespace importer {
  export class WaterImporter extends $sdk.GCObject {
    static readonly _type = 'importer::WaterImporter';


    static rootUrl($g: $sdk.GreyCat = globalThis.greycat.default): string {
      const t = $g.abi.libs_by_name.get(projectlib.name)!.mapped[0];
      return  t.static_values['rootUrl'] as string;
    }
    static riversEndpoint($g: $sdk.GreyCat = globalThis.greycat.default): string {
      const t = $g.abi.libs_by_name.get(projectlib.name)!.mapped[0];
      return  t.static_values['riversEndpoint'] as string;
    }
    static stationsEndpoint($g: $sdk.GreyCat = globalThis.greycat.default): string {
      const t = $g.abi.libs_by_name.get(projectlib.name)!.mapped[0];
      return  t.static_values['stationsEndpoint'] as string;
    }
    static createFrom($g: $sdk.GreyCat = globalThis.greycat.default): WaterImporter {
      return new WaterImporter($g.abi.libs_by_name.get(projectlib.name)!.mapped[0]);
    }
    static create($g: $sdk.GreyCat = globalThis.greycat.default): WaterImporter {
      return new WaterImporter($g.abi.libs_by_name.get(projectlib.name)!.mapped[0]);
    }
  }

  export class WeatherImporter extends $sdk.GCObject {
    static readonly _type = 'importer::WeatherImporter';


    static createFrom($g: $sdk.GreyCat = globalThis.greycat.default): WeatherImporter {
      return new WeatherImporter($g.abi.libs_by_name.get(projectlib.name)!.mapped[1]);
    }
    static create($g: $sdk.GreyCat = globalThis.greycat.default): WeatherImporter {
      return new WeatherImporter($g.abi.libs_by_name.get(projectlib.name)!.mapped[1]);
    }
  }

}

export namespace importer_service {
  export class WeatherImporterService extends $sdk.GCObject {
    static readonly _type = 'importer_service::WeatherImporterService';


    static createFrom($g: $sdk.GreyCat = globalThis.greycat.default): WeatherImporterService {
      return new WeatherImporterService($g.abi.libs_by_name.get(projectlib.name)!.mapped[2]);
    }
    static create($g: $sdk.GreyCat = globalThis.greycat.default): WeatherImporterService {
      return new WeatherImporterService($g.abi.libs_by_name.get(projectlib.name)!.mapped[2]);
    }
  }

  export class WaterImporterService extends $sdk.GCObject {
    static readonly _type = 'importer_service::WaterImporterService';


    static createFrom($g: $sdk.GreyCat = globalThis.greycat.default): WaterImporterService {
      return new WaterImporterService($g.abi.libs_by_name.get(projectlib.name)!.mapped[3]);
    }
    static create($g: $sdk.GreyCat = globalThis.greycat.default): WaterImporterService {
      return new WaterImporterService($g.abi.libs_by_name.get(projectlib.name)!.mapped[3]);
    }
  }

}

export namespace stations {
  export class GeoJsonGeometry extends $sdk.GCObject {
    static readonly _type = 'stations::GeoJsonGeometry';

    type: string;
    coordinates: globalThis.Array<number>;

    static createFrom({type, coordinates}: {type: string, coordinates: globalThis.Array<number>}, $g: $sdk.GreyCat = globalThis.greycat.default): GeoJsonGeometry {
      return new GeoJsonGeometry($g.abi.libs_by_name.get(projectlib.name)!.mapped[4], type, coordinates);
    }
    static create(type: string, coordinates: globalThis.Array<number>, $g: $sdk.GreyCat = globalThis.greycat.default): GeoJsonGeometry {
      return new GeoJsonGeometry($g.abi.libs_by_name.get(projectlib.name)!.mapped[4], type, coordinates);
    }
  }

  export class GeoJsonStationProperties extends $sdk.GCObject {
    static readonly _type = 'stations::GeoJsonStationProperties';

    id: bigint | number;
    name: string;
    alert: globalThis.Array<number>;
    river: string;

    static createFrom({id, name, alert, river}: {id: bigint | number, name: string, alert: globalThis.Array<number>, river: string}, $g: $sdk.GreyCat = globalThis.greycat.default): GeoJsonStationProperties {
      return new GeoJsonStationProperties($g.abi.libs_by_name.get(projectlib.name)!.mapped[5], id, name, alert, river);
    }
    static create(id: bigint | number, name: string, alert: globalThis.Array<number>, river: string, $g: $sdk.GreyCat = globalThis.greycat.default): GeoJsonStationProperties {
      return new GeoJsonStationProperties($g.abi.libs_by_name.get(projectlib.name)!.mapped[5], id, name, alert, river);
    }
  }

  export class GeoJsonFeature extends $sdk.GCObject {
    static readonly _type = 'stations::GeoJsonFeature';

    type: string;
    geometry: stations.GeoJsonGeometry;
    properties: any;

    static createFrom({type, geometry, properties}: {type: string, geometry: stations.GeoJsonGeometry, properties: any | null}, $g: $sdk.GreyCat = globalThis.greycat.default): GeoJsonFeature {
      return new GeoJsonFeature($g.abi.libs_by_name.get(projectlib.name)!.mapped[6], type, geometry, properties);
    }
    static create(type: string, geometry: stations.GeoJsonGeometry, properties: any | null, $g: $sdk.GreyCat = globalThis.greycat.default): GeoJsonFeature {
      return new GeoJsonFeature($g.abi.libs_by_name.get(projectlib.name)!.mapped[6], type, geometry, properties);
    }
  }

  export class GeoJsonData extends $sdk.GCObject {
    static readonly _type = 'stations::GeoJsonData';

    type: string;
    features: globalThis.Array<stations.GeoJsonFeature>;

    static createFrom({type, features}: {type: string, features: globalThis.Array<stations.GeoJsonFeature>}, $g: $sdk.GreyCat = globalThis.greycat.default): GeoJsonData {
      return new GeoJsonData($g.abi.libs_by_name.get(projectlib.name)!.mapped[7], type, features);
    }
    static create(type: string, features: globalThis.Array<stations.GeoJsonFeature>, $g: $sdk.GreyCat = globalThis.greycat.default): GeoJsonData {
      return new GeoJsonData($g.abi.libs_by_name.get(projectlib.name)!.mapped[7], type, features);
    }
  }

  export function getStationsGeoJson($g: $sdk.GreyCat = globalThis.greycat.default, $signal?: AbortSignal): Promise<stations.GeoJsonData> {
    return $g.call('stations::getStationsGeoJson', undefined, $signal);
  }
  export function getStationDataById(id: bigint | number, $g: $sdk.GreyCat = globalThis.greycat.default, $signal?: AbortSignal): Promise<$sdk.std.core.Table> {
    return $g.call('stations::getStationDataById', [id], $signal);
  }
}

export namespace weather_index {
}

export namespace weather {
  export class Weather extends $sdk.GCObject {
    static readonly _type = 'weather::Weather';

    precipitation: $sdk.std.core.nodeTime;
    temperature: $sdk.std.core.nodeTime;

    static createFrom({precipitation, temperature}: {precipitation: $sdk.std.core.nodeTime, temperature: $sdk.std.core.nodeTime}, $g: $sdk.GreyCat = globalThis.greycat.default): Weather {
      return new Weather($g.abi.libs_by_name.get(projectlib.name)!.mapped[8], precipitation, temperature);
    }
    static create(precipitation: $sdk.std.core.nodeTime, temperature: $sdk.std.core.nodeTime, $g: $sdk.GreyCat = globalThis.greycat.default): Weather {
      return new Weather($g.abi.libs_by_name.get(projectlib.name)!.mapped[8], precipitation, temperature);
    }
  }

  export class WeatherService extends $sdk.GCObject {
    static readonly _type = 'weather::WeatherService';


    static createFrom($g: $sdk.GreyCat = globalThis.greycat.default): WeatherService {
      return new WeatherService($g.abi.libs_by_name.get(projectlib.name)!.mapped[9]);
    }
    static create($g: $sdk.GreyCat = globalThis.greycat.default): WeatherService {
      return new WeatherService($g.abi.libs_by_name.get(projectlib.name)!.mapped[9]);
    }
  }

}

export namespace station_index {
}

export namespace station {
  export class Station extends $sdk.GCObject {
    static readonly _type = 'station::Station';

    id: bigint | number;
    river: $sdk.std.core.node;
    city: string;
    coordinates: $sdk.std.core.geo;
    waterLevels: $sdk.std.core.nodeTime;
    alertLevels: globalThis.Array<number>;
    weather: weather.Weather | null;

    static createFrom({id, river, city, coordinates, waterLevels, alertLevels, weather}: {id: bigint | number, river: $sdk.std.core.node, city: string, coordinates: $sdk.std.core.geo, waterLevels: $sdk.std.core.nodeTime, alertLevels: globalThis.Array<number>, weather: weather.Weather | null}, $g: $sdk.GreyCat = globalThis.greycat.default): Station {
      return new Station($g.abi.libs_by_name.get(projectlib.name)!.mapped[10], id, river, city, coordinates, waterLevels, alertLevels, weather);
    }
    static create(id: bigint | number, river: $sdk.std.core.node, city: string, coordinates: $sdk.std.core.geo, waterLevels: $sdk.std.core.nodeTime, alertLevels: globalThis.Array<number>, weather: weather.Weather | null, $g: $sdk.GreyCat = globalThis.greycat.default): Station {
      return new Station($g.abi.libs_by_name.get(projectlib.name)!.mapped[10], id, river, city, coordinates, waterLevels, alertLevels, weather);
    }
  }

}

export namespace station_service {
  export class StationService extends $sdk.GCObject {
    static readonly _type = 'station_service::StationService';


    static createFrom($g: $sdk.GreyCat = globalThis.greycat.default): StationService {
      return new StationService($g.abi.libs_by_name.get(projectlib.name)!.mapped[11]);
    }
    static create($g: $sdk.GreyCat = globalThis.greycat.default): StationService {
      return new StationService($g.abi.libs_by_name.get(projectlib.name)!.mapped[11]);
    }
  }

}

export namespace river {
  export class River extends $sdk.GCObject {
    static readonly _type = 'river::River';

    id: bigint | number;
    name: string;
    stations: $sdk.std.core.nodeIndex;

    static createFrom({id, name, stations}: {id: bigint | number, name: string, stations: $sdk.std.core.nodeIndex}, $g: $sdk.GreyCat = globalThis.greycat.default): River {
      return new River($g.abi.libs_by_name.get(projectlib.name)!.mapped[12], id, name, stations);
    }
    static create(id: bigint | number, name: string, stations: $sdk.std.core.nodeIndex, $g: $sdk.GreyCat = globalThis.greycat.default): River {
      return new River($g.abi.libs_by_name.get(projectlib.name)!.mapped[12], id, name, stations);
    }
  }

}

export namespace river_index {
}

export namespace $anon$ {
}

export const projectlib: $sdk.Library = {
  name: 'project',
  mapped: new globalThis.Array(13),
  configure(loaders, factories) {
    factories.set(importer.WaterImporter._type, importer.WaterImporter);
    factories.set(importer.WeatherImporter._type, importer.WeatherImporter);
    factories.set(importer_service.WeatherImporterService._type, importer_service.WeatherImporterService);
    factories.set(importer_service.WaterImporterService._type, importer_service.WaterImporterService);
    factories.set(stations.GeoJsonGeometry._type, stations.GeoJsonGeometry);
    factories.set(stations.GeoJsonStationProperties._type, stations.GeoJsonStationProperties);
    factories.set(stations.GeoJsonFeature._type, stations.GeoJsonFeature);
    factories.set(stations.GeoJsonData._type, stations.GeoJsonData);
    factories.set(weather.Weather._type, weather.Weather);
    factories.set(weather.WeatherService._type, weather.WeatherService);
    factories.set(station.Station._type, station.Station);
    factories.set(station_service.StationService._type, station_service.StationService);
    factories.set(river.River._type, river.River);
  },
  init(abi) {
    this.mapped[0] = abi.type_by_fqn.get(importer.WaterImporter._type);
    if (this.mapped[0]) {
      this.mapped[0].static_values = {['rootUrl']: "https://heichwaasser.lu/api/v1",['riversEndpoint']: "/rivers",['stationsEndpoint']: "/stations",};
    }
    this.mapped[1] = abi.type_by_fqn.get(importer.WeatherImporter._type);
    this.mapped[2] = abi.type_by_fqn.get(importer_service.WeatherImporterService._type);
    this.mapped[3] = abi.type_by_fqn.get(importer_service.WaterImporterService._type);
    this.mapped[4] = abi.type_by_fqn.get(stations.GeoJsonGeometry._type);
    this.mapped[5] = abi.type_by_fqn.get(stations.GeoJsonStationProperties._type);
    this.mapped[6] = abi.type_by_fqn.get(stations.GeoJsonFeature._type);
    this.mapped[7] = abi.type_by_fqn.get(stations.GeoJsonData._type);
    this.mapped[8] = abi.type_by_fqn.get(weather.Weather._type);
    this.mapped[9] = abi.type_by_fqn.get(weather.WeatherService._type);
    this.mapped[10] = abi.type_by_fqn.get(station.Station._type);
    this.mapped[11] = abi.type_by_fqn.get(station_service.StationService._type);
    this.mapped[12] = abi.type_by_fqn.get(river.River._type);
  },
};
