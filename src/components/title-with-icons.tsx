import { Box, Typography, useMediaQuery } from '@mui/material';
import { FaceIcon, TwitterIcon, WhatsUpIcon } from '../icons/icon';

interface ITitleWithIcons {
  title: string;
}

const TitleWithIcons = ({ title }: ITitleWithIcons) => {
  const isMobile = useMediaQuery('(max-width:630px)');

  return (
    <>
      <Typography sx={{ fontSize: isMobile ? '25px' : '40px' }} variant="h3">
        {title}
      </Typography>
      <hr className="mt-4  bg-black" />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '5px',
        }}
      >
        <WhatsUpIcon />
        <TwitterIcon />
        <FaceIcon />
      </Box>
    </>
  );
};

export default TitleWithIcons;
