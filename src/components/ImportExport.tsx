'use client';

import React, { useRef } from 'react';
import { Button } from '@mui/material';
import Papa from 'papaparse';
import { useDispatch } from 'react-redux';
import { importRows } from '@/features/dataSlice';
import { saveAs } from 'file-saver';
import type { Row, Column } from '@/types';

const ImportExport: React.FC<{ visibleColumns: Column[]; rows: Row[] }> = ({
  visibleColumns,
  rows,
}) => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse<Row>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length) {
          alert('CSV parse errors: ' + results.errors.map((e) => e.message).join(', '));
          return;
        }
        dispatch(importRows(results.data));
      },
      error: (err) => alert('Parse error: ' + err.message),
    });

    if (inputRef.current) inputRef.current.value = '';
  };

  const handleExport = () => {
    const keys = visibleColumns.map((c) => c.key);
    const header = visibleColumns.map((c) => c.label).join(',') + '\n';
    const body = rows
      .map((r) => keys.map((k) => JSON.stringify(r[k] ?? '')).join(','))
      .join('\n');
    const csv = header + body;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'export.csv');
  };

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        onChange={handleImport}
        style={{ display: 'none' }}
        id="csv-input"
      />
      <label htmlFor="csv-input">
        <Button variant="outlined" component="span">
          Import CSV
        </Button>
      </label>
      <Button variant="contained" onClick={handleExport}>
        Export CSV
      </Button>
    </div>
  );
};

export default ImportExport;
