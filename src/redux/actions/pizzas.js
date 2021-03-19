import axios from "axios";

export const setLoaded = (payload) => ({
    type: "SET_LOADED",
    payload,
});

export const fetchPizzas = (sortBy, category) => (dispatch) => {
    dispatch(setLoaded(false));
};

export const setPizzas = (items) => ({
    type: "SET_PIZZAS",
    payload: items,
});
