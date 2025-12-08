import { produce } from "immer";
import { create } from "zustand";
import { Group, Route, User } from "./types";

interface UserState {
    authenticated: boolean,
    user: User,
    friends: User[],
    groups: Group[],
    routes: Route[],

    mod_auth: (auth: boolean) => void,

    //TODO: Consider limits on user data modification
    mod_user: (user: User) => void,
    mod_username: (username: string) => void,
    mod_step_count: (step_count: number) => void,
    inc_step_count: (step_inc: number) => void,
    mod_location: (location: Location) => void,
    mod_cur_route: (route_id: string) => void,
    mod_last_route: (route_id: string) => void,

    add_friends: (friends: User[]) => void,
    add_friend: (friend: User) => void,
    del_friend: (friend_id: string) => void,
    mod_friend: (friend_id: string, friend: User) => void, 

    add_groups: (groups: Group[]) => void,
    add_group: (group: Group) => void,
    del_group: (group_id: string) => void,
    mod_group: (group_id: string, group: Group) => void,
    add_user_to_group: (group_id: string, user: User) => void,
    del_user_from_group: (group_id: string, user_id: string) => void,

    add_route: (route: Route) => void,
    del_route: (route_id: string) => void,
}

function getAuth() {
    return false;
}

function getUser() {
    return {id: "", username: "", step_count: 0, location: null, cur_route_id: null, last_route_id: null};
}

function getFriends() {
    return [];
}

function getGroups() {
    return [];
}

function getRoutes() {
    return [];
}

export const useUserStore = create<UserState>()((set) => ({
    authenticated: getAuth(),
    user: getUser(),
    friends: getFriends(),
    groups: getGroups(),
    routes: getRoutes(),

    mod_auth: (auth_state) => set({ authenticated: auth_state }),

    mod_user: (user) => set({ user: user }),
    mod_username: (username) => 
        set(
            produce((state) => { 
                state.user.username = username;
            })
        ),
    mod_step_count: (step_count) => set(
        produce((state) => { 
            state.user.step_count = step_count;
        })
    ),
    inc_step_count: (step_inc) => set(
        produce((state) => { 
            state.user.step_count += step_inc;
        })
    ),
    mod_location: (location) => set(
        produce((state) => { 
            state.user.location= location;
        })
    ),
    mod_cur_route: (route_id) => set(
        produce((state) => { 
            state.user.cur_route_id = route_id;
        })
    ),
    mod_last_route: (route_id) => set(
        produce((state) => { 
            state.user.last_route_id = route_id;
        })
    ),

    add_friends: (friends) => set((state) => ({friends: [...state.friends, ...friends]})),
    add_friend: (friend) => set((state) => ({ friends: [...state.friends, friend ] })),
    del_friend: (friend_id) => set((state) => ({ friends: state.friends.filter((friend) => friend.id !== friend_id) })),
    mod_friend: (friend_id, friend) =>  
        set(
            produce((state) => { 
                const target = state.friends.find((fr: User) => fr.id === friend_id);
                if (target) {
                    Object.assign(target, friend);
                } else {
                    console.log(`Friend with Id ${friend_id} not found`);
                }
            })
        ),

    add_groups: (groups) => set((state) => ({groups: [...state.groups, ...groups]})),
    add_group: (group) => set((state) => ({groups: [...state.groups, group]})),
    del_group: (group_id) => set((state) => ({groups: state.groups.filter((group) => group.id !== group_id)})),
    mod_group: (group_id, group) => 
        set(
            produce((state) => {
                const target = state.groups.find((gr: Group) => gr.id === group_id);
                if (target) {
                    Object.assign(target, group);
                } else {
                    console.log(`Group with Id ${group_id} not found`);
                }
            })
        ),
    add_user_to_group: (group_id, user) => 
        set(
            produce((state) => {
                const target = state.groups.find((gr: Group) => gr.id === group_id);
                if (target) {
                    target.members = [...target.members, user];
                } else {
                    console.log(`Group with Id ${group_id} not found`);
                }
            })
        ),
    del_user_from_group: (group_id, user_id) => 
        set(
            produce((state) => {
                const target = state.groups.find((gr: Group) => gr.id === group_id);
                if (target) {
                    target.members = target.members.filter((m: User) => m.id !== user_id);
                } else {
                    console.log(`Group with Id ${group_id} not found`);
                }
            })
        ),

    add_route: (route) => set((state) => ({routes: [...state.routes, route]})),
    del_route: (route_id) => set((state) => ({routes: state.routes.filter((route) => route.id !== route_id)})),
}))

