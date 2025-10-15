import { Redirect } from "expo-router";
// import { StyleSheet, View } from "react-native";
// import Button  from "@/src/components/Button"
// import { authenticated, useAuth } from "../lib/auth";

export default function Index() {
    // if (authenticated) {
        return <Redirect href="/home"/>
    // }
    // return (
    //     <View style={styles.container}>
    //         <Button label="Log in" handler={() => console.log("clicked")}/>
    //     </View>
    // );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#25292e',
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     text: {
//         color: '#fff'
//     },
// })