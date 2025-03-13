import { NextApiRequest, NextApiResponse } from 'next';

interface Lead {
    id: number;
    name: string;
    email: string;
    status: string;
}

let leads = [
    // Initial dummy data
    { id: '1', name: 'John Doe', email: 'john@example.com', status: 'PENDING' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'PENDING' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            res.status(200).json(leads);
            break;
        case 'POST':
            const newLead = {
                id: leads.length + 1,
                ...req.body,
                status: 'PENDING',
            };
            leads.push(newLead);
            res.status(201).json(newLead);
            break;
        case 'PUT':
            const { id, status } = req.body;
            const leadIndex = leads.findIndex(lead => lead.id === id);
            if (leadIndex !== -1) {
                leads[leadIndex].status = status;
                res.status(200).json(leads[leadIndex]);
            } else {
                res.status(404).json({ message: 'Lead not found' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}