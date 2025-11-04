import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import type { Row, Column } from '@/types';

type DataState = {
  rows: Row[];
  columns: Column[];
};

const initialState: DataState = {
  rows: [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', age: 28, role: 'Engineer' },
    { id: '2', name: 'Bob Lee', email: 'bob@example.com', age: 34, role: 'Designer' },
    { id: '3', name: 'Carol King', email: 'carol@example.com', age: 42, role: 'Manager' },
  ],
  columns: [
    { key: 'name', label: 'Name', visible: true },
    { key: 'email', label: 'Email', visible: true },
    { key: 'age', label: 'Age', visible: true },
    { key: 'role', label: 'Role', visible: true },
  ],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    toggleColumnVisibility: (state, action: PayloadAction<string>) => {
      const col = state.columns.find((c) => c.key === action.payload);
      if (col) col.visible = !col.visible;
    },

    importRows: (state, action: PayloadAction<Row[]>) => {
      const newRows = action.payload.map((r) => ({ ...r, id: r.id ?? nanoid() }));
      state.rows = [...newRows, ...state.rows];
    },
  },
});

export const { toggleColumnVisibility, importRows } = dataSlice.actions;
export default dataSlice.reducer;
