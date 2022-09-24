import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <h3 className='m-0'>Topic</h3>
                    <p>{props.dataset.topic}</p>
                </div>
                <div>
                    <h3 className='m-0'>Description</h3>
                    <p>{props.dataset.description}</p>
                </div>
                <div>
                    <h3 className='m-0'>Post Category</h3>
                    <p>{props.dataset.postCategory}</p>
                </div>
            </Modal.Body>
        </Modal>
    );
}

function ViewModal(props) {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                <i className="fa fa-eye" aria-hidden="true"></i>
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                dataset={props.dataset}
            />
        </>
    );
}

export default ViewModal;