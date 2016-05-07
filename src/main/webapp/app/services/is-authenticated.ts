export function isAuthenticated() {
    return !!localStorage.getItem("id_token");
}