import Cabang from '../models/Cabang.js';

// Handler untuk menampilkan semua cabang
export const GetCabang = async (req, res) => {
    try {
        const response = await Cabang.findAll({
            attributes:['id','kode_cabang','nama_cabang','lokasi_kantor','radius']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send('Terjadi kesalahan saat mengambil data cabang');
    }
};

export const getCabangById = async (req, res) => {
 try {
    const response = await Cabang.findOne({
        attributes:['id','kode_cabang','nama_cabang','lokasi_kantor','radius'],
        where:{
            id:req.params.id
        }
    });
    res.status(200).json(response);
    
 } catch (error) {
    res.status(500).json({msg: error.message});
 }
}

// Handler untuk menambahkan cabang baru
// export const createCabang = async (req, res) => {
//     const{kode_cabang, nama_cabang, lokasi_kantor, radius} = req.body;
//    try {
//        await Cabang.create({
//         kode_cabang: kode_cabang,
//         nama_cabang: nama_cabang,
//         lokasi_kantor: lokasi_kantor,
//         radius: radius
//        });
//        res.status(201).json({msg: "cabang berhasil di tambahkan"});

//    } catch (error) {
//     res.status(400).json({msg: error.message});
//    }
// };
export const createCabang = async (req, res) => {
    const { kode_cabang, nama_cabang, latitude, longitude, radius } = req.body;
    try {
        await Cabang.create({
            kode_cabang: kode_cabang,
            nama_cabang: nama_cabang,
            lokasi_kantor: `${latitude},${longitude}`, // Simpan latitude dan longitude
            radius: radius
        });
        res.status(201).json({ msg: "Cabang berhasil ditambahkan" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};


// Handler untuk memperbarui data cabang
export const updateCabang = async (req, res) => {
    try {
        const cabang = await Cabang.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!cabang) {
            return res.status(404).json({ msg: "Cabang tidak ditemukan" });
        }
        await cabang.update(req.body);
        res.status(200).json({ msg: "Cabang berhasil diperbarui" });
    } catch (error) {
        res.status(500).json({ msg: "Gagal memperbarui cabang, cek kembali" });
    }
};


// Handler untuk menghapus cabang
export const destroyCabang = async (req, res) => {
    try {
        const cabang = await Cabang.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!cabang) {
            return res.status(404).json({ msg: "Cabang tidak ditemukan" });
        }
        await cabang.destroy();
        res.status(200).json({ msg: "Cabang berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ msg: "Gagal menghapus cabang, cek kembali" });
    }
};