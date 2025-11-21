import { useUserStore } from "@/src/lib/store";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker } from 'react-native-maps';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
// const LONGITUDE_DELTA = 0.0421;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function Index() {
    const location = useUserStore((state) => state.user.location);
    
    return (
        <View style={styles.container}>
            
            <MapView 
                style={styles.map}
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