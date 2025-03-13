import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchLeadsAsync } from '../slices/leadsSlice';
import styles from '../styles/LeadsList.module.css';
import { Lead } from '../types';

interface LeadsListProps {
    leads: Lead[];
}

const LeadsList: React.FC<LeadsListProps> = ({ leads: propLeads }) => {
    const dispatch = useDispatch<AppDispatch>();
    const leads = useSelector((state: RootState) => state.leads.leads);
    const status = useSelector((state: RootState) => state.leads.status);
    const error = useSelector((state: RootState) => state.leads.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchLeadsAsync());
        }
    }, [status, dispatch]);

    return (
        <div className={styles['leads-list']}>
            <h2>Leads</h2>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>{error}</p>}
            {status === 'succeeded' && (
                <ul>
                    {leads.map((lead) => (
                        <li key={lead.id}>
                            {lead.name} - {lead.email} - {lead.status}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LeadsList;