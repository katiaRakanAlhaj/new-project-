import React from 'react';
import { TableCell, TableRow, TableBody } from '@mui/material';
import { IconDelete, IconEdit } from '../../icons/icon';
import { useTheme } from '@mui/material';

interface ITableColumn {
  th: string;
  key: string;
}

interface ITableRow {
  [key: string]: any;
}

interface ITableBodyComponentProps {
  data: ITableRow[];
  columns: ITableColumn[];
  handleDelete: (id?: number) => void;
  handleUpdate: (id?: number) => void;
  themeMode: string;
}

const TableBodyComponent: React.FC<ITableBodyComponentProps> = ({
  data,
  columns,
  handleDelete,
  handleUpdate,
  themeMode,
}) => {
  const theme = useTheme();
  return (
    <TableBody style={{ border: 'none' }}>
      {data.map((row, index) => (
        <TableRow
          sx={{ borderBottom: '1px solid grey' }}
          key={index}
          style={{
            backgroundColor:
              themeMode === 'dark'
                ? theme.palette.primary.dark
                : theme.palette.primary.light,
          }}
        >
          {columns.map((column, index) => {
            if (column.key === 'actions') {
              return (
                <TableCell
                  key={index}
                  sx={{ width: '150px' }}
                  style={{
                    backgroundColor:
                      themeMode === 'dark'
                        ? theme.palette.primary.dark
                        : theme.palette.primary.light,
                  }}
                >
                  {row.id && (
                    <div className="flex justify-between">
                      <button
                        onClick={() => handleUpdate(row.id)}
                        className="w-9 h-9 bg-white rounded-full flex justify-center text-center items-center cursor-pointer"
                      >
                        <IconEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(row.id)}
                        className="w-9 h-9 bg-white rounded-full flex justify-center text-center items-center cursor-pointer"
                      >
                        <IconDelete />
                      </button>
                    </div>
                  )}
                </TableCell>
              );
            }
            return (
              <TableCell
                style={{
                  color:
                    themeMode === 'dark'
                      ? theme.palette.primary.light
                      : theme.palette.primary.dark,
                }}
                key={index}
              >
                {row[column.key]}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableBodyComponent;
