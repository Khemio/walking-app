import Button from "@/src/components/Button";
import { useUserStore } from "@/src/lib/store";
import { FlatList, StyleSheet, Text, View } from "react-native";

const new_user = {
    id: "6789",
    username: "elise",
    step_count: 9000,
    cur_route_id: null,
    last_route_id: null,
}

const modded_user = {
    id: "3456",
    username: "claire",
    step_count: 5000,
    cur_route_id: null,
    last_route_id: null,
}

const del_user_id = "3456";

export default function ModUser() {
    const friends = useUserStore((state) => state.friends);
    const addFriend = useUserStore((state) => state.add_friend);
    const modFriend = useUserStore((state) => state.mod_friend);
    const delFriend = useUserStore((state) => state.del_friend);

return (
    <View style={styles.container}>
        <FlatList data={friends}
            renderItem={({item}) => <Text style={styles.text}>
                Id: {item.id}, Username: {item.username}
            </Text>}/>
        <Button label="Add friend" handler={() => addFriend(new_user)}/>
        <Button label="Mod friend" handler={() => modFriend(modded_user.id, modded_user)}/>
        <Button label="Del friend" handler={() => delFriend(del_user_id)}/>
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