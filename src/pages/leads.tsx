import React, { useEffect, useState } from 'react';
import LeadsList from '../components/LeadsList';
import { Lead } from '../types';

const LeadsPage: React.FC = () => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const response = await fetch('/api/leads');
                const data = await response.json();
                setLeads(data);
            } catch (error) {
                console.error('Error fetching leads:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeads();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Lead Management</h1>
            <LeadsList leads={leads} />
        </div>
    );
};

export default LeadsPage;