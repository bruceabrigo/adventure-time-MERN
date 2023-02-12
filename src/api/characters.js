import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAllCharacters = () => {
    return axios(`${apiUrl}/characters`)
}

export const getOnePet = (id) => {
    return axios(`${apiUrl}/characters/${id}`)
}

export const createChar = (user, newChar) => {
    console.log('User: ',user)
    console.log('New Char', newChar)
}