import { useState } from "react";
import { createCharacter } from '../../api/characters'
import { newCharacterSuccess, newCharacterFailure} from '../shared/AutoDismissAlert/messages'
import CharacterForm from "../shared/CharacterForm";

import { useNavigate } from "react-router-dom";

const AddCharacter = (props) => {
    const { user, msgAlert } = props
    console.log('User: ', user)

    const navigate = useNavigate()
    
    const [character, setCharacter] = useState({
        name: '',
        voicedBy: '',
        human: false
    })

    const onChange = (e) => {
        e.persist()

        setCharacter(prevCharacter => {
            const newName = e.target.name
            let newValue = e.target.value

            console.log('input: ', e.target.type)

            if (newName === 'human' && e.target.checked) {
                newValue = true
            } else if (newName === 'human' && !e.target.checked) {
                newValue = false
            }

            const updatedCharacter = {
                [newName] : newValue
            }

            console.log('Changed charcater: ', updatedCharacter)

            return {
                ...prevCharacter, ...updatedCharacter
            }
        })
    }
    
    const onSubmit = (e) => {
        e.preventDefault()

        createCharacter(user, character)
            .then(res => {navigate(`/characters/${res.data.character._id}`)})
            .then(() => {
                msgAlert({
                    heading: 'What Time Is It!?',
                    message: newCharacterSuccess,
                    variant: 'success'
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'Awh dude... no!',
                    message: newCharacterFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <CharacterForm
            character={character}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="It's Adventure Time!"    
        />
    )
}

export default AddCharacter