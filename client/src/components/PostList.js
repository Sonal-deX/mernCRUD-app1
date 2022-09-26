import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ViewModal from './ViewModal';
import { Link } from 'react-router-dom';
import EditModal from './EditPost';
import Button from 'react-bootstrap/esm/Button';

function PostList(props) {

    const [data, setData] = useState([])
    const [loadDel, setLoadDel] = useState()
    const [loadEdi, setLoadEdi] = useState()

    const editStateHandler = (state) => {
        setLoadEdi(state);
    }


    useEffect(() => {
        setLoadDel(true)
        setLoadEdi(true)
        axios.get("http://localhost:8080/post")
            .then(res => {
                setData(res.data.existingPosts)
            })
            .catch(err => {
                console.log(err);
            })

    }, [loadDel, loadEdi])

    const deleteHandler = (e) => {
        axios.delete(`http://localhost:8080/post/delete/${e.target.dataset.id}`)
            .then(res => {
                setLoadDel(false)
            })
            .catch(err => {
                console.log(err);
            })
    }

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
                            <EditModal dataset={data} state={editStateHandler} />
                            &nbsp;
                            <Button data-id={data._id} onClick={deleteHandler} className='btn-danger'><i className='fa fa-trash-alt'></i>&nbsp;Delete</Button>
                            &nbsp;
                            <ViewModal dataset={data} />
                        </td>
                    </tr>
                </tbody>
            </React.Fragment>
        )
    })

    const filterData = (posts, searchKey) => {
        searchKey = searchKey.toLowerCase()
        const result = posts.filter((post) =>
            post.topic.toLowerCase().includes(searchKey) ||
            post.description.toLowerCase().includes(searchKey) ||
            post.postCategory.toLowerCase().includes(searchKey)
        )
        setData(result)
    }

    const searchHandler = (e) => {
        const searchkey = e.currentTarget.value
        axios.get("http://localhost:8080/post")
            .then(res => {
                filterData(res.data.existingPosts, searchkey)
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <React.Fragment>

            <nav className="navbar  mb-3">
                <div className="container-fluid">
                    <a className="navbar-brand"><h3>Post List</h3></a>
                    <form className="d-flex" role="search">
                        <input onChange={searchHandler} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    </form>
                </div>
            </nav>

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