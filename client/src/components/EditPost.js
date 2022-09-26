import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function EditModal(props) {
    const [modalShow, setModalShow] = React.useState(false);

    const [topic, setTopic] = useState()
    const [description, setDescription] = useState()
    const [postCategory, setPostCategory] = useState()

    useEffect(() => {
        setTopic(props.dataset.topic)
        setDescription(props.dataset.description)
        setPostCategory(props.dataset.postCategory)
    }, [])

    const updateChangeHandler = (e) => {
        e.target.name === 'topic' ? setTopic(e.target.value) : e.target.name === 'description' ? setDescription(e.target.value) : setPostCategory(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        let data = {
            topic: topic,
            description: description,
            postCategory: postCategory,
        };
        axios.put(`http://localhost:8080/post/update/${props.dataset._id}`, data)
            .then((response) => {
                if (response.data.success) {
                    setModalShow(false)
                    props.state("false")
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>

            <Button variant="warning" onClick={() => setModalShow(true)}>
                <i className='fa fa-edit'></i>&nbsp;Edit
            </Button>

            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <h1>Update Post</h1>
                    <Form.Group controlId="formFile1" className="mb-3">
                        <Form.Label>Topic</Form.Label>
                        <Form.Control type="text" defaultValue={props.dataset.topic} onChange={updateChangeHandler} name="topic" />
                    </Form.Group>
                    <Form.Group controlId="formFile2" className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" defaultValue={props.dataset.description} onChange={updateChangeHandler} name="description" />
                    </Form.Group>
                    <Form.Group controlId="formFile3" className="mb-3">
                        <Form.Label>Post Category</Form.Label>
                        <Form.Control type="text" defaultValue={props.dataset.postCategory} onChange={updateChangeHandler} name="postCategory" />
                    </Form.Group>
                    <Button onClick={submitHandler} className="btn-success"><i className="fa fa-floppy-o" aria-hidden="true"></i>&nbsp;Save</Button>
                </Modal.Body>
            </Modal >

        </>
    );
}

export default EditModal;