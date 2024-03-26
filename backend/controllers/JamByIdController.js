import JamById from '../models/JamById.js';
import Karyawan from '../models/Karyawan.js';
import Jam from '../models/Jam.js';


export const getJamByIdForKaryawan = async (req, res) => {
try {
    const { karyawanId } = req.params;

    const jamData = await JamById.findAll({where: {karyawan_id: karyawanId}});

    if(!jamData || jamData.length === 0 ){
        return res.status(404).json({msg: "jam data tidak ada"})
    }
    res.status(200).json({data: jamData})
    
    } catch (error) {
    console.log(error);
    res.status(500).json({msg: "internal server error"});

    
    }
};

// 
export const setJamById = async (req, res) => {
    try {
        const { karyawan_id, jam_id, hari } = req.body; // Tangkap karyawan_id, jam_id, dan hari dari req.body
        const karyawan = await Karyawan.findByPk(karyawan_id);
        const jam = await Jam.findAll();
        const cekJamKerja = await JamById.count({ where: { karyawan_id } });

        if (cekJamKerja > 0) {
            const updateJamKerja = await JamById.findAll({ where: { karyawan_id } });
            res.status(200).json({ karyawan, jam, updateJamKerja });
        } else {
            // Tambahkan data baru ke dalam tabel JamById
            const newJamData = await JamById.create({ karyawan_id, jam_id, hari }); // Buat data baru dalam tabel JamById
            res.status(200).json({ karyawan, jam, newJamData }); // Kembalikan response dengan data baru yang ditambahkan
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


export const updateJamById = async (req, res) => {

}