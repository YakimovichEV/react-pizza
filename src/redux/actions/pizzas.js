import axios from "axios";

export const setLoaded = (payload) => ({
    type: "SET_LOADED",
    payload,
});

export const fetchPizzas = (sortBy, category) => (dispatch) => {
    dispatch(setLoaded(false));

    axios
        .get(
            `${process.env.REACT_APP_SERVER}/pizzas?${
                category !== null ? `category=${category}` : ""
            }&_sort=${sortBy.type}&_order=${sortBy.order}`
        )
        .then(({ data }) => {
            dispatch(setPizzas(data));
        });
};

export const setPizzas = (items) => ({
    type: "SET_PIZZAS",
    payload: items,
});
