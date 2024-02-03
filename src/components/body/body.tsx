import Table from '../Table/table';

interface BodyProps {
  columns: any[];
  data: any[];
  handleDelete: (selectedId?: number) => void;
  handleUpdate: (id?: number) => void;
  themeMode: string;
}

const Body: React.FC<BodyProps> = ({
  columns,
  data,
  handleDelete,
  handleUpdate,
  themeMode,
}) => {
  return (
    <Table
      columns={columns}
      data={data}
      handleDelete={handleDelete}
      handleUpdate={handleUpdate}
      themeMode={themeMode}
    />
  );
};

export default Body;
