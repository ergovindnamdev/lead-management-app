export type LeadStatus = 'NEW' | 'CONTACTED' | 'REACHED_OUT' | 'CLOSED';

export interface Lead {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    linkedInProfile: string;
    visasOfInterest: string[];
    resume: File | null;
    additionalInformation?: string;
    status: LeadStatus;
}

