import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createLeadAsync } from '../slices/leadsSlice';
import styles from '../styles/LeadForm.module.css';
import { AppDispatch } from '../store';

export const LeadForm: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const [formData, setFormData] = useState<{
        firstName: string;
        lastName: string;
        email: string;
        linkedInProfile: string;
        visasOfInterest: string[];
        resume: File | null;
        additionalInfo: string;
    }>({
        firstName: '',
        lastName: '',
        email: '',
        linkedInProfile: '',
        visasOfInterest: [],
        resume: null,
        additionalInfo: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submissionStatus, setSubmissionStatus] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type, files } = e.target as HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement;
        if ((e.target as HTMLInputElement).type === 'file') {
            setFormData({ ...formData, resume: files ? files[0] : null });
        } else if (type === 'select-multiple') {
            const options = Array.from((e.target as HTMLSelectElement).selectedOptions).map(option => option.value);
            setFormData({ ...formData, [name]: options });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.firstName) newErrors.firstName = 'First Name is required';
        if (!formData.lastName) newErrors.lastName = 'Last Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.linkedInProfile) newErrors.linkedInProfile = 'LinkedIn Profile is required';
        if (formData.visasOfInterest.length === 0) newErrors.visasOfInterest = 'At least one Visa of Interest is required';
        if (!formData.resume) newErrors.resume = 'Resume/CV upload is required';
        if (!formData.additionalInfo) newErrors.additionalInfo = 'Additional Information is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await dispatch(createLeadAsync({
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    status: 'PENDING'
                })).unwrap();
                setSubmissionStatus('Lead submitted successfully!');
                // Reset form
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    linkedInProfile: '',
                    visasOfInterest: [],
                    resume: null,
                    additionalInfo: ''
                });
                setErrors({});
            } catch (error) {
                setSubmissionStatus('Failed to submit lead. Please try again.');
            }
        } else {
            setSubmissionStatus('');
        }
    };

    return (
        <form className={styles['lead-form']} onSubmit={handleSubmit}>
            <div className={styles['form-group']}>
                <label>First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
                {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
            </div>
            <div className={styles['form-group']}>
                <label>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
                {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
            </div>
            <div className={styles['form-group']}>
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>
            <div className={styles['form-group']}>
                <label>LinkedIn Profile</label>
                <input type="text" name="linkedInProfile" value={formData.linkedInProfile} onChange={handleChange} placeholder="LinkedIn Profile" />
                {errors.linkedInProfile && <span className={styles.error}>{errors.linkedInProfile}</span>}
            </div>
            <div className={styles['form-group']}>
                <label>Visas of Interest</label>
                <select name="visasOfInterest" multiple value={formData.visasOfInterest} onChange={handleChange}>
                    <option value="Visa1">Visa1</option>
                    <option value="Visa2">Visa2</option>
                    <option value="Visa3">Visa3</option>
                </select>
                {errors.visasOfInterest && <span className={styles.error}>{errors.visasOfInterest}</span>}
            </div>
            <div className={styles['form-group']}>
                <label>Resume/CV Upload</label>
                <input type="file" name="resume" onChange={handleChange} />
                {errors.resume && <span className={styles.error}>{errors.resume}</span>}
            </div>
            <div className={styles['form-group']}>
                <label>Additional Information</label>
                <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} placeholder="Additional Information"></textarea>
                {errors.additionalInfo && <span className={styles.error}>{errors.additionalInfo}</span>}
            </div>
            <button type="submit" className={styles['submit-button']}>Submit</button>
            {submissionStatus && <p className={styles['submission-status']}>{submissionStatus}</p>}
        </form>
    );
};

export default LeadForm;