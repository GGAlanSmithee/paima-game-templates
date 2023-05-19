import { ExternalLinkIcon } from '@heroicons/react/outline';

import NFTImage from './NFTImage';
import { useWeb3Context } from '../hooks/useWeb3Context';
import AddressInfo from './AddressInfo';

interface Props {
  imageModal: string;
  nftPrice: number;
  tokenId: string;
  nftTotal: number;
  explorerURL: string;
}

const PurchasePending = ({ imageModal, nftPrice, tokenId, nftTotal, explorerURL }: Props) => {
  const { network, currentAccount } = useWeb3Context();

  return (
    <div className="flex flex-col gap-8">
      <AddressInfo network={network} address={currentAccount} />
      <NFTImage imageModal={imageModal} status={`#${tokenId} / ${nftTotal}`} />
      <div className="flex items-center justify-between">
        <h3 className="text-center font-bold text-black font-base">{nftPrice} milkADA</h3>
        <p>Pending...</p>
      </div>
      <div className="flex flex-col items-center">
        <a className="cursor-pointer flex items-center" href={explorerURL} target="_blank">
          <p className="font-base text-14 mr-4 underline">Go to Explorer</p>
          <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};

export default PurchasePending;
