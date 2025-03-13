import axios from 'axios';

const API_URL = '/api/leads';

export const fetchLeads = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching leads:', error);
        throw error;
    }
};

interface Lead {
    id: string;
    name: string;
    email: string;
    status: string;
}

interface LeadData {
    name: string;
    email: string;
    status: string;
}

export const createLead = async (leadData: LeadData): Promise<Lead> => {
    try {
        const response = await axios.post<Lead>(API_URL, leadData);
        return response.data;
    } catch (error) {
        console.error('Error creating lead:', error);
        throw error;
    }
};