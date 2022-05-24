import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import NumberFormat from 'react-number-format';
import reviewApi from '../../api/ReviewApi';
import '../../App.css';
function ItemTopReview({ item }) {
    const [reviewScore, setReviewScore] = useState(0);
    useEffect(() => {
        const fetchReviewScore = async () => {
            try {
                const response = await reviewApi.getReviewScore(item.productId);

                setReviewScore(response);

            } catch (error) {
                console.log(error);
            }
        }

        fetchReviewScore();
    }, []);
    return (
        <>
            <tr>
                <td className="table-plus">
                    <img src={`/upload/${item.productImages[0].imageUrl}`} width="70" height="70" alt="" />
                </td>
                <td>
                    <h5 className="font-16">{item.productName}</h5>

                </td>
                <td>
                    {
                        Array.apply(1, Array(5)).map((score, index) => {

                            return <i className={`icon-copy fa fa-star ${index + 1 <= reviewScore ? 'checked' : ''} `} aria-hidden="true"></i>
                        })
                    }
                </td>
                <td><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} /></td>


            </tr>
        </>
    );
}

export default ItemTopReview;