import React, { useState, useEffect  } from 'react';
import { StyleSheet, StatusBar, View, Button, TextInput, Alert, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  // Location example
  const [hakuSana, setHakuSana] = useState('Kamppi, helsinki');
  const [haku, setHaku]  =  useState([]);
  const [koordinaatit, setKoordinaatit] = useState({
    latitude: 60.168535,
    longitude: 24.930494,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221
  });

  const haeOsoite = () => {
    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=2msKtjqAZ1D4pFv2irBeSRD605ROwdHA&location=${hakuSana}`)
    .then(response => response.json())
    .then(responseJson  =>  setHaku(responseJson.results[0].locations[0].latLng))
    .catch(error => { 
        Alert.alert('Error', error.message); 
    });
    paivitaKoordinaatit();
    console.log("haku: ",haku)
  }  

  const paivitaKoordinaatit = () =>{
    setKoordinaatit({
      latitude: haku.lat,
      longitude: haku.lng,
      latitudeDelta: 0.0322,
      longitudeDelta: 0.0221
    })
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={koordinaatit}
      >
        <Marker
          coordinate={koordinaatit}
          title='Haaga-Helia'
        />
      </MapView>
      <TextInput  
        onChangeText={text => setHakuSana(text)}
        placeholder='Search address' >
      </TextInput>
      <Button style={styles.nappi}  onPress={haeOsoite}
        title="Show"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  nappi: {
    borderRadius: 25,
    padding:10
  }
});