import { ExternalLinkIcon } from '@heroicons/react/outline';

import { useWeb3Context } from '../hooks/useWeb3Context';
import { CHAIN_ID, NFT } from '../services/constants';
import NFTImage from './NFTImage';
import Button from './Buttons';
import AddressInfo from './AddressInfo';
import { useState } from 'react';
import type { Characters } from '../services/utils';
import { characters } from '../services/utils';

interface Props {
  imageModal: string;
  nftPrice: string;
  nftSupply: string;
  onNftBuy: (character: Characters) => void;
}

const Purchase = ({ imageModal, nftPrice, nftSupply, onNftBuy }: Props) => {
  const [character, setCharacter] = useState<Characters>(characters[0]);
  const { connected, network, chainId, switchChain } = useWeb3Context();

  return (
    <div className="flex flex-col gap-8">
      <AddressInfo network={network} address={NFT} />
      <NFTImage image={imageModal} status={`MAX:${nftSupply}`} />
      <div className="flex">
        <h3 className="text-left font-bold text-black font-base flex-1">{nftPrice} milkTADA</h3>
        <select
          value={character}
          onChange={e => setCharacter(e.target.value as Characters)}
          className="flex-1"
        >
          {characters.map(character => (
            <option value={character} key={character}>
              {character}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col items-center">
        <a
          className="cursor-pointer flex items-center"
          href="https://faucet-devnet-cardano-evm.c1.milkomeda.com/"
          target="_blank"
        >
          <p className="font-base text-14 mr-4 underline">How to get milkTADA</p>
          <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
      {chainId !== CHAIN_ID ? (
        <Button onClick={() => switchChain?.(CHAIN_ID)} disabled={!connected}>
          Switch network
        </Button>
      ) : (
        <Button onClick={() => onNftBuy(character)} disabled={!connected}>
          Buy NFT
        </Button>
      )}
    </div>
  );
};

export default Purchase;
