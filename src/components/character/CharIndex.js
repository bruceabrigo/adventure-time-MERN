import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
// import LoadingScreen from '../shared/LoadingScreen'

import { getAllCharacters } from '../../api/characters'

// api function from our api file
// need our messages from our autodismissalert directory
import messages from '../shared/AutoDismissAlert/messages'

// this is a styling object. they're a quick easy way add focused css properties to our react components
// styling objects use any css style, but in camelCase instead of the typical hyphenated naming convention
// this isbc we are in js
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}


// PetsIndex will make a request to the API for all pets
// once it receives a response, display a card for each pet
const CharacterIndex = (props) => { //props is msgAlert that is passed from App.js
    const [characters, setCharacters] = useState(null)
    const [error, setError] = useState(false)
    console.log('these are the characters in index', characters)
    // pull the message alert (msgAlert) from props
    const { msgAlert } = props

    // get our pets from the api when the component mounts
    useEffect(() => {
        getAllCharacters()
            .then(res => setCharacters(res.data.characters))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting characters',
                    message: 'Could not find any characters',
                    variant: 'danger'
                })
                setError(true)
            })
    }, [])

    // if error, display an error
    if (error) {
        return <p>Error!</p>
    }

    if (!characters) {
        // if no pets loaded yet, display 'loading'
        return <p>loading... we need characters</p>
    } else if (characters.length === 0) {
        // otherwise if there ARE no pets, display that message
        return <p>No pets yet, go add some!</p>
    }

    // once we have an array of pets, loop over them
    // produce one card for every pet
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

    // return some jsx, a container with all the petcards
    return (
        <div className="container-md" style={ cardContainerStyle }>
            { characterChards }
        </div>
    )
}

// export our component
export default CharacterIndex