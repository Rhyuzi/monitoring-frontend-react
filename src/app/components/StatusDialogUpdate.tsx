import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Select, MenuItem, TextField, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';

interface StatusUpdateDialogProps {
    open: boolean;
    onConfirm: (status: string, reason: string) => void;
    onClose: () => void;
}

const StatusUpdateDialog: React.FC<StatusUpdateDialogProps> = ({ open, onConfirm, onClose }) => {
    const [status, setStatus] = useState<string>('');
    const [reason, setReason] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleStatusChange = (event: SelectChangeEvent<string>) => {
        setStatus(event.target.value);
    };

    const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReason(event.target.value);
    };

    const handleConfirm = () => {
        if (status === 'Rejected' && !reason) {
            setError('Alasan harus diisi jika statusnya Rejected.');
        } else {
            setError('');
            onConfirm(status, reason);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Ubah Status Laporan</DialogTitle>
            <DialogContent>
                <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select value={status} onChange={handleStatusChange} label="Status">
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Approved">Approved</MenuItem>
                        <MenuItem value="Rejected">Rejected</MenuItem>
                    </Select>
                </FormControl>
                {status === 'Rejected' && (
                    <TextField
                        label="Alasan Ditolak"
                        multiline
                        rows={4}
                        value={reason}
                        onChange={handleReasonChange}
                        fullWidth
                        margin="normal"
                        error={!!error}
                        helperText={error}
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Batal</Button>
                <Button onClick={handleConfirm} color="secondary">Simpan</Button>
            </DialogActions>
        </Dialog>
    );
};

export default StatusUpdateDialog;
