import { useUserStore } from "@/src/lib/store";
// import { Dimensions, StyleSheet, View } from "react-native";
import { StyleSheet } from "react-native";
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Map from '@/src/components/Map';

export default function Index() {
    //
    const location = useUserStore((state) => state.user.location);
    // const {Map} = await loadMapModule();
    
    return (
        // {if (Map !== null) }
        <Map location={location} />
        // <View style={styles.container}>
        //     <Text style={styles.text}>Map screen</Text>
        // </View>
        // <View style={styles.container}>
            
        //     <MapView 
        //         style={styles.map}
        //         provider={PROVIDER_GOOGLE}
        //         initialRegion={{
        //             latitude: location!.coords.latitude,
        //             longitude: location!.coords.longitude,
        //             latitudeDelta: LATITUDE_DELTA,
        //             longitudeDelta: LONGITUDE_DELTA,
        //         }}
        //     >
        //         {location !== undefined && (
        //             <Marker coordinate={{
        //                 latitude: location!.coords.latitude,
        //                 longitude: location!.coords.longitude,
        //             }}/>
        //         )}
        //     </MapView>
        // </View>
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