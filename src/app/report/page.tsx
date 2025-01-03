'use client';
import DashboardLayout from '../components/DashboardLayout';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Menu, IconButton, MenuItem, Button, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, Select, TextField, DialogActions } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { fetchData, addDataReport } from '../api/api';
import { toast } from 'react-toastify';

const Report: React.FC = () => {
  const [dataFetch, setDataFetch] = useState<object[]>([]);  // Set initial state to an empty array
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState(true);

  const [program, setProgram] = useState('');
  const [open, setOpen] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [subdistrict, setSubdistrict] = useState('');
  const [distributionDate, setDistributionDate] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [note, setNote] = useState('');
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClosePopup = () => {
    setOpen(false);
  };
  const handleAdd = () => {
    setOpen(true);
    console.log('Tambah data');
    // Implementasikan logika untuk menambahkan data, misalnya membuka modal
  };
  const handleSubmit = async () => {
    // const payload = {
    //   program_name:  program,
    //   beneficiaries: beneficiaries,
    //   province:  province,
    //   city:  district,
    //   district: subdistrict,
    //   distribution_date: distributionDate,
    //   proof_file: attachment,
    //   additional_notes: note,
    // }
    const formData = new FormData();
    formData.append('program_name', program);
    formData.append('beneficiaries', beneficiaries.toString()); // If it's a number, make sure to convert it to string
    formData.append('province', province);
    formData.append('city', district);
    formData.append('district', subdistrict);
    formData.append('distribution_date', distributionDate);
    formData.append('additional_notes', note);
    if (attachment) {
      formData.append('proof_file', attachment); // Assuming 'attachment' is a file
    }
    const result = await addDataReport(formData);
    console.log('payload', result);
    setOpen(false);
    toast.success('Laporan berhasil ditambahkan!', {
      position: 'top-right',
      autoClose: 3000,
    });
    loadReports();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setAttachment(event.target.files[0]);
    }
  };

  const loadReports = async () => {
    try {
      const result = await fetchData(); // Assuming fetchData fetches your reports
      console.log('Fetched data:', result);
      setDataFetch(result);  // Set fetched data to state
      setLoading(false);
    } catch (err: any) {
      console.error('Error fetching data:', err.message || err);
      setLoading(false);
    }
  };
  useEffect(() => {
    loadReports();  // Initial load of reports
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold text-gray-600">Reports</h1>

      <div className="flex justify-end mb-4">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Tambah Laporan
        </Button>
      </div>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nama Program</TableCell>
              <TableCell>Jumlah Penerima</TableCell>
              <TableCell>Wilayah</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6}>Loading...</TableCell>
              </TableRow>
            ) : (
              dataFetch && dataFetch.map((row: any) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.program_name}</TableCell>
                  <TableCell>{row.beneficiaries}</TableCell>
                  <TableCell>{row.city}</TableCell>
                  <TableCell>
                    <div
                      className={
                        row.status === 'Pending'
                          ? 'bg-yellow-200 text-yellow-500 px-4 py-2 rounded-full'
                          : row.status === 'Approved'
                            ? 'bg-green-200 text-green-500 px-4 py-2 rounded-full'
                            : row.status === 'Rejected'
                              ? 'bg-red-200 text-red-500 px-4 py-2 rounded-full'
                              : ''
                      }
                    >
                      {row.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={handleClick}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={() => { handleClose(); /* Handle "Lihat" action */ }}>
                        Lihat
                      </MenuItem>
                      <MenuItem onClick={() => { handleClose(); /* Handle "Hapus" action */ }}>
                        Hapus
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tambah Laporan</DialogTitle>
        <DialogContent>
          {/* Nama Program */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Nama Program</InputLabel>
            <Select
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              label="Nama Program"
            >
              <MenuItem value="PKH">PKH</MenuItem>
              <MenuItem value="BLT">BLT</MenuItem>
              <MenuItem value="Bansos">Bansos</MenuItem>
              {/* Tambahkan pilihan lain sesuai kebutuhan */}
            </Select>
          </FormControl>

          {/* Jumlah Penerima Bantuan */}
          <TextField
            fullWidth
            label="Jumlah Penerima Bantuan"
            type="number"
            value={beneficiaries}
            onChange={(e) => setBeneficiaries(e.target.value)}
            margin="normal"
            required
          />

          {/* Wilayah (Provinsi, Kabupaten, Kecamatan) */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Provinsi</InputLabel>
            <Select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              label="Provinsi"
            >
              <MenuItem value="Jakarta">Jakarta</MenuItem>
              <MenuItem value="Bali">Bali</MenuItem>
              {/* Tambahkan pilihan provinsi lain */}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Kabupaten</InputLabel>
            <Select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              label="Kabupaten"
            >
              <MenuItem value="Jakarta Pusat">Jakarta Pusat</MenuItem>
              <MenuItem value="Badung">Badung</MenuItem>
              {/* Pilihan Kabupaten sesuai Provinsi */}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Kecamatan</InputLabel>
            <Select
              value={subdistrict}
              onChange={(e) => setSubdistrict(e.target.value)}
              label="Kecamatan"
            >
              <MenuItem value="Menteng">Menteng</MenuItem>
              <MenuItem value="Ubud">Ubud</MenuItem>
              {/* Pilihan Kecamatan sesuai Kabupaten */}
            </Select>
          </FormControl>

          {/* Tanggal Penyaluran */}
          <TextField
            fullWidth
            label="Tanggal Penyaluran"
            type="date"
            value={distributionDate}
            onChange={(e) => setDistributionDate(e.target.value)}
            margin="normal"
            required
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* Bukti Penyaluran */}
          <TextField
            fullWidth
            label="Bukti Penyaluran (JPG/PNG/PDF)"
            type="file"
            onChange={handleFileChange}
            margin="normal"
          />

          {/* Catatan Tambahan */}
          <TextField
            fullWidth
            label="Catatan Tambahan"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            margin="normal"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary">
            Batal
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default Report;
function loadReports() {
  throw new Error('Function not implemented.');
}

