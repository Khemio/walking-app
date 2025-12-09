// import { useUserStore } from "@/src/lib/store";
import * as Location from "expo-location";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';
// import MapView from 'react-native-maps';

type Props = {
    location: Location.LocationObject | null
};

const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
// const LONGITUDE_DELTA = 0.0421;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function Index({location}: Props) {
    
    console.log(apiKey);
    return (
        <View style={styles.container}>
            
            <MapView 
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: location!.coords.latitude,
                    longitude: location!.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
            >
                {location !== undefined && (
                    <Marker coordinate={{
                        latitude: location!.coords.latitude,
                        longitude: location!.coords.longitude,
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