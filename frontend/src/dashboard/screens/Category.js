import React, { useEffect, useRef, useState } from 'react';
import { Button, Dropdown, Modal } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import categoryApi from '../../api/CategoryApi';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const schema = yup.object({
    categoryId: yup.number(),
    categoryName: yup.string().required('Tên danh mục không được rỗng'),
    categoryImage: yup.mixed().required('Hình ảnh không được rỗng'),
}).required();

function Category() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const [isDeteteCategory, setDeleteCategory] = useState(false)
    const [categories, setCategories] = useState([]);
    const [categoryRequest, setCategoryRequest] = useState({
        categoryId: null,
        categoryName: null,
        categoryImage: null,
        uploadImage: false
    })
    const [show, setShow] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = (categoryItem) => {
        setShow(true);

        setCategoryRequest({
            categoryId: categoryItem.categoryId,
            categoryName: categoryItem.categoryName,
            categoryImage: null,
            uploadImage: false
        })

        console.log(categoryRequest);
    }
    const refSubmitButtom = useRef(null);
    const onSubmit = (data) => {
        let formData = new FormData();
        if (selectedImage != null)
            formData.append('file', selectedImage);
        formData.append('category', {
            categoryId: categoryRequest.categoryId,
            categoryName: data.categoryName,
            categoryImage: data.categoryImage[0],
            uploadImage: true
        })
        console.log(1, data)
        for (var value of formData.values()) {
            console.log('value', value);
        }
    }

    const handleDeleteCategory = (e) => {
        console.log('e', e);
        categoryApi.deleteCategory(e).then(
            response => {
                console.log(response)
                setDeleteCategory(!isDeteteCategory)
                toast.success('Bạn đã xóa danh mục thành công')
            }, error => {
                console.log(error)
                toast.success('Bạn đã xóa danh mục thất bại')
            }
        )
    }
    useEffect(() => {
        categoryApi.getAll().then(
            response => {
                console.log(response);
                setCategories(response);
            }
        )
    }, [isDeteteCategory])
    useEffect(() => {
        categoryApi.getAll().then(
            response => {
                console.log(response);
                setCategories(response);
            }
        )
    }, [])
    return (
        <>
            <div className="page-header">
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <div className="title">
                            <h4>Quản lý danh mục</h4>
                        </div>
                        <nav aria-label="breadcrumb" role="navigation">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to={"/dashboard/home"}>Trang chủ </Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Quản lý danh mục</li>
                            </ol>
                        </nav>
                    </div>

                </div>
            </div>
            <div className="row">
                <div className="col-md-8 col-sm-12">
                    <Link to={'/dashboard/saveOrUpdateCategory'} data-toggle="modal" data-target="#bd-example-modal-lgn" type="button" className="btn btn-outline-primary btn-lg m-2 mb-4">Thêm danh mục</Link>
                </div>

            </div>
            <div className="modal fade" id="Medium-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" style={{ display: 'none' }}>
                <div className="modal-dialog modal-dialog-centered">

                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="text-center text-primary">Thông tin danh mục</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                        </div>
                        <div className="modal-body">

                            <form >
                                <div className="form-group">
                                    <label for="name">Tên danh mục:</label>
                                    <input type="text" className="form-control" id="name" required="" />
                                </div>
                                <div className="form-group">
                                    <label>Hình ảnh</label>
                                    <input type="file" className="form-control-file form-control height-auto" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>

                    </div>

                </div>
            </div>
            <div className="card-box mb-30">
                <div className="pd-20">

                    <h4 className="text-blue text-center h3">Danh sách danh mục sản phẩm</h4>

                </div>
                <div className="pb-20">
                    <table className=" table stripe hover nowrap">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên danh mục</th>
                                <th className="table-plus datatable-nosort">Hình ảnh</th>
                                <th className="datatable-nosort">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories && categories.map((category, index) => {
                                    return <tr key={index}>
                                        <td>{category.categoryId}</td>
                                        <td>{category.categoryName}</td>
                                        <td><img src={`/upload/${category.categoryImage}`} width="70" height="70" alt="" /></td>


                                        <td>

                                            <Dropdown>
                                                <Dropdown.Toggle bsPrefix={'btn'} variant="light" id="dropdown-basic">

                                                    <i className="dw dw-more btn btn-link font-24 p-0 line-height-1 no-arrow"></i>

                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item
                                                    // onClick={() => handleShow(category)}
                                                    ><i className="dw dw-edit2"></i><Link to={`/dashboard/saveOrUpdateCategory/${category.categoryId}`}>Chỉnh sửa</Link></Dropdown.Item>

                                                    <Modal show={show} size="sm" onHide={handleClose} animation={true}>
                                                        <Modal.Header>
                                                            <Modal.Title>Thông tin danh mục</Modal.Title>
                                                        </Modal.Header>
                                                        <form id="form11" onSubmit={handleSubmit(onSubmit)}>
                                                            <Modal.Body>
                                                                <div className="form-group">
                                                                    <label for="id">Id:</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="name"
                                                                        placeholder={category.categoryId}
                                                                        defaultValue={category.categoryId}
                                                                        disabled
                                                                        {...register('categoryId')} />
                                                                </div>

                                                                <div className="form-group">
                                                                    <label for="name">Tên danh mục:</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="name"
                                                                        required=""
                                                                        // value={category.categoryName}
                                                                        {...register('categoryName')}
                                                                    />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label>Hình ảnh</label>

                                                                    <input
                                                                        type="file"
                                                                        className="form-control-file form-control height-auto"
                                                                        {...register('categoryImage')}
                                                                        onChange={(event) => {
                                                                            console.log(event.target.files[0]);
                                                                            setSelectedImage(event.target.files[0]);
                                                                            setCategoryRequest({ ...categoryRequest, categoryImage: event.target.files[0], uploadImage: true })
                                                                            console.log(22, categoryRequest)
                                                                        }} />
                                                                </div>
                                                                {selectedImage && (
                                                                    <div>
                                                                        <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />


                                                                    </div>
                                                                )}


                                                            </Modal.Body>
                                                            <Modal.Footer>
                                                                <Button variant="secondary" onClick={handleClose}>
                                                                    Close
                                                                </Button>
                                                                <Button type='submit' variant="primary" onClick={handleClose}>
                                                                    Save Changes
                                                                </Button>
                                                            </Modal.Footer>
                                                        </form>
                                                    </Modal>

                                                    <Dropdown.Item onClick={e => handleDeleteCategory(category.categoryId)} ><i className="dw dw-delete-3"></i> Xóa</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>

                    </table>

                </div>

            </div>
        </>
    );
}

export default Category;