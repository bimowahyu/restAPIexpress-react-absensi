import Users from "../models/Users.js"; // Pastikan menggunakan huruf kapital di "Users"
import argon2 from "argon2";

export const Login = async (req, res) => {
    const { email, password } = req.body;

    // Validasi apakah email dan password ada dalam permintaan
    if (!email || !password) {
        return res.status(400).json({ msg: "Email dan password harus diisi." });
    }

    try {
        const user = await Users.findOne({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.status(404).json({ msg: "User tidak ditemukan" });
        }

        const match = await argon2.verify(user.password, password);
        if (!match) {
            return res.status(400).json({ msg: "Wrong Password" });
        }

        req.session.userId = user.id;
        const responseData = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };
        res.status(200).json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// export const Me = async (req, res) => {
//     if (!req.session.userId) {
//         return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
//     }
export const Me = async (req, res) => {
    const currentTime = new Date().getTime();
    const sessionExpire = new Date(req.session.cookie.expires).getTime();

    if (!req.session.userId || currentTime > sessionExpire) {
        return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
    }
    try {
        const user = await Users.findOne({
            attributes: ['id', 'name', 'email', 'role'],
            where: {
                id: req.session.userId
            }
        });
        if (!user) {
            return res.status(404).json({ msg: "User tidak ditemukan" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const logOut = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Tidak dapat logout"});
        res.status(200).json({msg: "Anda telah logout"});
    });
};
