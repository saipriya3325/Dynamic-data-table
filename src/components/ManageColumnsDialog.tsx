'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormGroup,
  FormControlLabel,
  Checkbox,
  DialogActions,
  Button,
} from '@mui/material';
import { Column } from '@/types';

type ManageColumnsDialogProps = {
  open: boolean;
  onClose: () => void;
  columns: Column[];
  toggleColumn: (key: string) => void;
};

const ManageColumnsDialog: React.FC<ManageColumnsDialogProps> = ({
  open,
  onClose,
  columns,
  toggleColumn,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Manage Columns</DialogTitle>
      <DialogContent>
        <FormGroup>
          {columns.map((col) => (
            <FormControlLabel
              key={col.key}
              control={
                <Checkbox
                  checked={col.visible}
                  onChange={() => toggleColumn(col.key)}
                />
              }
              label={col.label}
            />
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ManageColumnsDialog;
