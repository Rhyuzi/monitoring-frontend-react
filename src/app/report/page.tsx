'use client';
import DashboardLayout from '../components/DashboardLayout';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Menu, IconButton, MenuItem, Button, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, Select, TextField, DialogActions, FormHelperText } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import { fetchData, addDataReport, updateDataReport } from '../api/api';
import { toast } from 'react-toastify';
import EditDialog from '../components/EditDoalog';

const Report: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const handleClickOpen = (rowData: any) => {
    // setSelectedRow(rowData);
    if (selectedRow.status !== 'Pending') {
      return toast.error('Data tidak bisa di update', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
    setOpenDialog(true);
  };
  const handleCloseDialogEdit = () => {
    setOpenDialog(false);
    setSelectedRow(null);
  };
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
  const [attachment, setAttachment] = useState<File | null>(null);
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<any>({});
  const handleClick = (event: React.MouseEvent<HTMLElement>, row: any) => {
    setAnchorEl(event.currentTarget);  // Set the anchor for the menu
    setSelectedRow(row);  // Store the selected row
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
  const handleSubmitDialogEdit = async (updatedData: any) => {
    const formData = new FormData();
    formData.append('id', updatedData.id);
    formData.append('program_name', updatedData.program);
    formData.append('beneficiaries', updatedData.beneficiaries.toString()); // If it's a number, make sure to convert it to string
    formData.append('province', updatedData.province);
    formData.append('city', updatedData.district);
    formData.append('district', updatedData.subdistrict);
    formData.append('distribution_date', updatedData.distributionDate);
    formData.append('additional_notes', updatedData.note);

    if (updatedData.attachment) {
      formData.append('proof_file', updatedData.attachment); // Assuming 'attachment' is a file
    }
    const result = await updateDataReport(formData);
    console.log('payload', result);
    if (result.success) {
      handleCloseDialogEdit();
      toast.success('Laporan berhasil diupdate', {
        position: 'top-right',
        autoClose: 3000,
      });
      loadReports();
    }
  }
  const handleSubmit = async () => {
    if (validateForm()) {
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
    }
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

  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      // Check file size and type
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setErrors((prevErrors: any) => ({
          ...prevErrors,
          proofFile: 'File size must be less than 2MB',
        }));
      } else if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
        setErrors((prevErrors: any) => ({
          ...prevErrors,
          proofFile: 'Only JPG, PNG, or PDF files are allowed',
        }));
      } else {
        setErrors((prevErrors: any) => ({ ...prevErrors, proofFile: '' }));
        setAttachment(file);
      }
    }
  };
  const validateForm = () => {
    const validationErrors: any = {};

    // Validate required fields
    if (!program) validationErrors.program = 'Nama Program is required';
    if (!beneficiaries) validationErrors.beneficiaries = 'Jumlah Penerima Bantuan is required';
    if (!province) validationErrors.province = 'Provinsi is required';
    if (!district) validationErrors.district = 'Kabupaten is required';
    if (!subdistrict) validationErrors.subdistrict = 'Kecamatan is required';
    if (!distributionDate) validationErrors.distributionDate = 'Tanggal Penyaluran is required';
    if (!attachment) validationErrors.proofFile = 'Bukti Penyaluran is required';

    // Check for file errors (already handled in file change handler)
    if (!attachment && errors.proofFile) {
      validationErrors.proofFile = errors.proofFile;
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0; // If no errors, return true
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
      <div className="flex justify-end mb-4 space-x-4">
        <Button
          variant="contained"
          color="success"
          startIcon={<DescriptionIcon />}
          onClick={handleAdd}
        >
          Eksport PDF
        </Button>
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
                    <IconButton onClick={(e) => handleClick(e, row)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={() => { handleClose(); }}>
                        Lihat
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleClickOpen(row)
                        }}
                      >
                        Edit
                      </MenuItem>

                      <MenuItem onClick={() => { handleClose(); }}>
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
          <FormControl fullWidth margin="normal" error={!!errors.program}>
            <InputLabel>Nama Program</InputLabel>
            <Select
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              label="Nama Program"
            >
              <MenuItem value="PKH">PKH</MenuItem>
              <MenuItem value="BLT">BLT</MenuItem>
              <MenuItem value="Bansos">Bansos</MenuItem>
            </Select>
            {errors.program && <FormHelperText>{errors.program}</FormHelperText>}
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
            error={!!errors.beneficiaries}
            helperText={errors.beneficiaries}
          />

          {/* Wilayah (Provinsi, Kabupaten, Kecamatan) */}
          <FormControl fullWidth margin="normal" error={!!errors.province}>
            <InputLabel>Provinsi</InputLabel>
            <Select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              label="Provinsi"
            >
              <MenuItem value="Jakarta">Jakarta</MenuItem>
              <MenuItem value="Bali">Bali</MenuItem>
            </Select>
            {errors.province && <FormHelperText>{errors.province}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth margin="normal" error={!!errors.district}>
            <InputLabel>Kabupaten</InputLabel>
            <Select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              label="Kabupaten"
            >
              <MenuItem value="Jakarta Pusat">Jakarta Pusat</MenuItem>
              <MenuItem value="Badung">Badung</MenuItem>
            </Select>
            {errors.district && <FormHelperText>{errors.district}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth margin="normal" error={!!errors.subdistrict}>
            <InputLabel>Kecamatan</InputLabel>
            <Select
              value={subdistrict}
              onChange={(e) => setSubdistrict(e.target.value)}
              label="Kecamatan"
            >
              <MenuItem value="Menteng">Menteng</MenuItem>
              <MenuItem value="Ubud">Ubud</MenuItem>
            </Select>
            {errors.subdistrict && <FormHelperText>{errors.subdistrict}</FormHelperText>}
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
            error={!!errors.distributionDate}
            helperText={errors.distributionDate}
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
            error={!!errors.proofFile}
            helperText={errors.proofFile}
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
      <EditDialog
        open={openDialog}
        handleClose={handleCloseDialogEdit}
        handleSubmit={handleSubmitDialogEdit}
        rowData={selectedRow}
      />
    </DashboardLayout>
  );
};

export default Report;
