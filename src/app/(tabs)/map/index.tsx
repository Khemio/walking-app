import Map from '@/src/components/Map';
// import { move } from '@/src/lib/mock';
import { useUserStore } from "@/src/lib/store";
import { StyleSheet } from "react-native";

// let is_moving = false;
export default function Index() {
    const location = useUserStore((state) => state.user.location);
    const {start_loc, end_loc} = useUserStore.getState().get_cur_route();
    // if (!is_moving) {
    //     is_moving = move();
    // }
    
    return (
        <Map 
            location={location?.coords} 
            start_loc={start_loc?.coords} 
            // end_loc={location?.coords} 
            end_loc={end_loc?.coords} 
        />
        
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