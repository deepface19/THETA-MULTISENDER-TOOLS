import { ethers, providers } from "ethers"
const { JsonRpcProvider } = providers


// theta testnet
export const provider365 = new JsonRpcProvider('https://eth-rpc-api-testnet.thetatoken.org/rpc')
export const multiSenderAddr365 = '0x16d2c00b0c1c6d60b184c78edea801405da406d2'

// harmony mainnet
export const provider361 = new JsonRpcProvider('https://eth-rpc-api.thetatoken.org/rpc')
export const multiSenderAddr361 = '0x16D2C00b0c1c6d60B184C78edeA801405da406D2'
