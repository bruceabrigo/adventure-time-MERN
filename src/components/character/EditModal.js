import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import CharacterForm from '../shared/CharacterForm'
import messages from '../shared/AutoDismissAlert/messages'

const EditCharacterModal = (props) => {
    const { user, show, handleClose, updateCharacter, msgAlert, triggerRefresh } = props
    console.log('props in modal: ', props)

    const [character, setCharacter] = useState(props.character)
    console.log('character in modal: ', character)

    const onChange = (e) => {
        e.persist()
        
        setCharacter(prevChar => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (updatedName === 'human' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'human' && !e.target.checked) {
                updatedValue = false
            }
            
            const updatedCharacter = {
                [updatedName] : updatedValue
            }
            
            console.log('the character', updatedCharacter)

            return {
                ...prevChar, ...updatedCharacter
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        updateCharacter(user, character)
            // first we'll handle closing the modal
            .then(() => handleClose())
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.updateCharacterSuccess,
                    variant: 'success'
                })
            })
            // if everything goes according to plan, we need a refresh of the show page.
            // we'll build a function in the ShowPet component that does this for us, and we'll import that here as a prop
            // this triggeres a refresh of te parent(showPet) by changing the value of the updated
            .then(() => triggerRefresh()) //calls use effect again bc of the dependancy array 
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.updateCharacterFailure,
                    variant: 'danger'
                })
            })

    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <CharacterForm 
                    character={character} 
                    handleChange={onChange} 
                    handleSubmit={onSubmit} 
                    heading="Update Character"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditCharacterModal