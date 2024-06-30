import JamById from '../models/JamById.js';
import Karyawan from '../models/Karyawan.js';
import Jam from '../models/Jam.js';


export const getJamByIdForKaryawan = async (req, res) => {
    try {
        const { id } = req.params;
        const jam = await JamById.findByPk(id);
         
        if(jam){
          res.status(200).json(jam);
        }else{
          res.status(404).json({msg: "jam tidak ada"})
        }
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
        
      }
    };

// export const getJamByIdForKaryawan = async (req, res) => {
//     try {
//         const { karyawanId } = req.params;

//         const jamData = await JamById.findAll({
//             where: { karyawan_id: karyawanId },
//             include: [{ 
//                 model: Jam, 
//                 as: 'jamDetail', // Pastikan alias 'jamDetail' sudah didefinisikan
//                 attributes: ['id', 'name', 'hari', /* tambahkan kolom 'hari' di sini */] // Termasuk kolom "hari" di sini
//             }]
//         });

//         if (!jamData || jamData.length === 0) {
//             return res.status(404).json({ msg: "Data jam tidak ditemukan" });
//         }

//         res.status(200).json({ data: jamData });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ msg: "Internal server error" });
//     }
// };


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

export const addWorkDaysToEmployee = async (req, res) => {
    try {
        const { karyawan_id, jam_id, hari } = req.body;

        // Pastikan hari adalah string tunggal
        if (typeof hari !== 'string') {
            return res.status(400).json({ msg: 'Hari harus berupa string tunggal' });
        }

        // Buat entri baru di model JamById
        const newWorkDay = await JamById.create({ karyawan_id, jam_id, hari });

        res.status(201).json({ msg: 'Hari kerja berhasil ditambahkan', data: newWorkDay });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};


export const updateJamById = async (req, res) => {
    try {
        const { id } = req.params;
        const { karyawan_id, jam_id, hari } = req.body;
        const jamData = await JamById.findByPk(id);
        
        if (!jamData) {
            return res.status(404).json({ msg: 'Data JamById tidak ditemukan' });
        }

        const update = await jamData.update({ karyawan_id, jam_id, hari });
        res.status(200).json({ msg: 'Data JamById berhasil diupdate' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
