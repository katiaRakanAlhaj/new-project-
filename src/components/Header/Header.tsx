import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material';
import Search from '../../pages/boins/search';
import { AddButton, container, flexContainer } from '../style/style';
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
  const isMobile = useMediaQuery('(max-width:600px)');

  const theme = useTheme();
  return (
    <Box
      style={{
        backgroundColor:
          themeMode === 'dark'
            ? theme.palette.primary.dark
            : theme.palette.background.default,
      }}
    >
      <Grid container spacing={4} alignItems="center" mb={2} sx={{}}>
        <Grid item md={6} xs={12}>
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
        </Grid>
        <Grid item md={6} xs={12}>
          <Box display={isMobile ? 'grid' : 'flex'} gap={1} alignItems="center">
            <Search
              value={searchValue}
              label={label}
              size={'small'}
              onChange={handleSearchChange}
              themeMode={themeMode}
            />
            <Button
              variant="contained"
              sx={[
                AddButton,
                { width: isMobile ? '100%' : 400, height: '100%' },
              ]}
              onClick={toggleModal}
            >
              {titleButton}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
