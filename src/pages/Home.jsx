import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    Categories,
    SortPopup,
    PizzaBlock,
    PizzaLoadingBlock,
} from "../components";

import { setCategory, setSortBy } from "../redux/actions/filters";
import { fetchPizzas } from "../redux/actions/pizzas";
import { addPizzaToCart } from "../redux/actions/cart";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

const categoryNames = [
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
];
const sortIems = [
    { name: "популярности", type: "popular", order: "desc" },
    { name: "цене", type: "price", order: "desc" },
    { name: "алфавит", type: "name", order: "asc" },
];

function Home() {
    const dispatch = useDispatch();
    const cartItems = useSelector(({ cart }) => cart.items);
    const { category, sortBy } = useSelector(({ filters }) => filters);

    const queryCLient = useQueryClient();
    const { data: items, isLoading } = useQuery(
        ["pizzas", sortBy, category],
        () => {
            return axios.get(
                `${process.env.REACT_APP_SERVER}/pizzas?${
                    category !== null ? `category=${category}` : ""
                }&_sort=${sortBy.type}&_order=${sortBy.order}`
            );
        }
    );

    React.useEffect(() => {
        dispatch(fetchPizzas(sortBy, category));
    }, [category, sortBy, dispatch]);

    const onSelectCategory = React.useCallback(
        (index) => {
            dispatch(setCategory(index));
        },
        [dispatch]
    );

    const onSelectSortType = React.useCallback(
        (type) => {
            dispatch(setSortBy(type));
        },
        [dispatch]
    );

    const handleAddPizzaToCart = (obj) => {
        dispatch({
            type: "ADD_PIZZA_CART",
            payload: obj,
        });
    };

    console.log(items);

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    activeCategory={category}
                    onClickCategory={onSelectCategory}
                    items={categoryNames}
                />
                <SortPopup
                    activeSortType={sortBy.type}
                    items={sortIems}
                    onClickSortType={onSelectSortType}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {!isLoading
                    ? items.data.map((obj) => (
                          <PizzaBlock
                              onClickAddPizza={handleAddPizzaToCart}
                              key={obj.id}
                              addedCount={
                                  cartItems[obj.id] &&
                                  cartItems[obj.id].items.length
                              }
                              {...obj}
                          />
                      ))
                    : Array(12)
                          .fill(0)
                          .map((_, index) => <PizzaLoadingBlock key={index} />)}
            </div>
        </div>
    );
}

export default Home;
