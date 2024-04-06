import Jam from '../models/Jam.js';
import JamById from '../models/JamById.js';
import Karyawan from '../models/Karyawan.js';

// Handler untuk menampilkan semua jam kerja
export const index = async (req, res) => {
    try {
        const jam = await Jam.findAll();
        res.status(200).json({ jam });

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
export const  GetJamById = async (req,res) =>{
    
}
// Handler untuk menambahkan jam kerja baru
export const createJam = async (req, res) => {
    try {
        const create = await Jam.create(req.body);
        if (create) {
            res.status(200).json({msg: 'Jam Kerja berhasil ditambah'});
        } else {
            res.status('404').json({msg:'Jam Kerja gagal ditambah, cek kembali'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// Handler untuk memperbarui data jam kerja
export const updateJam = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama_jamKerja, awal_jamMasuk, set_jamMasuk, akhir_jamMasuk, set_jamPulang } = req.body;
        const jam = await Jam.findByPk(id);
        
        if (!jam) {
            return res.status(404).json({ msg: 'Jam Kerja tidak ditemukan' });
        }

        const update = await jam.update({
            nama_jamKerja,
            awal_jamMasuk,
            set_jamMasuk,
            akhir_jamMasuk,
            set_jamPulang
        });

        res.status(200).json({ msg: 'Jam Kerja berhasil diupdate' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
// Handler untuk menghapus jam kerja
export const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteJam = await Jam.findByIdAndDelete(id);
        if (deleteJam) {
            res.status(200).json({msg:'Jam Kerja berhasil dihapus'});
        } else {
            res.status(404).json({msg: 'Jam Kerja gagal dihapus, cek kembali'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// Handler untuk menetapkan jam kerja berdasarkan ID karyawan
export const set = async (req, res) => {
    try {
        const { id } = req.params;
        const karyawan = await Karyawan.findById(id);
        const jam = await Jam.find();
        const cekJamKerja = await JamById.count({ karyawan_id: id });
        if (cekJamKerja > 0) {
            const updateJamKerja = await JamById.find({ karyawan_id: id });
            res.status(200).json({ karyawan, jam, updateJamKerja });
        } else {
            res.status(404).json ({ karyawan, jam });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
