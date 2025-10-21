import Button from "@/src/components/Button";
import { useUserStore } from "@/src/lib/store";
import { Redirect } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Index() {
    const authenticated = useUserStore((state) => state.authenticated);
    const modAuth = useUserStore((state) => state.mod_auth);

    if (authenticated) {
        return <Redirect href="/home"/>
    }

    return (
        <View style={styles.container}>
            <Button label="Log in" handler={() => modAuth(true)}/>
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
})
