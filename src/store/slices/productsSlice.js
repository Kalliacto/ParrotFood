import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../utils/api';
import { forErrors, isLoadingData, showError } from '../utilsStore';
import { findFavorite, myCards } from '../../utils/utils';
import { getInfoOneProduct, updateProduct } from './oneProductSlice';

const initialState = {
    dataProducts: [],
    isLoading: false,
    total: 0,
    favoritesCards: [],
};

export const getAllProductsData = createAsyncThunk(
    'products/getAllProductsData',
    async (_, { getState, fulfillWithValue }) => {
        try {
            const state = getState();
            const allProducts = await api.getAllProducts();
            return fulfillWithValue({ ...allProducts, userId: state.user.userData._id });
        } catch (error) {}
    }
);

export const changingLikeOnProductCards = createAsyncThunk(
    'products/changingLikeOnProductCards',
    async (data, { dispatch, fulfillWithValue, rejectWithValue }) => {
        try {
            const updateLikeInCard = await api.editLikeCard(data.product._id, data.cardLiked);
            // dispatch(getInfoOneProduct(data.product._id));такой вариант норм?
            dispatch(updateProduct(updateLikeInCard));
            return fulfillWithValue({ updateLikeInCard, cardLiked: data.cardLiked });
        } catch (error) {
            //    return rejectWithValue()
        }
    }
);

//------------slice// reduser-----------
const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllProductsData.fulfilled, (state, action) => {
            state.isLoading = false;
            const filteredCards = myCards(action.payload.products);
            state.dataProducts = filteredCards;
            state.total = filteredCards.length;
            state.favoritesCards = filteredCards.filter((item) =>
                findFavorite(item, action.payload.userId)
            );
        });
        builder.addCase(changingLikeOnProductCards.fulfilled, (state, action) => {
            const { updateLikeInCard, cardLiked } = action.payload;
            state.dataProducts = state.dataProducts.map((item) =>
                item._id === updateLikeInCard._id ? updateLikeInCard : item
            );

            if (cardLiked) {
                state.favoritesCards = state.favoritesCards.filter(
                    (item) => item._id !== updateLikeInCard._id
                );
            } else {
                state.favoritesCards = [...state.favoritesCards, updateLikeInCard];
            }
        });
        builder.addMatcher(isLoadingData, (state) => {
            state.isLoading = true;
        });
        builder.addMatcher(forErrors, (action) => {
            showError(action.error.message);
        });
    },
});

// export const setList  = productSlice.actions.setList; Более длинная запись чтобы достать конкретный action
export const { setList } = productSlice.actions;
export default productSlice.reducer;