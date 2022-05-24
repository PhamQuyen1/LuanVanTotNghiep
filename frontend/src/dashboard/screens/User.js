import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Modal } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import userApi from '../../api/UserApi';
import Pagination from '../../site/components/Pagination';

function User() {
    const [emailSearch, setEmailSearch] = useState(null);
    const [users, setUsers] = useState({});
    const [show, setShow] = useState(false);
    const [update, setUpdate] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const [modifiedInforRequest, setModifiedInfoRequest] = useState({})
    const [filter, setFilter] = useState({
        email: null,
        page: 1,
        sortDir: 'desc',
        sortField: 'userId'
    });
    const handleChangeEmail = (e) => {
        setEmailSearch(e.target.value);

    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setFilter({ ...filter, email: emailSearch })
    }

    const handleFilter = (sortField) => {
        console.log(sortField)
        setFilter({ ...filter, sortField: sortField, sortDir: filter.sortDir == 'desc' ? 'asc' : 'desc' })
    }

    const handleLockUser = (user, locked) => {
        const request = {
            userId: user.userId,
            locked: locked,
            role: user.role.roleName
        }

        userApi.modifiedUser(request).then(
            response => {
                console.log(response);
                setUpdate(!update);
                if (locked)
                    toast.success('Khóa thành công')
                else
                    toast.success('Mở khóa thành công')
            }, error => {
                toast.error('Opps...Đã xẩy ra lỗi')
            }
        )
    }
    const handleChangeRole = (user, role) => {
        console.log(user, role)
        const request = {
            userId: user.userId,
            locked: user.locked,
            role: role
        }
        userApi.modifiedUser(request).then(
            response => {
                console.log(response);
                setUpdate(!update);
                toast.success('Cập nhập vai trò thành công')
            }, error => {
                toast.error('Opps...Đã xẩy ra lỗi')
            }
        )
    }
    const handleSubmit = (e) => console.log(1, e)
    const handlePage = (action) => {
        if (action === "next") {
            setFilter({ ...filter, page: filter.page += 1 }
            );
        }

        else {
            setFilter({ ...filter, page: filter.page -= 1 });
        }


    }
    useEffect(() => {
        userApi.listAll(filter).then(
            response => {
                console.log(response);
                setUsers(response);
            }
        )
    }, [filter, update])
    return (
        <>
            <div className="page-header">
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <div className="title">
                            <h4>Quản lý người dùng</h4>
                        </div>
                        <nav aria-label="breadcrumb" role="navigation">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to={"/dashboard/home"}>Trang chủ </Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Quản lý người dùng</li>
                            </ol>
                        </nav>
                    </div>

                </div>
            </div>
            <div className="row">
                <div className="col-md-8 col-sm-12">
                    {/* <a data-toggle="modal" data-target="#bd-example-modal-lgn" type="button" className="btn btn-outline-primary btn-lg m-2 mb-4">Thêm người dùng</a> */}
                </div>
                <div className="col-md-4 col-sm-12">
                    <form onSubmit={(e) => handleOnSubmit(e)}>
                        <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
                            <div class="input-group" style={{ marginBottom: '0' }}>
                                <input type="search" onChange={handleChangeEmail} value={emailSearch} placeholder="Email..." aria-describedby="button-addon1" class="form-control border-0 bg-light" />
                                <div class="input-group-append">
                                    <button id="button-addon1" type="submit" class="btn btn-link text-primary"><i class="fa fa-search"></i></button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="card-box mb-30">
                <div className="pd-20">
                    <h4 className="text-blue h4">Danh sách người dùng</h4>

                </div>
                <div className="pb-20">
                    <table className=" table stripe hover nowrap">
                        <thead>
                            <tr>
                                <th className='text-left'><button type="button" class="btn btn-light" onClick={() => handleFilter('userId')}>ID</button></th>
                                <th className='text-left'><button type="button" class="btn btn-light" onClick={() => handleFilter('fullname')}>Tên</button></th>
                                <th className='text-left'><button type="button" class="btn btn-light" onClick={() => handleFilter('email')}>Email</button></th>
                                <th className='text-left'><button type="button" class="btn btn-light" onClick={() => handleFilter('phone')}>SĐT</button></th>
                                <th className='text-left'><button type="button" class="btn btn-light" disabled>Vai trò</button></th>
                                <th className='text-left'><button type="button" class="btn btn-light" onClick={() => handleFilter('address')}>Địa chỉ</button></th>

                                <th className='text-left'><button type="button" class="btn btn-light" disabled>Hành động</button></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                users.users && users.users.map((user, index) => {
                                    return <tr>
                                        <td className='text-left'>{user.userId}</td>
                                        <td className='text-left'>{user.fullname}</td>
                                        <td className='text-left'>{user.email}</td>
                                        <td className='text-left'>{user.phone}</td>
                                        <td className='text-left'>
                                            <Dropdown>
                                                <Dropdown.Toggle bsPrefix={'btn'} variant="light" id="dropdown-basic">

                                                    {user.role.description}

                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    {
                                                        user.role.roleName != 'USER' && (
                                                            <Dropdown.Item href="#/action-1" onClick={e => handleChangeRole(user, 'USER')}><i className="dw dw-edit2"></i>Khách hàng</Dropdown.Item>
                                                        )
                                                    }
                                                    {
                                                        user.role.roleName != 'EMPLOYEE' && (
                                                            <Dropdown.Item href="#/action-1" onClick={e => handleChangeRole(user, 'EMPLOYEE')}><i className="dw dw-edit2"></i>Nhân viên</Dropdown.Item>
                                                        )
                                                    }
                                                    {
                                                        user.role.roleName != 'ADMIN' && (
                                                            <Dropdown.Item href="#/action-1" onClick={e => handleChangeRole(user, 'ADMIN')}><i className="dw dw-edit2"></i>Quản trị viên</Dropdown.Item>
                                                        )
                                                    }


                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                        <td>{user.address}</td>

                                        <td>{
                                            user.locked !== true ? (
                                                <Dropdown.Item href="#/action-3" onClick={e => handleLockUser(user, true)}><i class="icon-copy fa fa-lock" aria-hidden="true"></i> Chặn người dùng</Dropdown.Item>
                                            )
                                                :
                                                (
                                                    <Dropdown.Item href="#/action-3" onClick={e => handleLockUser(user, false)}><i class="icon-copy fa fa-unlock" aria-hidden="true"></i>Hủy chặn người dùng</Dropdown.Item>
                                                )
                                        }
                                            {/* <Dropdown>
                                                <Dropdown.Toggle bsPrefix={'btn'} variant="light" id="dropdown-basic">

                                                    <i className="dw dw-more btn btn-link font-24 p-0 line-height-1 no-arrow"></i>

                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#/action-1" onClick={handleShow}><i className="dw dw-edit2"></i>Chi tiết</Dropdown.Item>

                                                    <Modal show={show} size="sm" onHide={handleClose} animation={true}>
                                                        <Modal.Header>
                                                            <Modal.Title>Chỉnh sửa vai trò</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <form action="" method="post" >
                                                                <div className="form-row">
                                                                    <div className="form-group">
                                                                        <label for="name">Người dùng:</label>
                                                                        <input type="text" className="form-control" id="name" required="" />
                                                                    </div>
                                                                </div>

                                                                <div className="form-row">


                                                                    <div className="form-group">
                                                                        <label for="danhmuc">Vai trò: </label>
                                                                        <select id="action" className="custom-select">
                                                                            <option value="0" onClick={e => handleChangeRole(e)}>USER</option>
                                                                            <option value="1">EMPLOYEE</option>
                                                                            <option value="2">ADMIN</option>
                                                                        </select>
                                                                    </div>
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
                                                    {
                                                        user.locked !== true ? (
                                                            <Dropdown.Item href="#/action-3" onClick={e => handleLockUser(user, true)}><i class="icon-copy fa fa-lock" aria-hidden="true"></i> Chặn người dùng</Dropdown.Item>
                                                        )
                                                            :
                                                            (
                                                                <Dropdown.Item href="#/action-3" onClick={e => handleLockUser(user, false)}><i class="icon-copy fa fa-unlock" aria-hidden="true"></i>Hủy chặn người dùng</Dropdown.Item>
                                                            )
                                                    }


                                                </Dropdown.Menu>
                                            </Dropdown> */}

                                        </td>
                                    </tr>
                                })
                            }


                        </tbody>

                    </table>
                    {
                        users &&
                        (<Pagination page={filter.page} totalPage={users.totalPage
                        } handlePage={handlePage} />)
                    }
                </div>

            </div>
        </>
    );
}

export default User;