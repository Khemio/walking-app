import Button from "@/src/components/Button";
import { makeMainLoc } from "@/src/lib/mock";
import { useUserStore } from "@/src/lib/store";
import { StyleSheet, Text, View } from "react-native";

export default function ModUser() {
    const user = useUserStore((state) => state.user);
    const modUsername = useUserStore((state) => state.mod_username);
    const modStepCount = useUserStore((state) => state.mod_step_count);
    const incStepCount = useUserStore((state) => state.inc_step_count);
    const modCurRoute = useUserStore((state) => state.mod_cur_route);
    const modLastRoute = useUserStore((state) => state.mod_last_route);

return (
    <View style={styles.container}>
        <Text style={styles.text}>{user.username}  {user.step_count} {user.cur_route_id} {user.last_route_id}</Text>

        <Button label="Mod username" handler={() => modUsername("oliver")}/>
        <Button label="Mod step count" handler={() => modStepCount(7000)}/>
        <Button label="Inc step count" handler={() => incStepCount(69)}/>
        <Button label="Mod cur route" handler={() => modCurRoute(makeMainLoc().id)}/>
        <Button label="Mod last route" handler={() => modLastRoute(useUserStore.getState().routes.at(-1)!.id)}/>
        
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