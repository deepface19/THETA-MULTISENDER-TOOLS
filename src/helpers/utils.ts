import { ethers } from "ethers"
import { BN } from "./web3Provider"


export const messagesTable = {
	NOT_SUPPORTED: 'Current Network is not supported.',
	NOT_INSTALLED: 'Metamask is not Installed',
	METAMASK_LOCKED: 'Wallet is not connected',
	TRANSFER_PROBLEM: 'Problem occurred while transferring tokens',
	INVALID_DATA: 'Invalid data provided',
	APPROVAL_PROBLEM: 'Problem occurred while approval',
	LOCK_PROBLEM: 'Problem occurred while locking tokens',
	FAUCET_PROBLEM: 'Error occurred while sending tokens',
	INVALID_TOKENADDRESS: 'Invalid Token Address'
}

export const btnTextTable = {
	SEND: 'Send',
	APPROVING: 'Approving...',
	SENDING: 'Sending...',
}

export const multisenderTable = {
	REC_AMT_TXT: 'Recipient,Amount',
	REC_AMT_VAL: `0x12345678912345678912345678912345671234,1000
	0x98765432198765432198765432198765432198,0.001`,
	REC_ID_TXT: 'Recipient,TokenId',
	REC_ID_VAL: `0x1234567891234567891234567891234567123456,5
	0x98765432198765432198765432198765432198,8`,
	REC_ID_AMT_TXT: 'Recipient,TokenId,Amount',
	REC_ID_AMT_VAL: `0x1234567891234567891234567891234567123456,7,8
	0x98765432198765432198765432198765432198,3,12`
}

export const processRecipientData = async (recipientData: string, tokenType: string, decimals: number) => {
	const recipientsArr: string[] = []
	const tokenIdsArr: ethers.BigNumber[] = []
	const tokenAmountsInWeiArr: ethers.BigNumber[] = []
	try {
		const recipientDataArr = recipientData.trim().split('\n')

		if (tokenType === 'erc20' || tokenType === 'eth') {
			for (let i = 0; i < recipientDataArr.length; i++) {
				const [currRecipient, currAmount] = recipientDataArr[i].trim().split(',')
				recipientsArr.push(currRecipient)
				tokenAmountsInWeiArr.push(ethers.utils.parseUnits(currAmount, decimals))
			}
			return { done: true, recipientsArr, tokenIdsArr, tokenAmountsInWeiArr }
		}
		else if (tokenType === 'erc721') {
			for (let i = 0; i < recipientDataArr.length; i++) {
				const [currRecipient, currId] = recipientDataArr[i].trim().split(',')
				recipientsArr.push(currRecipient)
				tokenIdsArr.push(BN(currId))
			}
			return { done: true, recipientsArr, tokenIdsArr, tokenAmountsInWeiArr }
		}
		else if (tokenType === 'erc1155') {
			for (let i = 0; i < recipientDataArr.length; i++) {
				const [currRecipient, currId, currAmount] = recipientDataArr[i].trim().split(',')
				recipientsArr.push(currRecipient)
				tokenIdsArr.push(BN(currId))
				tokenAmountsInWeiArr.push(BN(currAmount))
			}
			return { done: true, recipientsArr, tokenIdsArr, tokenAmountsInWeiArr }
		}
	} catch (err) {
		console.log({ err })
		return { done: false, recipientsArr, tokenIdsArr, tokenAmountsInWeiArr }
	}
	const done = Boolean(recipientsArr.length)
	return { done, recipientsArr, tokenIdsArr, tokenAmountsInWeiArr }

}