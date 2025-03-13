import React from 'react';
import LeadsList from '../components/LeadsList';
import LeadForm from '../components/LeadForm';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1>Lead Management</h1>
            <LeadsList leads={[]} />
            <LeadForm />
        </div>
    );
};

export default Home;