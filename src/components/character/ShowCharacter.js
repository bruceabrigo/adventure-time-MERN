import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {Container, Card, Button} from 'react-bootstrap'
import { getOneCharacter, updateCharacter, removeCharacter } from '../../api/characters' // import the axios call for id specific characters
import { Link } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'
import EditCharacterModal from './EditModal'
import LoadingScreen from '../shared/LoadingScreen'


/* ------------------- Show One Character Component ------------------- */
const ShowOneCharacter = (props) => { 
    const [character, setCharacter] = useState(null) // while there are no characters, character set is set to null
    const [editModalShow, setEditModalShow] = useState(false)

    const [updated, setUpdated] = useState(false)

    console.log('one character in show', character)

    const {id} = useParams()
    const navigate = useNavigate()

    const {user, msgAlert} = props // imports msgAlert from parent prop
    console.log('user in show: ', user)

    useEffect(() => { // once axios call is made, populate (setCharacter) character with characters found by their id's
        getOneCharacter(id)
            .then(res => setCharacter(res.data.character)) // axis call found the id, and sends character data
            .catch(err => { // error handler
                msgAlert({
                    heading: 'Error getting characters',
                    message: messages.removeCharcterFailure,
                    variant: 'danger'
                })
            })
    }, [updated])

    const sendCharacterAway = () => {
        removeCharacter(user, character._id)
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    messages: messages.removeCharcterSuccess,
                    variant: 'success'
                })
            })
            .then(() => {navigate('/view-characters')})
            .catch(() => {
                msgAlert({
                    heading: 'Error',
                    message: messages.removeCharcterFailure,
                    variant: 'danger'
                })
            })
    }
    if (!character){
        return <LoadingScreen />
    }
    
    // returns character found by axios call as a card
    return (
        <>
            <Container>
                <Card>
                <Card.Header>{character.name}</Card.Header>
                    <Card.Body>
                        <div><small>Human: {character.human ? 'yes': 'no'}</small></div>
                    </Card.Body>
                    <Card.Footer>
                        {/* link back to character index */}
                        <Link to={`/view-characters`} className="btn btn-danger m-2" > Back to all Characters!</Link>
                        {/* button to setModal state to true */}

                        {
                            character.owner && user && character.owner.id === user.id
                            ?
                            <>
                                <Button
                                    className='m-2'
                                    variant='warning'
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit {character.name}
                                </Button>
                                <Button
                                    className='m-2' variant='danger'
                                    onClick={() => sendCharacterAway()}
                                >
                                    Remove {character.name}
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <EditCharacterModal
                user={user}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                character={character}
                updateCharacter={updateCharacter}
            />
        </>
    )
}

export default ShowOneCharacter