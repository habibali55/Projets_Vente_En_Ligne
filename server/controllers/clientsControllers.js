import Clients from '../models/clients.js';


export const getALLClient = async (request, response) => {
    try {
        const client = await Clients.find();
        response.status(200).json(client);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

export const getClientById = async (req, res) => {
    try {
        const { id } = req.params
        const client = await Clients.findById(id);
        if (!client) {
            return res.status(404).json({ error: 'client not found' });
        }
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const createClient = async (req, res) => {
    try {
        const client = new Clients(req.body);
        const savedClient = await client.save();
        res.status(201).json(savedClient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedClient = await Clients.findByIdAndDelete(id);
        if (!deletedClient) {

            return res.status(404).json({ error: 'client not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
