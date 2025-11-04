'use client';

import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleColumnVisibility } from '@/features/dataSlice';

import DataTable from '@/components/DataTable';
import ImportExport from '@/components/ImportExport';
import ManageColumnsDialog from '@/components/ManageColumnsDialog';
import ThemeToggle from '@/components/ThemeToggle';

export default function Page() {
  const dispatch = useDispatch();
  const rows = useSelector((state: RootState) => state.data.rows);
  const columns = useSelector((state: RootState) => state.data.columns);

  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <Container sx={{ py: 4 }} maxWidth="lg">
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Dynamic Data Table Manager
        </Typography>
        <ThemeToggle />
      </Box>

      {/* Toolbar */}
      <Stack direction="row" spacing={2} justifyContent="flex-end" mb={2}>
        <ImportExport visibleColumns={columns} rows={rows} />
        <Button
          variant="outlined"
          onClick={() => setOpenDialog(true)}
        >
          Manage Columns
        </Button>
      </Stack>

      {/* Data Table */}
      <DataTable />

      {/* Manage Columns Dialog */}
      <ManageColumnsDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        columns={columns}
        toggleColumn={(key) => dispatch(toggleColumnVisibility(key))}
      />
    </Container>
  );
}

