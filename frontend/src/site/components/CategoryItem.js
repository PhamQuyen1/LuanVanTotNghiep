import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function CategoryItem(props) {
    const [category, setCategory] = useState(props.item)
    // const category = props.item;
    console.log("props: ");
    return (

        <div className="content-category item " key={category.categoryId}>
            <div className="content-img">
                <a href="product-grid-sidebar-left.html">
                    <img className="img-fluid" src={`upload/${category.categoryImage}`} alt="Side Table" title="Side Table" />
                </a>
            </div>
            <div className="info-category">
                <h3>
                    <a href="product-grid-sidebar-left.html">{category.categoryName}</a>
                </h3>
                <p>Discover 120 Products </p>
            </div>
        </div>


    );
}

export default CategoryItem;