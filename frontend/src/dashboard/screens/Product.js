import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Modal } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import categoryApi from '../../api/CategoryApi';
import productApi from '../../api/ProductApi';
import Pagination from '../../site/components/Pagination';

function Product() {
    const [productSearch, setProductSearch] = useState(null);
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState({});
    const [show, setShow] = useState(false);
    const [update, setUpdate] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [filter, setFilter] = useState({
        productName: null,
        page: 1,
        sortDir: 'desc',
        sortField: 'productId'
    });
    const handleSubmit = (e) => console.log(1, e)
    const handleChangeProductName = (e) => {
        setProductSearch(e.target.value);

    }

    const handleDeleteProduct = (productId) => {
        productApi.deleteProductById(productId).then(
            response => {
                toast.success("Xóa sản phẩm thành công")
                setUpdate(!update)
            }, error => {
                toast.success("Xóa sản phẩm thất bại")
            }
        )
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        setFilter({ ...filter, productName: productSearch })
    }

    const handleFilter = (sortField) => {
        console.log(sortField)
        setFilter({ ...filter, sortField: sortField, sortDir: filter.sortDir == 'desc' ? 'asc' : 'desc' })
    }
    const handlePage = (action) => {
        if (action === "next") {
            setFilter({ ...filter, page: filter.page += 1 });
        }

        else {
            setFilter({ ...filter, page: filter.page -= 1 });
        }


    }
    const handleCategory = (categoryId) => {
        setFilter({ ...filter, categoryId: categoryId })
    }
    useEffect(() => {
        productApi.getAll(filter).then(
            response => {
                console.log(response);
                setProducts(response);
            }
        )
        categoryApi.getAll().then(
            response => {
                setCategories(response);
            }
        )
    }, [filter, update])
    return (
        <>
            <div className="page-header">
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <div className="title">
                            <h4>Quản lý sản phẩm</h4>
                        </div>
                        <nav aria-label="breadcrumb" role="navigation">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to={"/dashboard/home"}>Trang chủ </Link></li>
                                <li className="breadcrumb-item active" aria-current="page"> Quản lý sản phẩm</li>
                            </ol>
                        </nav>
                    </div>

                </div>
            </div>
            <div className="row">
                <div className="col-md-8 col-sm-12">
                    <Link to={'/dashboard/updateProduct'} data-toggle="modal" data-target="#bd-example-modal-lgn" type="button" className="btn btn-outline-primary btn-lg m-2 mb-4">Thêm sản phẩm</Link>
                </div>
                <div className="col-md-4 col-sm-12">
                    <form onSubmit={(e) => handleOnSubmit(e)}>
                        <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
                            <div class="input-group" style={{ marginBottom: '0' }}>
                                <input type="search" onChange={handleChangeProductName} value={productSearch} placeholder="Tên sản phẩm..." aria-describedby="button-addon1" class="form-control border-0 bg-light" />
                                <div class="input-group-append">
                                    <button id="button-addon1" type="submit" class="btn btn-link text-primary"><i class="fa fa-search"></i></button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="modal fade bs-example-modal-lg" id="bd-example-modal-lgn" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style={{ display: 'none' }} aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="text-center text-primary">Thông tin sản phẩm</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                        </div>
                        <div className="modal-body">
                            <form action="" method="post" >

                                <div className="form-row">
                                    <div className="form-group col">
                                        <label for="name">Tên sản phẩm:</label>
                                        <input type="text" className="form-control" id="name" required="" />
                                    </div>
                                    <div className="form-group col">
                                        <label for="danhmuc">Loại sản phẩm: </label>
                                        <select id="action" className="custom-select">
                                            <option value="0">Lọa hoa</option>
                                            <option value="1">Bàn</option>
                                            <option value="2">Thảm</option>
                                        </select>
                                    </div>
                                </div>


                                <div className="form-row">
                                    <div className="form-group col">
                                        <label for="price">Giá:</label>
                                        <input type="number" className="form-control" id="price" required="" />
                                    </div>
                                    <div className="form-group col">
                                        <label for="quanlity">Số lượng:</label>
                                        <input type="number" className="form-control" id="quanlity" required="" min="1" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col">
                                        <label for="price1">Kích thước:</label>
                                        <input type="text" className="form-control" id="price1" required="" />
                                    </div>
                                    <div className="form-group col">
                                        <label for="danhmuc">Tình trạng: </label>
                                        <select id="action" className="custom-select">
                                            <option value="0">Đang bán</option>
                                            <option value="1">Ngưng bán</option>

                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="mb-3">
                                        <label for="quycach">Mô tả:</label>
                                        <textarea className="form-control " id="quycach"></textarea>
                                    </div>
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
                    <h4 className="text-blue h4">Danh sách sản phẩm</h4>

                </div>
                <div className="pb-20">
                    <table className=" table stripe hover nowrap">
                        <thead>
                            <tr>
                                <th><button type="button" class="btn btn-light" onClick={() => handleFilter('productId')}>ID</button></th>
                                <th><button type="button" class="btn btn-light" disabled>Sản phẩm</button></th>
                                <th className="table-plus datatable-nosort"><button type="button" class="btn btn-light" onClick={() => handleFilter('productName')}>Tên sản phẩm</button></th>


                                <th><Dropdown>
                                    <Dropdown.Toggle bsPrefix={' btn-light'} variant="light" id="dropdown-basic">

                                        Thể loại

                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => handleCategory(null)}>Tất cả</Dropdown.Item>
                                        {
                                            categories && categories.map((category, index) => {
                                                return <Dropdown.Item onClick={() => handleCategory(category.categoryId)}> {category.categoryName}</Dropdown.Item>
                                            })

                                        }

                                    </Dropdown.Menu>
                                </Dropdown></th>
                                <th><button type="button" class="btn btn-light" onClick={() => handleFilter('createAt')}>Ngày nhập</button></th>
                                <th><button type="button" class="btn btn-light" onClick={() => handleFilter('quantity')}>Tồn kho</button></th>
                                <th><button type="button" class="btn btn-light" onClick={() => handleFilter('price')}>Giá bán</button></th>
                                <th className="datatable-nosort"><button type="button" class="btn btn-light" disabled>Hành động</button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.products && products.products.map((product, index) => {
                                    return <tr key={index}>
                                        <td>{product.productId}</td>
                                        <td className="table-plus"><img src={`/upload/${product.productImages[0].imageUrl}`} width="70" height="70" alt="" /></td>
                                        <td>{product.productName}</td>
                                        <td><button type="button" class={`btn btn-info btn-sm`}> {product.category.categoryName}</button></td>
                                        <td>{new Date(product.createAt).toISOString().replace('T', ' ').split(" ")[0]}</td>
                                        <td>{product.quantity}</td>
                                        <td><NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} /></td>
                                        <td>
                                            <Dropdown>
                                                <Dropdown.Toggle bsPrefix={'btn'} variant="light" id="dropdown-basic">

                                                    <i className="dw dw-more btn btn-link font-24 p-0 line-height-1 no-arrow"></i>

                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#/action-1" onClick={handleShow}><Link to={`/dashboard/updateProduct/${product.productId}`}><i className="dw dw-edit2"></i>Chỉnh sửa</Link></Dropdown.Item>

                                                    <Modal show={show} size="lg" onHide={handleClose} animation={true}>
                                                        <Modal.Header>
                                                            <Modal.Title>Chỉnh sửa sản phẩm</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <form action="" method="post" >

                                                                <div className="form-row">
                                                                    <div className="form-group col">
                                                                        <label for="name">Tên sản phẩm:</label>
                                                                        <input type="text" className="form-control" id="name" required="" />
                                                                    </div>
                                                                    <div className="form-group col">
                                                                        <label for="danhmuc">Loại sản phẩm: </label>
                                                                        <select id="action" className="custom-select">
                                                                            <option value="0">Lọa hoa</option>
                                                                            <option value="1">Bàn</option>
                                                                            <option value="2">Thảm</option>
                                                                        </select>
                                                                    </div>
                                                                </div>


                                                                <div className="form-row">
                                                                    <div className="form-group col">
                                                                        <label for="price">Giá:</label>
                                                                        <input type="number" className="form-control" id="price" required="" />
                                                                    </div>
                                                                    <div className="form-group col">
                                                                        <label for="quanlity">Số lượng:</label>
                                                                        <input type="number" className="form-control" id="quanlity" required="" min="1" />
                                                                    </div>
                                                                </div>
                                                                <div className="form-row">
                                                                    <div className="form-group col">
                                                                        <label for="price1">Kích thước:</label>
                                                                        <input type="text" className="form-control" id="price1" required="" />
                                                                    </div>
                                                                    <div className="form-group col">
                                                                        <label for="danhmuc">Tình trạng: </label>
                                                                        <select id="action" className="custom-select">
                                                                            <option value="0">Đang bán</option>
                                                                            <option value="1">Ngưng bán</option>

                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="mb-3">
                                                                        <label for="quycach">Mô tả:</label>
                                                                        <textarea className="form-control " id="quycach"></textarea>
                                                                    </div>
                                                                </div>

                                                                <div className="form-group">
                                                                    <label>Hình ảnh</label>
                                                                    <input type="file" className="form-control-file form-control height-auto" />
                                                                </div>

                                                            </form>
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <Button variant="secondary" onClick={handleClose}>
                                                                Close
                                                            </Button>
                                                            <Button type='submit' onSubmit={handleSubmit} variant="primary" onClick={handleClose}>
                                                                Save Changes
                                                            </Button>
                                                        </Modal.Footer>
                                                    </Modal>

                                                    <Dropdown.Item ><Link to={`/dashboard/review/${product.productId}`}><i className="dw dw-delete-3"></i> Xem đánh giá</Link></Dropdown.Item>
                                                    <Dropdown.Item onClick={e => handleDeleteProduct(product.productId)}><i className="dw dw-delete-3"></i> Xóa</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>

                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>

                    </table>

                    {
                        products &&
                        (<Pagination page={filter.page} totalPage={products.totalPage
                        } handlePage={handlePage} />)
                    }
                </div>
            </div>
        </>
    );
}

export default Product;