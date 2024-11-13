const { createSlice } = require("@reduxjs/toolkit");

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        name: '',
        status: '',
        startDate: '',
        endDate: '',
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload
        },
        clearName: state => {
            state.name = ''
        },
        setStatus: (state, action) => {
            state.status = action.payload
        },
        clearStatus: state => {
            state.status = ''
        },
        setStartDate: (state, action) => {
            state.startDate = action.payload
        },
        clearStartDate: state => {
            state.startDate = ''
        },
        setEndDate: (state, action) => {
            state.endDate = action.payload
        },
        clearEndDate: state => {
            state.endDate = ''
        },
        clearAllState: state => {
            state.endDate = ''
            state.name = ''
            state.startDate = ''
            state.status = ''
        }
    }
})

export const { clearName, setName, clearEndDate, clearStartDate, clearStatus, setEndDate, setStartDate, setStatus, clearAllState } = searchSlice.actions
export default searchSlice.reducer;