import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import categoryApi from '../../api/CategoryApi';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';


function SaveOrUpdateCategory() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [category, setCatgory] = useState({})
    const [categoryRequest, setCategoryRequest] = useState({
        categoryId: null,
        categoryName: null,
        categoryImage: null,
        uploadImage: false
    })
    const history = useHistory();
    const { categoryId } = useParams();
    function onSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append('category', new Blob([JSON.stringify(categoryRequest)], { type: "application/json" })
            // JSON.stringify(categoryRequest), { type: "application/json" }
        )
        // formData.append('categoryName', categoryRequest.categoryName)
        // formData.append('categoryImage', categoryRequest.categoryImage)
        // formData.append('uploadImage', categoryRequest.uploadImage)
        if (selectedImage != null)
            formData.append('file',
                new File([selectedImage], selectedImage.name, { type: "multipart/form-data" })
                //  selectedImage, { type: "multipart/form-data" }
            )
        console.log(formData);
        if (Object.keys(category).length != 0) {
            categoryApi.updateCategory(formData).then(
                response => {
                    console.log(response)
                    toast.success('Bạn đã cập nhập thành công')
                    history.push('/dashboard/category')
                }, error => {
                    toast.success('Bạn đã cập nhập thất bại')
                    history.push('/dashboard/category')
                }
            )
        } else {
            categoryApi.addCategory(formData).then(
                response => {
                    console.log(response)
                    toast.success('Bạn đã thêm danh mục thành công')
                    history.push('/dashboard/category')
                }, error => {
                    toast.error('Bạn đã thêm danh mục thất bại')
                }
            )
        }
        // <Redirect to={'/dashboard/category'} />
        // toast.success('Bạn đã cập nhập thành công')
        // toast.promise(
        //     onSubmit,
        //     {
        //         pending: 'Promise is pending',
        //         success: 'Promise resolved 👌',
        //         error: 'Promise rejected 🤯'
        //     }
        // )

    }
    console.log(1111, selectedImage)
    useEffect(() => {
        if (categoryId != null)
            categoryApi.getCategoryById(categoryId).then(
                response => {
                    console.log(22222222222, response);
                    setCatgory(response)
                    setCategoryRequest({
                        ...categoryRequest,
                        categoryId: response.categoryId,
                        categoryName: response.categoryName,
                        categoryImage: response.categoryImage
                    })
                    setSelectedImage(new File((`/upload/${response.categoryImage}`)))

                }
            )
    }, [])
    return (
        <>
            <div className="page-header">
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <div className="title">
                            <h4>{categoryId != null ? 'Cập nhập danh mục' : 'Thêm danh mục sản phẩm'}</h4>
                        </div>
                        <nav aria-label="breadcrumb" role="navigation">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to={"/dashboard/home"}>Trang chủ </Link></li>
                                <li className="breadcrumb-item active" aria-current="page">{categoryId != null ? 'Cập nhập danh mục' : 'Thêm danh mục sản phẩm'}</li>
                            </ol>
                        </nav>
                    </div>

                </div>
            </div>

            <div className="card-box mb-30 p-5" style={{ minHeight: '500px' }}>
                <div className="container mt-5 d-flex justify-content-center">
                    <div className="row">
                        <div className="col">
                            <form onSubmit={onSubmit} className="shadow-lg rounded bg-light p-2" style={{ width: '700px' }}>
                                <h4 className="text-center text-primary">Thông tin danh mục</h4>
                                <div className="form-group">
                                    <label for="id">Id:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        defaultValue={category ? category.categoryId : ' '}
                                        disabled

                                    />
                                </div>
                                <div className="form-group">
                                    <label for="name">Tên danh mục:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={e => setCategoryRequest({ ...categoryRequest, categoryName: e.target.value })}
                                        required={
                                            // Object.keys(category).length != 0 ? false : 
                                            true}
                                        // defaultValue={category ? category.categoryName : ' '}
                                        placeholder={category.categoryName}
                                        value={categoryRequest.categoryName}

                                    />
                                </div>
                                <div className="form-group">
                                    <label>Hình ảnh</label>
                                    <input
                                        type="file"
                                        className="form-control-file form-control height-auto"
                                        required={
                                            Object.keys(category).length != 0 ? false :
                                                true}
                                        onChange={(event) => {
                                            console.log(event.target.files[0]);
                                            setSelectedImage(event.target.files[0]);
                                            setCategoryRequest({ ...categoryRequest, categoryImage: event.target.files[0].name, uploadImage: true })


                                        }} />

                                </div>
                                {selectedImage ? (
                                    <div>
                                        <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />


                                    </div>
                                ) :
                                    (Object.keys(category).length != 0 ?
                                        (<div>
                                            <img alt="not fount" id='imageeeee' width={"250px"} src={`/upload/${category.categoryImage}`} />


                                        </div>)
                                        : ' '
                                    )}
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">
                                        <h4 className="text-light">Đồng ý</h4>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SaveOrUpdateCategory;