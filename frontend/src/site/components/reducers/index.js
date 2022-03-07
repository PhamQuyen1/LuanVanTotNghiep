import { combineReducers } from "redux";
import { ADD_TO_CART, DELETE_ALL_ITEM, DELETE_ITEM, GET_ALL, TOTAL_AMOUNT, UPDATE_QUANTITY } from "../action";
import todoUser from "./auth";

const initCart = {
    Item: [],
    totalQuantity: 0,
    totalAmount: 0
}

function todoCart(state = initCart, action) {

    switch (action.type) {
        case ADD_TO_CART:
            const newState = { ...state };
            if (newState.Item.length == 0) {
                const price = action.payload.product.price - action.payload.product.price * action.payload.product.discount / 100;
                let item = {
                    product: action.payload.product,
                    quantity: action.payload.quantity,
                    price: price
                }
                console.log(item);
                console.log(newState);
                newState.Item.push(item);
                newState.totalQuantity += item.quantity;
                newState.totalAmount += item.quantity * item.price;
                console.log(newState);
            } else {
                let isExist = false;
                newState.Item.map((item, index) => {
                    if (item.product.productId == action.payload.product.productId) {
                        newState.Item[index].quantity += action.payload.quantity;
                        newState.totalQuantity += action.payload.quantity;
                        newState.totalAmount += action.payload.quantity * item.price;
                        console.log(item);
                        console.log(newState);
                        isExist = true;

                    }
                })

                if (!isExist) {
                    const price = action.payload.product.price - action.payload.product.price * action.payload.product.discount / 100;
                    let item = {
                        product: action.payload.product,
                        quantity: action.payload.quantity,
                        price: price
                    }
                    newState.Item.push(item);
                    newState.totalQuantity += item.quantity;
                    newState.totalAmount += item.quantity * item.price;
                    console.log(item);
                    console.log(newState);
                }
            }


            return newState;
        case GET_ALL:
            return state;



        case UPDATE_QUANTITY:
            const newStateUpdate = { ...state };
            newStateUpdate.Item.map((item, index) => {
                if (item.product.productId == action.payload.productId) {
                    const quantityUpdate = action.payload.quantity - item.quantity;
                    newStateUpdate.Item[index].quantity += quantityUpdate;
                    newStateUpdate.totalQuantity += quantityUpdate;
                    newStateUpdate.totalAmount += quantityUpdate * item.price;
                }
            });
            return newStateUpdate;
        case DELETE_ITEM:
            const newStateDeleteItem = { ...state };
            const item = newStateDeleteItem.Item.find(item => item.product.productId == action.payload);
            newStateDeleteItem.Item = newStateDeleteItem.Item.filter(item => item.product.productId != action.payload);
            newStateDeleteItem.totalQuantity -= item.quantity;
            newStateDeleteItem.totalAmount -= item.quantity * item.price;
            return newStateDeleteItem;
        case DELETE_ALL_ITEM:
            const newStateDeleteAllItem = { ...state };
            newStateDeleteAllItem.Item = [];
            newStateDeleteAllItem.totalQuantity = 0;
            newStateDeleteAllItem.totalAmount = 0;
            return newStateDeleteAllItem;
        default:
            return state;
    }
}
const shoppingCart = combineReducers({
    todoCart: todoCart,
    todoUser: todoUser
})
export default shoppingCart;