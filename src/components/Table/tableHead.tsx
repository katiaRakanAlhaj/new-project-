import { useTheme } from '@mui/material';
import { TableCell, TableHead, TableRow } from '@mui/material';
interface ITableColumn {
  th: string;
  key: string;
}

interface ITableHeadComponentProps {
  columns: ITableColumn[];
  themeMode: string;
}

export const TableHeadComponent = ({
  columns,
  themeMode,
}: ITableHeadComponentProps) => {
  const theme = useTheme();
  return (
    <TableHead>
      <TableRow
        sx={{
          borderBottom: '1px solid grey',
        }}
      >
        {columns.map((column, index) => (
          <TableCell
            sx={{ fontWeight: 'bold' }}
            key={index}
            style={{
              backgroundColor:
                themeMode === 'dark'
                  ? theme.palette.primary.dark
                  : theme.palette.primary.light,
              color:
                themeMode === 'dark'
                  ? theme.palette.primary.light
                  : theme.palette.primary.dark,
            }}
          >
            {column.th}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
