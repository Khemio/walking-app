import * as Location from "expo-location";

export interface User {
    id: string,
    username: string,
    step_count: number,
    cur_route_id: string | null,
    last_route_id:  string | null,
}

export interface Group {
    id: string,
    name: string,
    members: User[],
}

export interface Route {
    id: string,
    start_time: Date,
    end_time: Date,
    start_loc: Location.LocationObject,
    end_loc: Location.LocationObject,
}
