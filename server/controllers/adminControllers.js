import Admin from '../models/admin.js';


export const getALLAdmin = async (request, response) => {
    try {
        const admins = await Admin.find();
        response.status(200).json(admins);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

export const getAdminById = async (req, res) => {
    try {
        const { id } = req.params
        const admins = await Admin.findById(id);
        if (!admins) {
            return res.status(404).json({ error: 'admins not found' });
        }
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const createAdmin = async (req, res) => {
    try {
        const admins = new Admin(req.body);
        const savedAdmin = await admins.save();
        res.status(201).json(savedAdmin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAdmin = await User.findByIdAndDelete(id);
        if (!deletedAdmin) {

            return res.status(404).json({ error: 'admin not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
