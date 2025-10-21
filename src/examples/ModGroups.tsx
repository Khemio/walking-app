import Button from "@/src/components/Button";
import { useUserStore } from "@/src/lib/store";
import { FlatList, StyleSheet, Text, View } from "react-native";

const users = useUserStore.getState().friends;

const new_group =  {
    id: "7913",
    name: "New group 4",
    members: [...[2,3].map(i => users[i])],
};

const modded_group  =  {
    id: "5791",
    name: "Modded group",
    members: [...[0,1,3].map(i => users[i])],
};

const del_group_id = "3579";

const mod_group_id = "1357";
const mod_group_user = users[3];

export default function ModGroups() {
    // const state = useUserStore((state) => state);
    const addGroup = useUserStore((state) => state.add_group);
    const modGroup = useUserStore((state) => state.mod_group);
    const delGroup = useUserStore((state) => state.del_group);
    const addUserToGroup = useUserStore((state) => state.add_user_to_group);
    const delUserFromGroup = useUserStore((state) => state.del_user_from_group);

return (
    <View style={styles.container}>
        <FlatList data={useUserStore((state) => state.groups)}
            
            renderItem={({item}) => <Text style={styles.text}>
                {item.name}: <FlatList data={item.members}
                    horizontal={true}
                    ItemSeparatorComponent={() => <Text>, </Text>}
                    renderItem={({item}) => <Text>{item.username}</Text>}/>
            </Text>}/>

        <Button label="Add group" handler={() => addGroup(new_group)}/>
        <Button label="Mod group" handler={() => modGroup(modded_group.id, modded_group)}/>
        <Button label="Del group" handler={() => delGroup(del_group_id)}/>
        <Button label="Add user" handler={() => addUserToGroup(mod_group_id, mod_group_user)}/>
        <Button label="Del user" handler={() => delUserFromGroup(mod_group_id, users[0].id)}/>
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