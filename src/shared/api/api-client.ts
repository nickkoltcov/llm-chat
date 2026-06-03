const BASE_URL = "http://localhost:3000"

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const finalOptions: RequestInit = {
        ...options,
        credentials: "include",
        headers: { "Content-Type": "application/json", ...options.headers }
    }

    const response = await fetch(`${BASE_URL}/${endpoint}`, finalOptions)

    if(response.status === 401) {
        if(typeof window !== "undefined") {
            window.location.href = "/login"
        }
    }

    return response
}