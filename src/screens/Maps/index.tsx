import React, {useEffect, useRef} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {StyleSheet} from 'react-native';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyD6X1zKZfMpfE4OwqO7qzjWrdCR3NPqmQA';

const coords = [
  {
    latitude: -23.6325329,
    longitude: -46.6679348,
    title: 'Você',
    subTitle: 'Você está aqui!',
  },
  {
    latitude: -23.5640843,
    longitude: -46.6545752,
    title: 'FIAP',
    subTitle: 'Seu destino',
  },
];

export default function Maps() {
  const mapRef = useRef<MapView>(null);

  function fitPadding() {
    mapRef.current?.fitToCoordinates([coords[0], coords[1]], {
      edgePadding: {top: 100, right: 100, bottom: 100, left: 100},
      animated: true,
    });
  }

  useEffect(() => {
    fitPadding();
  }, []);

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: -23.6325329,
        longitude: -46.6679348,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      {coords.map((coord, index) => (
        <Marker
          key={index}
          title={coord.title}
          description={coord.subTitle}
          coordinate={{
            latitude: coord.latitude,
            longitude: coord.longitude,
          }}
        />
      ))}
      <MapViewDirections
        origin={{
          latitude: coords[0].latitude,
          longitude: coords[0].longitude,
        }}
        destination={{
          latitude: coords[1].latitude,
          longitude: coords[1].longitude,
        }}
        strokeWidth={10}
        strokeColor="red"
        apikey={GOOGLE_MAPS_APIKEY}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
