import type { Web3LogoMap } from '../../config-provider/context';
import polkadotImg from './logo/1.Polkadot.svg';
import kusamaImg from './logo/2.Kusama.svg';

const logoMap: Web3LogoMap = {
  network: {
    polkadot: polkadotImg,
    kusama: kusamaImg,
  },
  symbol: {
    dot: polkadotImg,
    ksm: kusamaImg,
  },
  // eslint-disable-next-line global-require
  default: require('./logo/3.Default.png'),
};

export default logoMap;
