import * as Location from "expo-location";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { MapViewRoute } from 'react-native-maps-routes';

type Props = {
    location: Location.LocationObject["coords"] | undefined,
    start_loc: Location.LocationObject["coords"] | undefined,
    end_loc: Location.LocationObject["coords"] | undefined,
};

const GOOGLE_MAPS_APIKEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
// const LONGITUDE_DELTA = 0.0421;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function Index({location, start_loc, end_loc}: Props) {
    const origin = {latitude: start_loc!.latitude, longitude: start_loc!.longitude};
    const destination = {latitude: end_loc!.latitude, longitude: end_loc!.longitude};
    return (
        <View style={styles.container}>
            
            <MapView 
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: location!.latitude,
                    longitude: location!.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
            >
                {start_loc !== undefined && (
                    <MapViewRoute
                        origin={origin}
                        destination={destination}
                        apiKey={GOOGLE_MAPS_APIKEY!}
                />)}
                
                {location !== undefined && (
                    <Marker coordinate={{
                        latitude: location!.latitude,
                        longitude: location!.longitude,
                    }}/>
                )}
            </MapView>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: '#fff'
    },
    map: {
        width: '100%',
        height: '100%',
    },
})