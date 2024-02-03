import { Box, Button, Typography } from '@mui/material';
import Search from '../../pages/boins/search';
import { AddButton, flexContainer } from '../style/style';
import { useTheme } from '@mui/material';

interface HeaderProps {
  title: string;
  label: string;
  titleButton: string;
  themeMode: string;
  searchValue: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleModal: () => void;
}

const Header: React.FC<HeaderProps> = ({
  themeMode,
  searchValue,
  handleSearchChange,
  toggleModal,
  label,
  title,
  titleButton,
}) => {
  const theme = useTheme();
  return (
    <Box sx={flexContainer}>
      <Box>
        <Typography
          style={{
            color:
              themeMode === 'dark'
                ? theme.palette.primary.light
                : theme.palette.primary.dark,
          }}
          variant="h6"
          sx={{ fontWeight: 'bold' }}
        >
          {title}
        </Typography>
      </Box>
      <Box>
        <Search
          label={label}
          size={'small'}
          value={searchValue}
          onChange={handleSearchChange}
          themeMode={themeMode}
        />
      </Box>
      <Box>
        <Button variant="contained" sx={AddButton} onClick={toggleModal}>
          {titleButton}
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
