import Users from "../models/Users.js";

export const AdminOnly = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Silahkan login akun admin" });
    }
    try {
        const admin = await Users.findByPk(req.session.userId, {
            attributes: ['id', 'name', 'email', 'role']
        });
        if (!admin) {
            return res.status(404).json({ msg: "Akun admin tidak ditemukan" });
        }
        if (admin.role !== 'admin') {
            return res.status(403).json({ msg: "Anda tidak memiliki izin untuk melakukan operasi ini" });
        }
        req.admin = admin;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const logOutAdmin = (req, res) => {
    if (req.session.userId) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(400).json({ msg: "Tidak dapat logout" });
            }
            res.status(200).json({ msg: "Anda telah logout" });
        });
    } else {
        res.status(401).json({ msg: "Anda belum login" });
    }
};
