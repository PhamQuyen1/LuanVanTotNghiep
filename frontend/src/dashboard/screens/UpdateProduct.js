import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import categoryApi from '../../api/CategoryApi';
import productApi from '../../api/ProductApi';

function UpdateProduct() {

    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [productImages, setProductImages] = useState([]);

    const { productId } = useParams() || null;
    const history = useHistory();

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            productId: null,
            categoryId: null,
            productName: null,
            description: null,
            discount: 0,
            price: 0,
            quantity: 0,
            uploadImage: false
        }
    })

    const onSubmit = (data) => {

        const productRequest = {
            productId: data.productId || null,
            categoryId: data.category.categoryId,
            productName: data.productName,
            description: data.description,
            discount: data.discount,
            price: data.price,
            quantity: data.quantity,
            uploadImage: productImages.length != 0 ? true : false
        }

        let formData = new FormData();
        formData.append('productRequest', new Blob([JSON.stringify(productRequest)], { type: "application/json" }))
        if (productImages.length != 0)
            Array.from(productImages).map((image, index) => {
                formData.append('file',
                    new File([image], image.name, { type: "multipart/form-data" })
                )
            })

        console.log(formData)
        if (productId != null) {
            productApi.updateProduct(formData).then(
                response => {

                    console.log(response)
                    toast.success("Cập nhập sản phẩm thành công")
                    history.push('/dashboard/product')

                }, error => {
                    toast.success("Cập nhập sản phẩm thất bại")
                    history.push('/dashboard/product')
                }
            )
        } else {
            productApi.createProduct(formData).then(
                response => {
                    console.log(response)
                    toast.success("Thêm sản phẩm thành công")
                    history.push('/dashboard/product')

                }, error => {
                    toast.success("Thêm sản phẩm thất bại")
                    history.push('/dashboard/product')
                }
            )
        }
    }
    useEffect(() => {

        const fecthProduct = async () => {
            try {
                const product = await productApi.getProductById(productId);
                console.log("1", product);
                setProduct(product);
                reset(product)

            } catch (error) {
                console.log(error);
            }
        }

        window.scrollTo(0, 0);
        if (productId != null) {
            fecthProduct();
        }

        categoryApi.getAll().then(
            response => {
                setCategory(response);

            }, error => {
                console.log(error);
            }
        )
    }, [])
    console.log('image', productImages)
    return (
        <>
            <div className="page-header">
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <div className="title">
                            <h4>{productId != null ? 'Cập nhập sản phẩm' : 'Thêm sản phẩm'}</h4>
                        </div>
                        <nav aria-label="breadcrumb" role="navigation">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to={"/dashboard/home"}>Trang chủ </Link></li>
                                <li className="breadcrumb-item active" aria-current="page">{productId != null ? 'Cập nhập sản phẩm' : 'Thêm sản phẩm'}</li>
                            </ol>
                        </nav>
                    </div>

                </div>
            </div>

            <div className="card-box mb-30 p-5" style={{ minHeight: '500px' }}>
                <div className="container mt-5 d-flex justify-content-center">
                    <div className="row">
                        <div className="col">
                            <form
                                className="shadow-lg
                              rounded bg-light p-2"
                                style={{ width: '700px' }}
                                onSubmit={handleSubmit(onSubmit)} >
                                <h4 className="text-center text-primary">Thông tin sản phẩm</h4>
                                <div className="form-row">
                                    <div className="form-group col">
                                        <label for="name">Tên sản phẩm:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            {...register('productName', { required: true })} />
                                        <div className='text-error'>{errors.productName && <><i class="icon-copy fa fa-times-rectangle" aria-hidden="true"></i> Tên sản phẩm không được trống</>}</div>
                                    </div>
                                    <div className="form-group col">
                                        <label for="danhmuc">Loại sản phẩm: </label>
                                        {/* <select id="action" className="custom-select">
                                            <option value="0">Lọa hoa</option>
                                            <option value="1">Bàn</option>
                                            <option value="2">Thảm</option>
                                        </select> */}
                                        <select name="func" className="custom-select"
                                            {...register('category.categoryId', {
                                                required: true
                                            })}
                                        // defaultValue={product.category && product.category.categoryName}
                                        >
                                            {
                                                category.map((c, index) => {
                                                    return <option value={c.categoryId} selected={product.category && c.categoryId == product.category.categoryId}>{c.categoryName}</option>
                                                })
                                            }


                                        </select>
                                    </div>
                                </div>


                                <div className="form-row">
                                    <div className="form-group col">
                                        <label for="price">Giá:</label>
                                        <input
                                            type="number"
                                            {...register('price', { required: true, min: 0 })}
                                            className="form-control"
                                            id="price"
                                        />
                                        <div className='text-error'>{errors.price && <><i class="icon-copy fa fa-times-rectangle" aria-hidden="true"></i> Sản phẩm cần giá bán</>}</div>
                                    </div>
                                    <div className="form-group col">
                                        <label for="price">Khuyến mãi(%):</label>
                                        <input
                                            type="number"
                                            {...register('discount', { required: true, min: 0 })}
                                            className="form-control"
                                            id=""
                                        />
                                        <div className='text-error'>{errors.discount && <><i class="icon-copy fa fa-times-rectangle" aria-hidden="true"></i> Khuyến mãi ít nhất là 0%</>}</div>
                                    </div>
                                    <div className="form-group col">
                                        <label for="quanlity">Số lượng:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="quanlity"

                                            {...register('quantity', { required: true, min: 1 })} />
                                        <div className='text-error'>{errors.quantity && <><i class="icon-copy fa fa-times-rectangle" aria-hidden="true"></i> Số lượng phải lớn hơn 0</>}</div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="mb-3">
                                        <label for="quycach">Mô tả:</label>
                                        <textarea
                                            className="form-control "
                                            id="quycach"
                                            {...register('description', { required: true, min: 1 })} ></textarea>
                                        <div className='text-error'>{errors.description && <><i class="icon-copy fa fa-times-rectangle" aria-hidden="true"></i> Sản phẩm cần mô tả</>}</div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Hình ảnh</label>
                                    <input
                                        type="file"
                                        multiple
                                        className="form-control-file form-control height-auto"
                                        required={productId !== null ? false : true}
                                        onChange={e => setProductImages(e.target.files)} />
                                </div>
                                {
                                    productImages.length != 0 ? (
                                        <div>
                                            {/* <img alt="not fount" width={"250px"} src={URL.createObjectURL(productImages)} /> */}
                                            {productImages && Array.from(productImages).map((image, index) => {

                                                return <>
                                                    <img alt="not fount" id='' width={"250px"} src={URL.createObjectURL(image)} />
                                                </>
                                            })}

                                        </div>
                                    ) :
                                        product.productImages &&

                                        (
                                            <div>
                                                {product.productImages.map((image, index) => {
                                                    return <>
                                                        <img alt="not fount" id='imageeeee' width={"250px"} src={`/upload/${image.imageUrl}`} />
                                                    </>
                                                })}



                                            </div>
                                        )

                                }
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

export default UpdateProduct;