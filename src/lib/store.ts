import { LocationObject } from "expo-location"
import { create } from "zustand"

interface User {
    id: string,
    username: string
}

interface Group {
    id: string,
    name: string,
    members: User[]
}

interface Route {
    start_time: Date,
    end_time: Date,
    start_loc: LocationObject,
    end_loc: LocationObject,
}

//TODO: Add granularity to modifications
interface UserState {
    authenticated: boolean,
    user: User,
    friends: User[],
    groups: Group[],
    routes: Route[],

    mod_auth: (auth: boolean) => void,

    mod_user: (user: User) => void,

    add_friends: (friends: User[]) => void
    add_friend: (friend: User) => void
    del_friend: (friend_id: string) => void,
    mod_friend: (friend_id: string, friend: User) => void, 

    add_group?: (group: Group) => void
    del_group?: (group_id: string) => void,
    mod_group?: (group_id: string, group: Group) => void,
    add_user_to_group?: (group_id: string, user: User) => void
    del_user_from_group?: (group_id: string, user_id: string) => void

    add_route?: (route: Route) => void,
    del_route?: (route_id: string) => void,
}

export const useUserStore = create<UserState>()((set) => ({
    authenticated: false,
    user: {id: "", username: ""},
    friends: [],
    groups: [],
    routes: [],

    mod_auth: (auth_state) => set({ authenticated: auth_state }),

    mod_user: (user) => set({ user: user }),

    add_friends: (friends) => set({ friends: friends }),
    add_friend: (friend) => set((state) => ({ friends: [...state.friends, friend ] })),
    del_friend: (friend_id) => set((state) => ({ friends: state.friends.filter((friend) => friend.id !== friend_id) })),
    mod_friend: (friend_id, friend) =>  set((state) => ({ 
        friends: [ ...state.friends.filter((friend) => friend.id !== friend_id), friend ] //TODO: Find a better way of ding this consider 'immer'
    })),
}))


export function test() {
    const state = useUserStore.getState();

    const user = {id: "1234", username: " khemio"};
    state.mod_auth(true);
    state.mod_user(user);

    const users = [
        {id: "2345", username: "john"},
        {id: "3456", username: "jared"},
        {id: "4567", username: "sophia"},
        {id: "5678", username: "marsh"},
    ];

    state.add_friends(users);

    const new_user = {id: "6789", username: "molly"};

    state.add_friend(new_user);
    
    const del_user_id = "3456";
    
    state.del_friend(del_user_id);
    
    const modded_user = {
        id: "2345",
        username: "claire"
    }
    
    state.mod_friend(modded_user.id, modded_user);
    console.log(state);
}
