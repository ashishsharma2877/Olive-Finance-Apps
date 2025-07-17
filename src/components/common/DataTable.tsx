import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from '@mui/material';

interface Column {
  field: string;
  headerName: string;
}

interface DataTableProps {
  columns: Column[];
  rows: Record<string, any>[];
  customRenderers?: {
    [field: string]: (value: any, row: Record<string, any>) => React.ReactNode;
  };
}

const DataTable: React.FC<DataTableProps> = ({ columns, rows, customRenderers }) => (
  <TableContainer component={Paper} sx={{ mt: 2, maxHeight: 400 }}>
    <Table size="small" stickyHeader>
      <TableHead>
        <TableRow>
          {columns.map(col => (
            <TableCell key={col.field}>{col.headerName}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, idx) => (
          <TableRow key={idx}>
            {columns.map(col => (
              <TableCell key={col.field}>
                {customRenderers?.[col.field]
                  ? customRenderers[col.field](row[col.field], row)
                  : row[col.field]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default DataTable;