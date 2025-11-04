// src/types.d.ts
export type Row = {
  id: string;
  [key: string]: string | number | undefined;
};

export type Column = {
  key: string;
  label: string;
  visible: boolean;
};

