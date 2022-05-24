
import { savePDF } from '@progress/kendo-react-pdf';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import orderApi from '../../api/OrderApi';
import Pagination from '../../site/components/Pagination';
import '../components/css/invoicePDF.css'

function Order() {
    const [orders, setOrders] = useState({});
    const [emailSearch, setEmailSearch] = useState(null)
    const [update, setUpdate] = useState(false)
    const [orderChoose, setOrderChoose] = useState(null)
    const pdfExportComponent = useRef(null);
    const status = [

        {
            id: 1,
            status: 'PROCESSING',
            description: 'Đang xử lý',
            relate: [1, 3]
        },
        {
            id: 2,
            status: 'CONFIRMED',
            description: 'Xác nhận',
            relate: [4, 3]
        },
        {
            id: 3,
            status: 'COMPLETED',
            description: 'Hoàn thành',
            relate: []
        },
        {
            id: 4,
            status: 'CANCELED',
            description: 'Hủy bỏ',
            relate: []
        },
        {
            id: 5,
            status: 'DELIVERY',
            description: 'Đang giao hàng',
            relate: [2, 3]
        }];
    const exportPDFWithMethod = () => {
        let element = document.querySelector(".invoice") || document.body;
        savePDF(element, {
            paperSize: "A4",
            fileName: `HD${orderChoose.orderId}_${orderChoose.user.fullname}_${orderChoose.createAt}.pdf`
        });
    };
    const [filter, setFilter] = useState({
        email: null,
        page: 1,
        sortField: 'orderId',
        sortDir: 'desc',
        paymentMethod: null,
        status: null
    })
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (order) => {
        console.log("show", order)
        setOrderChoose(order);
        setShow(true)
    };
    const handleChangeEmail = (e) => {
        setEmailSearch(e.target.value);

    }
    const handleChangeStatus = (order, status) => {
        console.log(status)
        const param = {
            orderId: +order.orderId,
            status: status
        }
        orderApi.changeOrderStatus(param).then(
            response => {
                console.log(response)
                setUpdate(!update)
                toast.success('Cập nhập trạng thái đơn hàng thành công')
            }, error => {
                console.log(error)
                toast.error('Cập nhập trạng thái đơn hàng thất bại')
            }
        )
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        setFilter({ ...filter, email: emailSearch })
    }

    const handleFilter = (sortField) => {
        console.log(sortField)
        setFilter({ ...filter, sortField: sortField, sortDir: filter.sortDir == 'desc' ? 'asc' : 'desc' })
    }
    const handlePage = (action) => {
        if (action === "next") {
            setFilter({ ...filter, page: filter.page += 1 }
            );
        }

        else {
            setFilter({ ...filter, page: filter.page -= 1 });
        }


    }
    const handlePaymentMethod = (method) => {
        setFilter({ ...filter, paymentMethod: method, status: null });
    }
    const handleStatus = (status) => {
        setFilter({ ...filter, paymentMethod: null, status: status });
    }
    console.log("filter", filter)
    useEffect(() => {
        orderApi.listAll(filter).then(
            response => {
                console.log(response);
                setOrders(response);
            }
        )
    }, [filter, update])
    return (
        <>

            <div className="page-header">
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <div className="title ">
                            <h4>Quản lý đơn hàng</h4>
                        </div>
                        <nav aria-label="breadcrumb" role="navigation">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item "><Link to={"/dashboard/home"}>Trang chủ </Link></li>
                                <li className="breadcrumb-item active" aria-current="page"> Quản lý đơn hàng</li>
                            </ol>
                        </nav>
                    </div>

                </div>
            </div>
            <div className="row">
                <div className="col-md-8 col-sm-12">

                </div>
                <div className="col-md-4 col-sm-12">
                    <form onSubmit={(e) => handleOnSubmit(e)}>
                        <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
                            <div className="input-group" style={{ marginBottom: '0' }}>
                                <input type="text" placeholder="Email khách hàng..." onChange={handleChangeEmail} aria-describedby="button-addon1" value={emailSearch} className="form-control border-0 bg-light" />
                                <div className="input-group-append">
                                    <button id="button-addon1" type="submit" className="btn btn-link text-primary"><i className="fa fa-search"></i></button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="card-box mb-30">
                <div className="pd-20">
                    <h4 className="text-blue h4 text-center">Danh sách đơn hàng</h4>

                </div>
                <div className="pb-20">
                    <table className=" table stripe hover nowrap">
                        <thead>
                            <tr>
                                <th><button type="button" className="btn btn-light" onClick={() => handleFilter('createAt')}>Ngày</button></th>
                                <th className="table-plus datatable-nosort"><button type="button" className="btn btn-light" onClick={() => handleFilter('createAt')} disabled>Khách hàng</button></th>


                                <th><button type="button" className="btn btn-light" onClick={() => handleFilter('orderAddress')}>Địa chỉ</button></th>
                                <th>

                                    <Dropdown>
                                        <Dropdown.Toggle bsPrefix={' btn-light'} variant="light" id="dropdown-basic">

                                            Thanh toán

                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handlePaymentMethod(null)}>Tất cả</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handlePaymentMethod('CASH')}><i className="icon-copy fa fa-money" aria-hidden="true"></i> Tiền mặt</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handlePaymentMethod('PAYPAL')}><i className="icon-copy fa fa-cc-paypal" aria-hidden="true"></i> Paypal</Dropdown.Item>

                                        </Dropdown.Menu>
                                    </Dropdown>
                                </th>
                                <th>
                                    <Dropdown>
                                        <Dropdown.Toggle bsPrefix={' btn-light'} variant="light" id="dropdown-basic">

                                            Tình trạng

                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleStatus(null)}>Tất cả</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleStatus('CONFIRMED')}>Xác nhận </Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleStatus('PROCESSING')}>Đang xử lý </Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleStatus('DELIVERY')}>Đang vận chuyển </Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleStatus('COMPLETED')}>Hoàn tất</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleStatus('CANCELED')}>Hủy bỏ</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown></th>
                                <th className="datatable-nosort"><button type="button" class="btn btn-light" disabled>Hành động</button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.orders && orders.orders.map((order, index) => {
                                    return <tr>
                                        <td className="table-plus">{new Date(order.createAt).toISOString().replace('T', ' ').split(".")[0]}</td>
                                        <td>{order.user && order.user.email}</td>
                                        <td>{order.orderAddress}</td>
                                        <td>{order.paymentMethod.description}</td>
                                        <td>
                                            <Dropdown>
                                                <Dropdown.Toggle bsPrefix={`btn ${order.orderStatus.statusName == 'PROCESSING' ? 'btn-info' :
                                                    order.orderStatus.statusName == 'CONFIRMED' ? 'btn-primary' :
                                                        order.orderStatus.statusName == 'COMPLETED' ? 'btn-success' :
                                                            order.orderStatus.statusName == 'CANCELED' ? 'btn-danger' :
                                                                'btn-secondary '} btn-sm`} id="dropdown-basic">

                                                    <div > {order.orderStatus.description}</div>

                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    {/* {status.map((s, index) => {
                                                        if (s.status !== order.orderStatus.statusName) {
                                                            s.relate.map((id, index) => {
                                                                return <Dropdown.Item style={{ cursor: 'pointer' }} onClick={() => handleChangeStatus(order, s.status)}>{index} </Dropdown.Item>
                                                            })

                                                        }


                                                    }) */}
                                                    {
                                                        orders && status[order.orderStatus.statusId - 1].relate.length > 0 && (status[order.orderStatus.statusId - 1].relate.map(id => {
                                                            return <Dropdown.Item style={{ cursor: 'pointer' }} onClick={() => handleChangeStatus(order, status[id].status)}>{status[id].description} </Dropdown.Item>
                                                        }))
                                                    }

                                                    {/* <Dropdown.Item onClick={() => handleChangeStatus('PROCESSING')}>PROCESSING </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleChangeStatus('DELIVERY')}>DELIVERY </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleChangeStatus('COMPLETED')}>COMPLETED</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleChangeStatus('CANCELED')}>CANCELED</Dropdown.Item> */}
                                                </Dropdown.Menu>
                                            </Dropdown></td>
                                        <td>

                                            <Dropdown>
                                                <Dropdown.Toggle bsPrefix={'btn'} variant="light" id="dropdown-basic">

                                                    <i className="dw dw-more btn btn-link font-24 p-0 line-height-1 no-arrow"></i>

                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#/action-1" onClick={() => handleShow(order)}><i className="dw dw-edit2"></i>Chi tiết</Dropdown.Item>

                                                    <Modal show={show} size="lg" onHide={handleClose} animation={true}>
                                                        <Modal.Header>
                                                            <Modal.Title className="text-center">Chi tiết đơn hàng</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body className='invoice'>

                                                            {/* <div className="invoice-wrap" style={{ width: '90%' }}>
                                                                <div className="invoice-box"> */}
                                                            <div className="invoice-header">
                                                                <div className="logo text-center">
                                                                    <img src="vendors/images/deskapp-logo.png" alt="" />
                                                                </div>
                                                            </div>
                                                            <h4 className="text-center  weight-600 text-success">Đơn hàng</h4>
                                                            <div className="row pb-30">
                                                                <div className="col-md-6">
                                                                    <h5 className="mb-15">{order.user.fullname}</h5>

                                                                    <p className="font-14 mb-5">Địa Chỉ: <strong className="weight-600">{order.orderAddress}</strong></p>
                                                                    <p className="font-14 mb-5">Mã đơn hàng: <strong className="weight-600">{order.orderId}</strong></p>
                                                                    <p className="font-14 mb-5">Ngày đặt hàng: <strong className="weight-600">{new Date(order.createAt).toISOString().replace('T', ' ').split(" ")[0]}</strong></p>
                                                                </div>
                                                                <div className="col-md-6">

                                                                    <div class="text-right">
                                                                        <p class="font-14 mb-5">Grocery Store </p>
                                                                        <p class="font-14 mb-5">Cần Thơ, Việt Nam</p>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className="invoice-desc pb-30">
                                                                <table className=" table stripe hover nowrap">
                                                                    <thead>
                                                                        <tr>


                                                                            <th className="table-plus datatable-nosort">Sản phẩm</th>
                                                                            <th>Tên sản phẩm</th>



                                                                            <th className="text-center">Số lượng</th>
                                                                            <th>Giá bán</th>
                                                                            <th className="text-danger">Thành tiền</th>
                                                                        </tr>
                                                                    </thead>
                                                                    {/* Object.keys(orderChoose).length >= 0 && Object.keys(orderChoose.items).length >= 0 */}
                                                                    <tbody>
                                                                        {
                                                                            orderChoose != null && orderChoose.items != null && orderChoose.items.map((item, index) => {
                                                                                return <tr key={index}>

                                                                                    <td className="table-plus">
                                                                                        <img src={`/upload/${item.product.productImages[0].imageUrl}`} width="70" height="70" alt="" />
                                                                                        {/* <img src="vendors/images/product-1.jpg" width="70" height="70" alt="" /> */}
                                                                                    </td>
                                                                                    <td>{item.product.productName}</td>
                                                                                    <td className="text-center">{item.quantity}</td>
                                                                                    <td><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} /></td>
                                                                                    <td><NumberFormat value={item.price * item.quantity} displayType={'text'} thousandSeparator={true} suffix={' đ'} /></td>

                                                                                </tr>
                                                                            })
                                                                        }

                                                                    </tbody>

                                                                </table>

                                                                <div className="col-11 text-right m-3"><strong>Tổng tiền: </strong>
                                                                    <span style={{ fontSize: '20px' }} className="text-success"><NumberFormat value={orderChoose != null && orderChoose.items != null &&
                                                                        orderChoose.items.reduce((s, item) => s + item.quantity * item.price, 0)
                                                                    } displayType={'text'} thousandSeparator={true} suffix={' đ'} /> </span>


                                                                </div>

                                                            </div>

                                                            {/* </div>
                                                            </div> */}

                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <Button
                                                                className="btn btn-success"
                                                                onClick={exportPDFWithMethod}
                                                            >In hóa đơn</Button>
                                                            <Button variant="secondary" onClick={handleClose}>
                                                                Close
                                                            </Button>

                                                        </Modal.Footer>
                                                    </Modal>


                                                </Dropdown.Menu>
                                            </Dropdown>


                                        </td>
                                    </tr>
                                })
                            }

                        </tbody>

                    </table>

                    {
                        orders &&
                        (<Pagination page={filter.page} totalPage={orders.totalPage
                        } handlePage={handlePage} />)
                    }

                </div>

            </div>


        </>
    );
}

export default Order;