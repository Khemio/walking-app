import Button from "@/src/components/Button";
import { makeMainLoc } from "@/src/lib/mock";
import { useUserStore } from "@/src/lib/store";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function ModUser() {
    const routes = useUserStore((state) => state.routes);
    const addRoute = useUserStore((state) => state.add_route);
    const delRoute = useUserStore((state) => state.del_route);
    const del_route_id = routes.at(-1)?.id ? routes.at(-1)!.id : "";

return (
    <View style={styles.container}>
        <FlatList data={routes}
            renderItem={({item}) => <Text style={styles.text}>
                Start Time: {item.start_time.toTimeString()}, Start Coords: {item.start_loc.coords.longitude} {item.start_loc.coords.latitude}
            </Text>}/>
        <Button label="Add route" handler={() => addRoute(makeMainLoc())}/>
        <Button label="Del route" handler={() => {delRoute(del_route_id)}}/>
    </View>
);}

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
})