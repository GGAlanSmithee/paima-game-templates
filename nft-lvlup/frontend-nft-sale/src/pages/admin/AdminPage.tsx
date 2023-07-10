import { Link } from 'react-router-dom';
import Button from '../../components/Buttons';

// TODO: add some basic routing structure
// TODO: clarify native vs erc20
export enum AdminAction {
  TransferNftContract = 'transfer-nft-contract',
  TransferNativeNftSaleContract = 'transfer-native-nft-sale-contract',
  TransferErc20NftSaleContract = 'transfer-erc20-nft-sale-contract',
  AddMinter = 'add-minter',
  UpdateMaxSupply = 'update-max-supply',
  UpdateBaseUri = 'update-base-uri',
  UpdateNftPriceNativeNftSale = 'update-nft-price-native-nft-sale',
  UpdateNftPriceErc20NftSale = 'update-nft-price-erc20-nft-sale',
}

const AdminPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <Link to={`/${AdminAction.TransferNftContract}`}>
        <Button className="w-full">1. Transfer Nft contract ownership</Button>
      </Link>
      <Link to={`/${AdminAction.TransferNativeNftSaleContract}`}>
        <Button className="w-full">2. Transfer NativeNftSale contract ownership</Button>
      </Link>
      <Link to={`/${AdminAction.TransferErc20NftSaleContract}`}>
        <Button className="w-full">3. Transfer Erc20NftSale contract ownership</Button>
      </Link>
      <Link to={`/${AdminAction.AddMinter}`}>
        <Button className="w-full">4. Add a minter to the Nft contract</Button>
      </Link>
      <Link to={`/${AdminAction.UpdateMaxSupply}`}>
        <Button className="w-full">5. Update max supply of the Nft contract</Button>
      </Link>
      <Link to={`/${AdminAction.UpdateBaseUri}`}>
        <Button className="w-full">6. Update base URI of the Nft contract</Button>
      </Link>
      <Link to={`/${AdminAction.UpdateNftPriceNativeNftSale}`}>
        <Button>7. Update NFT price in the NativeNftSale contract</Button>
      </Link>
      <Link to={`/${AdminAction.UpdateNftPriceErc20NftSale}`}>
        <Button>8. Update NFT price in the Erc20NftSale contract</Button>
      </Link>
    </div>
  );
};

export default AdminPage;
