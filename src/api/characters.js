import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAllCharacters = () => {
    return axios(`${apiUrl}/characters`)
}

export const getOneCharacter = (id) => {
    return axios(`${apiUrl}/characters/${id}`)
}

export const createCharacter = (user, newCharacter) => {
    console.log('User: ',user)
    console.log('New Char', newCharacter)
    return axios({
        url: `${apiUrl}/characters`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {character: newCharacter}
    })
}

export const updateCharacter = (user, updatedCharacter) => {
    return axios({
        url: `${apiUrl}/characters/${updatedCharacter._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {character: updatedCharacter}
    })
}

export const removeCharacter = (user, characterId) => {
    return axios({
        url: `${apiUrl}/characters/${characterId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}