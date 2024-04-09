import axios from "axios"

export const trelloClient = axios.create({
    baseURL: "https://api.trello.com/1",
    headers: {
        oauth_consumer_key: process.env.api_key,
        oauth_token: process.env.api_token
    }
})

export const defaultAuthBody = {
    token: process.env.api_token,
    key: process.env.api_key
}

