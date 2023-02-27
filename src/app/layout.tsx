import 'shared/scss/grid.css';
import 'shared/scss/reboot.css';
import '@axa-fr/react-toolkit-all/dist/style/af-components.scss';
import '@axa-fr/react-toolkit-core/dist/assets/fonts/icons/af-icons.css';
import 'shared/scss/custom.scss';
import App from 'components/App';

export const metadata = {
  title: 'Next Starter Tookit',
  description: 'Web site created using React Toolkit by Axa',
  themeColor: '#000000',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <App>{children}</App>
      </body>
    </html>
  );
}
