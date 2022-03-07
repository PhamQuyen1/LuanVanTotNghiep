import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

function CategoryItem(props) {

    const [category, setCategory] = useState(props.item);
    const [quantity, setQuantity] = useState(props.quantity);
    return (

        <div className="content-category item " key={category.categoryId}>
            <div className="content-img">
                {/* <a href="product-grid-sidebar-left.html">
                    <img className="img-fluid" src={`upload/${category.categoryImage}`} alt="Side Table" title="Side Table" />
                </a> */}
                <Link to={`/product/category/${category.categoryId}`}>
                    <img className="img-fluid" src={`upload/${category.categoryImage}`} alt="Side Table" title="Side Table" />
                </Link>
            </div>
            <div className="info-category">
                <h3>
                    {/* <a href="product-grid-sidebar-left.html">{category.categoryName}</a> */}
                    <Link to={`/product/category/${category.categoryId}`}>
                        {category.categoryName}
                    </Link>
                </h3>
                <p>Khám phá {quantity} sản phẩm</p>
            </div>
        </div>
    );
}

export default CategoryItem;