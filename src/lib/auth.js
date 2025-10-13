export let authenticated = false;

export function useAuth() {
    console.log(authenticated);
    if (!authenticated) {
        authenticated = !authenticated;
    }
    // return authenticated;
}