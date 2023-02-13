import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {Container, Card, Button} from 'react-bootstrap'
import { getOneCharacter } from '../../api/characters'

import messages from '../shared/AutoDismissAlert/messages'

const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}


const ShowOneCharacter = (props) => {
    const [character, setCharacter] = useState(null)
    console.log('one character in show', character)

    const {id} = useParams()

    const {user, msgAlert} = props
    console.log('user in show: ', user)

    useEffect(() => {
        getOneCharacter(id)
            .then(res => setCharacter(res.data.character))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting characters',
                    message: 'Could not find any characters',
                    variant: 'danger'
                })
            })
    }, [])

    if (!character){
        return <h2>loading...</h2>
    }
    
    return (
        <>
            <Container>
                <Card>
                <Card.Header>{character.name}</Card.Header>
                    <Card.Body>
                        <div><small>Human: {character.human ? 'yes': 'no'}</small></div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default ShowOneCharacter