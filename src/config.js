// ==============================|| THEME CONFIG  ||============================== //

const config = {
  defaultPath: '/dashboard',  // ✅ Ensure this matches your actual route
  fontFamily: `'Public Sans', sans-serif`,
  i18n: 'en',
  miniDrawer: false, // ✅ Set to true if using a minimized sidebar
  container: false,  // ✅ Change based on your layout needs
  themeMode: 'light', // ✅ Add for easier theme switching (light/dark)
  presetColor: 'default',
  themeDirection: 'ltr'
};

export default config;

export const drawerWidth = 260;

export const socialColors = {
  twitter: '#1DA1F2',
  facebook: '#3b5998',
  linkedIn: '#0e76a8'
};
