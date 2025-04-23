// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={logo} alt="Mantis" width="100" />
     *
     */
    <>
      <svg width="160" height="120" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">  
        <path d="M10 20 L20 5 L30 20 L20 35 Z" fill="#FF6B00" />
        <path d="M20 5 L25 15 L30 20 L25 25 Z" fill="#FFA500" />
        <text x="40" y="28" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#333">
          SPARK
        </text>
      </svg>
    </>
  );
};

export default Logo;
