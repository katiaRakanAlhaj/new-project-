import { Table, TableContainer, Paper, tableCellClasses } from '@mui/material';
import { TableHeadComponent } from './tableHead';
import TableBodyComponent from './tableBody';

interface ITableColumn {
  th: string;
  key: string;
}

interface ITableRow {
  [key: string]: any;
}

interface ITableProps {
  columns: ITableColumn[];
  data: ITableRow[];
  handleDelete: (id?: number) => void;
  handleUpdate: (id?: number) => void;
  themeMode: string;
}

const CustomTable = ({
  columns,
  data,
  handleDelete,
  handleUpdate,
  themeMode,
}: ITableProps) => {
  return (
    <TableContainer sx={{ boxShadow: 'none' }} component={Paper}>
      <Table
        sx={{
          [`& .${tableCellClasses.root}`]: {
            border: 'none',
          },
        }}
        aria-label="simple table"
        style={{
          border: themeMode === 'dark' ? 'solid 1px white' : 'none',
        }}
      >
        <TableHeadComponent columns={columns} themeMode={themeMode} />
        <TableBodyComponent
          data={data}
          columns={columns}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          themeMode={themeMode}
        />
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
