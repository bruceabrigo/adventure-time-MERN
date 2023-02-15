import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'

import { getAllCharacters } from '../../api/characters' // import index axios call

import messages from '../shared/AutoDismissAlert/messages'


const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const CharacterIndex = (props) => { //props is msgAlert that is passed from App.js
    const [characters, setCharacters] = useState(null) // while there are no characters, character is set to null, until an axios call can be made to populate (setCharacter) null state.
    const [error, setError] = useState(false) // if no error then false. If error, set error to true
    console.log('these are the characters in index', characters) // debugging
    const { msgAlert } = props

    useEffect(() => { // once an axios call is made, set characters to object array 
        getAllCharacters()
            .then(res => setCharacters(res.data.characters)) // characters are found, so send response data
            .catch(err => {
                msgAlert({
                    heading: 'Error getting characters',
                    message: 'Could not find any characters',
                    variant: 'danger'
                })
                setError(true)
            })
    }, [])

    if (error) {
        return <p>Error!</p>
    }

    if (!characters) {
        return <LoadingScreen/>
    } else if (characters.length === 0) {
        return <p>No pets yet, go add some!</p>
    }

    const characterChards = characters.map(character => (
        <Card key ={character._id }style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ character.name }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <p>Voice By: {character.voicedBy}</p>
                    <Link to={`/characters/${character._id}`} className="btn btn-info">View { character.name }</Link>
                </Card.Text>
                {/* this is a ternary */}
                {/* this is a ternary */}
            </Card.Body>
        </Card>
    ))

    return (
        <div className="container-md" style={ cardContainerStyle }>
            { characterChards }
        </div>
    )
}

export default CharacterIndex