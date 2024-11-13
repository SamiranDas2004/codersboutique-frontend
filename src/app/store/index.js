import searchReducer from "./search";
import candidateReducer from './candidate'

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
    reducer: {
        search: searchReducer,
        candidate: candidateReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['search/setStartDate', 'search/setEndDate'],
            },
        }),
});

export default store;