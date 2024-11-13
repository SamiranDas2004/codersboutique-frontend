const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");
import Cookies from "js-cookie";

export const getCandidates = createAsyncThunk('candidates/getCandidates', async (params, { rejectWithValue }) => {
    try {
        const token = Cookies.get('token')
        const startDate = params.startDate ? `${params.startDate.getFullYear()}-${params.startDate.getMonth() + 1}-${params.startDate.getDate()}` : ''
        const endDate = params.endDate ? `${params.endDate.getFullYear()}-${params.endDate.getMonth() + 1}-${params.endDate.getDate()}` : ''

        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API}/api/v1/candidate/?page=1&limit=10&name=${params.name}&status=${params.status}&startDate=${startDate}&endDate=${endDate}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data
    }
    catch (err) {
        console.log({ err })
        if (err?.response && err?.response?.data) {
            return rejectWithValue({ error: err.response.data.message });
        }
        return rejectWithValue({ error: "Internal Server Error" });
    }
})

export const editCandidates = createAsyncThunk('candidates/editCandidates', async (params, { rejectWithValue }) => {
    try {
        const token = Cookies.get('token');
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_API}/api/v1/candidate/${params.id}`, params, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data
    }
    catch (err) {
        console.log({ err })
        if (err?.response && err?.response?.data) {
            return rejectWithValue({ error: err.response.data.message });
        }
        return rejectWithValue({ error: "Internal Server Error" });
    }
})

export const addCandidate = createAsyncThunk('candidates/addCandidate', async (params, { rejectWithValue }) => {
    try {
        const token = Cookies.get('token');
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API}/api/v1/candidate`, params, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
    catch (err) {
        console.log({ err })
        if (err?.response && err?.response?.data) {
            return rejectWithValue({ error: err.response.data.message });
        }
        return rejectWithValue({ error: "Internal Server Error" });
    }
})

const candidateSlice = createSlice({
    name: "candidate",
    initialState: {
        candidate: [],
        loading: false,
        error: null
    },
    extraReducers: builder => {
        builder.addCase(getCandidates.pending, state => {
            state.loading = true;
        })
        builder.addCase(getCandidates.fulfilled, (state, action) => {
            state.loading = false;
            state.candidate = action.payload.data;
        })
        builder.addCase(getCandidates.rejected, (state, action) => {
            state.loading = false;
            state.candidate = null;
            state.error = action.error.message
        })

        builder.addCase(editCandidates.pending, state => {
            state.loading = true;
        })
        builder.addCase(editCandidates.fulfilled, (state, action) => {
            state.loading = false;
            state.candidate = state.candidate && state.candidate.length > 0 && state.candidate.map(cand => {
                if (cand.id === action.payload.data.id) {
                    return action.payload.data;
                }
                else return cand;
            })
        })
        builder.addCase(editCandidates.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })

        builder.addCase(addCandidate.pending, state => {
            state.loading = true;
        })
        builder.addCase(addCandidate.fulfilled, (state, action) => {
            state.loading = false;
            state.candidate.unshift(action.payload.data);
        })
        builder.addCase(addCandidate.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
    }
})

export default candidateSlice.reducer;