/**
 * store/index.ts
 * Cấu hình Redux store: gắn auth reducer, export RootState/AppDispatch và hook useAppDispatch/useAppSelector (có type).
 */
import { configureStore } from "@reduxjs/toolkit";
import {
    useDispatch,
    useSelector,
    type TypedUseSelectorHook,
} from "react-redux";
import { authReducer } from "./auth.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Dùng thay useDispatch/useSelector để có đúng type của store.
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
