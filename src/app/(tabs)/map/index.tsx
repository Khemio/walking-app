import Map from '@/src/components/Map';
import { useUserStore } from "@/src/lib/store";
import { StyleSheet } from "react-native";

export default function Index() {
    const location = useUserStore((state) => state.user.location);
    
    return (
        <Map location={location} />
        
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