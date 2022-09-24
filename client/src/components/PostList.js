import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ViewModal from './ViewModal';
import { Link } from 'react-router-dom';
import EditModal from './EditPost';

function PostList(props) {

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/post")
            .then(res => {
                setData(res.data.existingPosts)
            })
            .catch(err => {
                console.log(err);
            })

    }, [])


    const arr = data.map((data, index) => {
        return (
            <React.Fragment key={data._id}>
                <tbody>
                    <tr>
                        <td className='text-center'>{index + 1}</td>
                        <td className='text-center'>{data.topic}</td>
                        <td className='text-center'>{data.description}</td>
                        <td className='text-center'>{data.postCategory}</td>
                        <td className='text-center'>
                            <EditModal dataset={data}/>
                            &nbsp;
                            <a className='btn btn-danger' href='#'>
                                <i className='fa fa-trash-alt'></i>&nbsp;Delete
                            </a>
                            &nbsp;
                            <ViewModal dataset={data}/>
                        </td>
                    </tr>
                </tbody>
            </React.Fragment>
        )
    })

    return (
        <React.Fragment>

            <h1 className='text-center my-3'>Post List</h1>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope='col' className='text-center'>#</th>
                        <th scope='col' className='text-center'>Topic</th>
                        <th scope='col' className='text-center'>Description</th>
                        <th scope='col' className='text-center'>Post Category</th>
                        <th scope='col' className='text-center'>Action</th>
                    </tr>
                </thead>
                {arr}
            </table>

            <Link className='btn btn-success' to={"/add"}>Create Post</Link>

        </React.Fragment>
    )
}

export default PostList;