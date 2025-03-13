import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLeads, createLead } from '../utils/api';

interface Lead {
    id: string;
    name: string;
    email: string;
    status: string;
}

interface LeadsState {
    leads: Lead[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: LeadsState = {
    leads: [],
    status: 'idle',
    error: null,
};

export const fetchLeadsAsync = createAsyncThunk('leads/fetchLeads', async () => {
    const response = await fetchLeads();
    return response;
});

export const createLeadAsync = createAsyncThunk('leads/createLead', async (leadData: Omit<Lead, 'id'>) => {
    const response = await createLead(leadData);
    return response;
});

const leadsSlice = createSlice({
    name: 'leads',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLeadsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLeadsAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.leads = action.payload;
            })
            .addCase(fetchLeadsAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch leads';
            })
            .addCase(createLeadAsync.fulfilled, (state, action) => {
                state.leads.push(action.payload);
            });
    },
});

export default leadsSlice.reducer;