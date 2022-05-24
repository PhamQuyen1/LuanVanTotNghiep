
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import NumberFormat from 'react-number-format';
import orderApi from '../../api/OrderApi';
import productApi from '../../api/ProductApi';
import ItemTopReview from '../components/ItemTopReview';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const optionsMonth = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
            text: 'Thống kê doanh thu theo tháng',
        },
    },
};
const optionsDay = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
            text: 'Thống kê doanh thu theo ngày',
        },
    },
};
function Home() {
    const { user } = useSelector(state => state.todoUser);
    const [topSaleProducts, setTopSaleProducts] = useState([]);
    const [topReviewProducts, setTopReviewProducts] = useState([]);
    const [report, setReport] = useState({});
    const [dataMonth, setDataMonth] = useState({});
    const [dataDay, setDataDay] = useState({});
    const [info, setInfo] = useState({});

    useEffect(() => {
        orderApi.getReport().then(
            response => {
                console.log('aaa', response);
                setReport(response);
                setDataMonth({
                    labels: response.months.reverse().map(r => r.label),
                    datasets: [{ data: response.months.map(r => r.value), backgroundColor: 'rgba(53, 162, 235, 0.5)' }]
                })
                setDataDay({
                    labels: response.days.reverse().map(r => r.label),
                    datasets: [{ data: response.days.map(r => r.value), backgroundColor: 'rgba(255, 99, 132, 0.5)' }]
                })
            }, error => {
                console.log(error);
            }
        )
        orderApi.getInfo().then(
            response => {
                console.log('aaa', response);
                setInfo(response);

            }, error => {
                console.log(error);
            }
        )


        const fetchTopSaleProduct = async () => {
            try {
                const response = await productApi.getTopSaleProducts();
                console.log("1,", response);
                setTopSaleProducts(response);
            } catch (error) {
                console.log(error);
            }
        }
        const fetchTopReviewProduct = async () => {
            try {
                const response = await productApi.getTopReviewProducts();
                console.log(response);
                setTopReviewProducts(response);
            } catch (error) {
                console.log(error);
            }
        }

        fetchTopSaleProduct();
        fetchTopReviewProduct();

    }, []);

    return (
        <>
            <div className="page-header">
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <div className="title">
                            <h4>Trang chủ</h4>
                        </div>
                        <nav aria-label="breadcrumb" role="navigation">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="index.html">Trang chủ</a></li>

                            </ol>
                        </nav>
                    </div>

                </div>
            </div>
            <div className="card-box pd-20 height-100-p mb-30">
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <img src="vendors/images/banner-img.png" alt="" />
                    </div>
                    <div className="col-md-8">
                        <h4 className="font-20 weight-500 mb-10 text-capitalize">
                            Welcome <div className="weight-600 font-30 text-blue">{user.fullname}!</div>
                        </h4>
                        <p className="font-18 max-width-600">Grocery Store xác định luôn trung thành với những giá trị cốt lõi của mình để luôn là sự chọn số một của người tiêu dùng....</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-3 mb-30">
                    <div className="card-box height-100-p widget-style1">
                        <div className="d-flex flex-wrap align-items-center">
                            <div className="progress-data">
                                <div ><i className="icon-copy fa fa-address-book text-primary" style={{ fontSize: '85px' }} aria-hidden="true"></i></div>
                            </div>
                            <div className="widget-data">
                                <div className="h4 mb-0">{info.totalUser}</div>
                                <div className="weight-600 font-14">Người dùng</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 mb-30">
                    <div className="card-box height-100-p widget-style1">
                        <div className="d-flex flex-wrap align-items-center">
                            <div className="progress-data">
                                <div ><i className="icon-copy fa fa-cube text-success" style={{ fontSize: '85px' }} aria-hidden="true"></i></div>
                            </div>
                            <div className="widget-data">
                                <div className="h4 mb-0">{info.totalProduct}</div>
                                <div className="weight-600 font-14">Sản phẩm</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 mb-30">
                    <div className="card-box height-100-p widget-style1">
                        <div className="d-flex flex-wrap align-items-center">
                            <div className="progress-data">
                                <div ><i class="icon-copy fa fa-shopping-basket text-danger" aria-hidden="true" style={{ fontSize: '85px' }}></i></div>
                            </div>
                            <div className="widget-data">
                                <div className="h4 mb-0">{info.totalOrder} (+ {info.orderOneMonth})</div>
                                <div className="weight-600 font-14">Đơn hàng</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 mb-30">
                    <div className="card-box height-100-p widget-style1">
                        <div className="d-flex flex-wrap align-items-center">
                            <div className="progress-data">
                                <div ><i className="icon-copy fa fa-money text-success" style={{ fontSize: '85px' }} aria-hidden="true"></i></div>
                            </div>
                            <div className="widget-data">
                                <div className="h4 mb-0"><NumberFormat value={info.amountOrderOneMonth} displayType={'text'} thousandSeparator={true} suffix={' đ'} /></div>
                                <div className="weight-600 font-14">Doanh thu tháng</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card-box mb-30">
                <div className='row'>
                    <div className='col'>
                        <h2 className="h4 pd-20 text-success text-center">Sản phẩm bán nhiều nhất</h2>
                        <table className=" table nowrap">
                            <thead>
                                <tr>
                                    <th className="table-plus">Sản phẩm</th>
                                    <th>Tên</th>

                                    <th>Giá</th>
                                    <th>Tồn kho</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    topSaleProducts.map((product, index) => {
                                        return <tr>
                                            <td className="table-plus">
                                                <img src={`/upload/${product.productImages[0].imageUrl}`} width="70" height="70" alt="" />
                                            </td>
                                            <td>
                                                <h5 className="font-16">{product.productName}</h5>

                                            </td>
                                            <td><NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} /></td>
                                            <td className='text-center'>{product.quantity}</td>


                                        </tr>
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                    <div className='col'>
                        <h2 className="h4 pd-20 text-success text-center">Sản phẩm đánh giá tốt nhất</h2>
                        <table className=" table nowrap">
                            <thead>
                                <tr>
                                    <th className="table-plus">Sản phẩm</th>
                                    <th>Tên</th>
                                    <th>Số sao</th>
                                    <th>Giá</th>


                                </tr>
                            </thead>
                            <tbody>
                                {
                                    topReviewProducts.map((item, index) => {
                                        return <ItemTopReview item={item} key={index} />
                                    })
                                }

                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
            <div className="card-box mb-30">

                <div className='container'>
                    <div className='row mb-2'>
                        <h2 className="h4 pd-20 text-success text-center">Thống kê doanh thu theo ngày</h2>
                        {Object.keys(dataDay).length != 0 && <Bar options={optionsDay} data={dataDay} />}


                    </div>
                    <div className='row'>
                        <h2 className="h4 pd-20 text-success text-center">Thống kê doanh thu theo tháng</h2>

                        {Object.keys(dataMonth).length != 0 && <Bar options={optionsMonth} data={dataMonth} />}

                    </div>
                </div>


            </div>
        </>
    );
}

export default Home;