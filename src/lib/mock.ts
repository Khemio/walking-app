import * as Location from "expo-location";
import { useUserStore } from "./store";
import { Route } from "./types";

const tenMetersWithDegrees = 0.0001;

// Function to generate a location
export const getLocation = (increment: number)=> {
    return {
        // timestamp: 1000000,
        timestamp: 1000000,
        coords: {
        speed: 0,
        heading: 0,
        accuracy: 5,
        altitudeAccuracy: 5,
        altitude: 5,
        longitude: 21.621494 + increment * tenMetersWithDegrees, // add your current longitude
        latitude: 47.553466 + increment * tenMetersWithDegrees,  // add your current lattitude
        // longitude: -122.0312186 + increment * tenMetersWithDegrees, // add your current longitude
        // latitude: 37.33233141 + increment * tenMetersWithDegrees,  // add your current lattitude
        },
    };
};

// Function to set up an emmiter of fake locaation changes
function makeLocEmmiter() {
    let counter = 0;
    setInterval(() => {
        Location.EventEmitter.emit('Expo.locationChanged', {
            watchId: Location._getCurrentWatchId(),
            location: getLocation(counter),
        });
        counter++;
    }, 1000);
}

// Function to set up listener for location changes
async function watchLoc() {
    const subscription = await Location.watchPositionAsync(
        {
            accuracy: Location.Accuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1,
        },
        (location) => {
            console.log('Location changed:', location);
        }
    );
}

// Approximate location of the Interspar
const sparLoc: Location.LocationObject = {
    timestamp: 1000000,
    coords: {
        speed: 0,
        heading: 0,
        accuracy: 5,
        altitudeAccuracy: 5,
        altitude: 5,
        latitude: 47.542338,
        longitude: 21.620078,
    }
}

// Approximate location of the Kassai campus
const kassaiLoc: Location.LocationObject = {
    timestamp: 1000000,
    coords: {
        speed: 0,
        heading: 0,
        accuracy: 5,
        altitudeAccuracy: 5,
        altitude: 5,
        latitude: 47.543574,
        longitude: 21.640201,
    } 
}

// Approximate location of the Main campus
const mainLoc: Location.LocationObject = {
    timestamp: 1000000,
    coords: {
        speed: 0,
        heading: 0,
        accuracy: 5,
        altitudeAccuracy: 5,
        altitude: 5,
        latitude: 47.553466,
        longitude: 21.621494,
    } 
}

// This function generates a route with random start_time and end_time given start_loc and end_loc
export function makeMockRoute(start_loc: Location.LocationObject, end_loc: Location.LocationObject): Route {
    // const date = "November 17, 2025 9:24:00";
    const date = "November 17, 2025";
    // Math.floor(Math.random() * (max - min + 1)) + min
    const hours = Math.floor(Math.random() * (20 - 7 + 1)) + 7;
    const minutes = Math.floor(Math.random() * (59 - 0 + 1)) + 0;
    const travel = Math.floor(Math.random() * (40 - 20 + 1)) + 20;

    const start_time = new Date(date + ` ${hours}:${minutes}:00`);

    let end_time;
    if ((minutes + travel) > 60) {
        end_time = new Date(date + ` ${hours + 1}:${(minutes + travel) - 60}:00`)
    } else {
        end_time = new Date(date + ` ${hours}:${minutes + travel}:00`)
    }

    const id =  Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    return {
        id: id.toString(),
        start_loc: start_loc,
        end_loc: end_loc,
        start_time: start_time,
        end_time: end_time,
    }
}

// Creates a route from Main campus to Interspar
export const makeMainLoc = () => makeMockRoute(mainLoc, sparLoc);

// Use this function to initialize useUserStore with fake data
export function initMock() {
    const state = useUserStore.getState();

    const user = {id: "1234", username: "jared", location: getLocation(0),  step_count: 5000, cur_route_id: null, last_route_id: null};
    state.mod_auth(true);
    state.mod_user(user);

    const users = [
        {id: "2345", username: "john", step_count: 1000, location: null, cur_route_id: null, last_route_id: null},
        {id: "3456", username: "jared", step_count: 5000, location: null, cur_route_id: null, last_route_id: null},
        {id: "4567", username: "sophia", step_count: 7000, location: null, cur_route_id: null, last_route_id: null},
        {id: "5678", username: "marsh", step_count: 10000, location: null, cur_route_id: null, last_route_id: null},
    ];

    state.add_friends(users);

    const groups =  [
        {
            id: "1357",
            name: "Weekend Striders",
            members: [...[0,1].map(i => users[i])],
        },
        {
            id: "3579",
            name: "City Loop Crew",
            members: [...[1,2].map(i => users[i])],
        },
        {
            id: "5791",
            name: "Sunrise Steps",
            members: [...[0,1,2].map(i => users[i])],
        },
    ];

    state.add_groups(groups);

    state.add_route(makeMockRoute(sparLoc, kassaiLoc));
    state.add_route(makeMockRoute(kassaiLoc, mainLoc));

    // console.log(useUserStore.getState());
}
