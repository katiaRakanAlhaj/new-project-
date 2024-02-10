import React from 'react';
import { TableCell, TableRow, TableBody, Box, Icon } from '@mui/material';
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
  columns: ITableColumn[];
  data: ITableRow[];
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
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Icon
                        onClick={() => handleUpdate(row.id)}
                        sx={{
                          cursor: 'pointer',
                          color:
                            themeMode === 'dark'
                              ? theme.palette.primary.light
                              : theme.palette.primary.dark,
                        }}
                      >
                        <IconEdit />
                      </Icon>
                      <Icon
                        onClick={() => handleDelete(row.id)}
                        sx={{
                          cursor: 'pointer',
                          color:
                            themeMode === 'dark'
                              ? theme.palette.primary.light
                              : theme.palette.primary.dark,
                        }}
                      >
                        <IconDelete />
                      </Icon>
                    </Box>
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
