import {Form, Button, Container} from 'react-bootstrap'

const characterForm = (props) => {
    const {character, handleChange, handleSubmit, heading} = props
    // console.log('character in edit', character)
    return (
        <Container className='justify-content-center'>
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                {/* Character name Group */}
                <Form.Group className='m-2'>
                    <Form.Label>Character:</Form.Label>
                    <Form.Control
                        placeholder='Who are we adding?'
                        name='name'
                        id='name'
                        value={character.name}
                        onChange={handleChange}
                    />
                </Form.Group>
                {/* Character voice actor Group */}
                <Form.Group className='m-2'>
                    <Form.Label>Voiced By:</Form.Label>
                    <Form.Control
                        placeholder='Who speaks for thy?'
                        name='voicedBy'
                        id='voicedBy'
                        value={character.voicedBy}
                        onChange={handleChange}
                    />
                </Form.Group>
                {/* Human Checkbox name Group */}
                <Form.Group className='m-2'>
                    <Form.Label>To Human? Or Not to Human?</Form.Label>
                    <Form.Check
                        label='Is bro even human?'
                        name='human'
                        defaultChecked={character.human}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}
export default characterForm