import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from 'react-bootstrap/Form';

function CreatePost() {

    const [topic, setTopic] = useState()
    const [description, setDescription] = useState()
    const [postCategory, setPostCategory] = useState()

    const inputHandler = (e) => {
        e.target.name === 'topic' ? setTopic(e.target.value) : e.target.name === 'description' ? setDescription(e.target.value) : setPostCategory(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        let data = {
            topic: topic,
            description: description,
            postCategory: postCategory
        }
        console.log(data);
        axios.post('http://localhost:8080/post', data)
            .then((response) => {
                if (response.data.success) {
                    setTopic('')
                    setDescription('')
                    setPostCategory('')
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }


    return (
        <React.Fragment>
            <div className="my-3">
                <h1>Create New Post</h1><br />
                <Form.Group controlId="formFile1" className="mb-3">
                    <Form.Label>Topic</Form.Label>
                    <Form.Control type="text" placeholder="Enter Topic" name="topic" onChange={inputHandler} />
                </Form.Group>
                <Form.Group controlId="formFile2" className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter Description" name="description" onChange={inputHandler} />
                </Form.Group>
                <Form.Group controlId="formFile3" className="mb-3">
                    <Form.Label>Post Category</Form.Label>
                    <Form.Control type="text" placeholder="Enter Post Category" name="postCategory" onChange={inputHandler} />
                </Form.Group>
                <Button className="btn-success" onClick={submitHandler} ><i className="fa fa-floppy-o" aria-hidden="true"></i>&nbsp;Save</Button>
            </div>
        </React.Fragment>
    )
}


export default CreatePost;