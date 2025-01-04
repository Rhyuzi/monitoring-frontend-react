import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Button,
    FormHelperText
} from '@mui/material';

interface EditDialogProps {
    open: boolean;
    handleClose: () => void; // handleClose adalah fungsi yang tidak mengembalikan nilai
    handleSubmit: (updatedData: any) => void; // handleSubmit menerima data yang diubah
    rowData: {
        id?: string,
        program?: string;
        beneficiaries?: string;
        province?: string;
        district?: string;
        subdistrict?: string;
        distributionDate?: string;
        note?: string;
    };
}

const EditDialog: React.FC<EditDialogProps> = ({ open, handleClose, handleSubmit, rowData }) => {
    const [id, setId] = useState(rowData?.id || '');
    const [program, setProgram] = useState(rowData?.program || '');
    const [beneficiaries, setBeneficiaries] = useState(rowData?.beneficiaries || '');
    const [province, setProvince] = useState(rowData?.province || '');
    const [district, setDistrict] = useState(rowData?.district || '');
    const [subdistrict, setSubdistrict] = useState(rowData?.subdistrict || '');
    const [distributionDate, setDistributionDate] = useState(rowData?.distributionDate || '');
    const [note, setNote] = useState(rowData?.note || '');
    const [attachment, setAttachment] = useState<File | null>(null);
    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        setId(rowData?.id || '');
        setProgram(rowData?.program || '');
        setBeneficiaries(rowData?.beneficiaries || '');
        setProvince(rowData?.province || '');
        setDistrict(rowData?.district || '');
        setSubdistrict(rowData?.subdistrict || '');
        setDistributionDate(rowData?.distributionDate || '');
        setNote(rowData?.note || '');
    }, [rowData]);

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

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Laporan</DialogTitle>
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

                {/* Wilayah */}
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
                    InputLabelProps={{ shrink: true }}
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
                <Button onClick={handleClose} color="primary">
                    Batal
                </Button>
                <Button
                    onClick={() => {
                        if (validateForm()) {
                            handleSubmit({ id, program, beneficiaries, province, district, subdistrict, distributionDate, attachment, note });
                            handleClose();
                        }
                    }}
                    color="primary"
                >
                    Simpan
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditDialog;
