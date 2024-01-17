import { Box, Button, Hidden } from '@mui/material';
import { Link } from 'react-router-dom';
import { helloFreindButtonStyle } from './style/style';

interface IHelloFreinds {
  navigateTo: string;
  buttonText: string;
}

const HelloFriendSide = ({ buttonText, navigateTo }: IHelloFreinds) => {
  return (
    <Hidden mdDown>
      <Box sx={{ flex: '1' }}>
        <Box className="background">
          <img src="../images/ils1.488442d7.svg" />
          <Link to={navigateTo}>
            <Button
              type="submit"
              variant="contained"
              sx={helloFreindButtonStyle}
            >
              {buttonText}
            </Button>
          </Link>
        </Box>
      </Box>
    </Hidden>
  );
};

export default HelloFriendSide;
