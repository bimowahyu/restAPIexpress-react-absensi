import Department from '../models/Department.js';
//import Department from '../models/Department.js';

export const GetDepartment = async (req, res) => {
  try {
    const response = await Department.findAll({
      attributes: ['id', 'kode_department', 'nama_department']
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: "data tidak di temukan" });
  }
};

export const GetDepartmentById = async (req, res) => {
  // Implementasi fungsi ini sesuai kebutuhan Anda
  try {
    const { id } = req.params;
    const department = await Department.findByPk(id);
     
    if(department){
      res.status(200).json(department);
    }else{
      res.status(404).json({msg: "Department tidak ada"})
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
    
  }
};

export const CreateDepartment= async (req, res) => {
  const{kode_department, nama_department } = req.body;
 try {
     await Department.create({
      kode_department: kode_department,
      nama_department: nama_department
      
     });
     res.status(201).json({msg: "department berhasil di tambahkan"});

 } catch (error) {
  res.status(400).json({msg: error.message});
 }
};

export const updateDepartment = async (req, res) => {
  try {
    const department = await Department.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!department) {
      return res.status(404).json({ msg: "Department tidak ditemukan" });
    }
    await department.update(req.body);
    res.status(200).json({ msg: "Department berhasil diupdate" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const destroyDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteDepartment = await Department.findByPk(id);
    if (deleteDepartment) {
      await deleteDepartment.destroy();
      res.status(200).json({ msg: "Department berhasil dihapus" });
    } else {
      res.status(404).json({ msg: "Department tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
