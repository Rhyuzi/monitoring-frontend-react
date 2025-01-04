import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

interface ConfirmationDialogProps {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ open, onConfirm, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Konfirmasi Hapus</DialogTitle>
      <DialogContent>Apakah kamu yakin ingin menghapus data ini?</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Batal</Button>
        <Button onClick={onConfirm} color="secondary">Hapus</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
