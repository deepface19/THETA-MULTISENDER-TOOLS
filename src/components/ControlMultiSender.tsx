import React, { useState, useEffect } from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import styled from 'styled-components';
import {
	TextField,
	Button, Stack, LinearProgress
} from '@mui/material'
import { btnTextTable, messagesTable, multisenderTable, processRecipientData, } from '../helpers/utils'
import { Send as SendIcon } from '@mui/icons-material'
import useStore from '../helpers/store'
import AlertMessages from './AlertMessages'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useWeb3React } from '@web3-react/core';

import { getMultiSenderAddress, transferToMultiSender } from '../helpers/multisenderHelper';
import { getErc20Approval, getErc20Decimals, getTotalSumOfBignumbers } from '../helpers/erc20';
import { getErc721Approval } from '../helpers/erc721';
import { getErc1155Approval } from '../helpers/erc1155';

const MultiSender = () => {
	const { account } = useWeb3React();

	const theme = useTheme();
	const aboveLarge = useMediaQuery(theme.breakpoints.up('lg'));

	const chainId = useStore((state: { chainId: any; }) => state.chainId)
	const chainIdMsg = useStore((state: { chainIdMsg: any; }) => state.chainIdMsg)
	const setChainIdMsg = useStore((state: { setChainIdMsg: any; }) => state.setChainIdMsg)

	const walletMsg = useStore((state: { walletMsg: any; }) => state.walletMsg)

	const [tokenType, setTokenType] = useState('erc20')
	const [tokenAddress, setTokenAddress] = useState('')
	const [recipientData, setRecipientData] = useState('')
	const [btnText, setBtnText] = useState(btnTextTable.SEND)

	const [message1, setMessage1] = useState('')
	const [txnHash, setTxnHash] = useState('')


	useEffect(() => {
		if (getMultiSenderAddress(chainId) === '') setChainIdMsg(messagesTable.NOT_SUPPORTED)
		else setChainIdMsg('')
	}, [chainId])

	useEffect(() => { setTxnHash('') }, [tokenType])

	const handleTokenTransfer = async () => {
		setMessage1('')
		setTxnHash('')
		if (account) {

			try {
				let decimals = 0
				if (tokenType === 'eth') decimals = 18
				else if (tokenType === 'erc20') {
					const decimals1 = await getErc20Decimals(tokenAddress)
					if (decimals1 === -1) {
						setMessage1(messagesTable.INVALID_TOKENADDRESS)
						return
					}
					decimals = decimals1
				}
				const { done, recipientsArr, tokenIdsArr, tokenAmountsInWeiArr } = await processRecipientData(recipientData, tokenType, decimals)
				if (!done) {
					setMessage1(messagesTable.INVALID_DATA)
					return
				}
				setBtnText(btnTextTable.APPROVING)
				const totalAmountInWei = getTotalSumOfBignumbers(tokenAmountsInWeiArr)
				const multiSenderAddr = getMultiSenderAddress(chainId)
				let isApproved = true
				if (tokenType === 'erc20') {
					isApproved = await getErc20Approval(tokenAddress, multiSenderAddr, totalAmountInWei)
				}
				else if (tokenType === 'erc721') {
					isApproved = await getErc721Approval(tokenAddress, multiSenderAddr)
				}
				else if (tokenType === 'erc1155') {
					isApproved = await getErc1155Approval(tokenAddress, multiSenderAddr)
				}
				if (!isApproved) {
					setMessage1(messagesTable.APPROVAL_PROBLEM)
					setBtnText(btnTextTable.SEND)
					return
				}
				setBtnText(btnTextTable.SENDING)
				// console.log({ tokenType, tokenAddress, recipientsArr, tokenIdsArr, tokenAmountsInWeiArr })
				const { isTransferred, hash } = await transferToMultiSender(tokenType, tokenAddress, recipientsArr, tokenIdsArr, tokenAmountsInWeiArr)
				if (!isTransferred) {
					setMessage1(messagesTable.TRANSFER_PROBLEM)
					setBtnText(btnTextTable.SEND)
					return
				}
				setTxnHash(hash)
				setBtnText(btnTextTable.SEND)
			} catch (err) {
				console.log(err)
				setMessage1(messagesTable.TRANSFER_PROBLEM)
				setBtnText(btnTextTable.SEND)
			}
		}
	}

	return (
		<ContractComponent>
			<Wrapper>
				<div>
					<Stack mx='auto' spacing={3} minWidth={aboveLarge ? 'auto' : 'auto'}>
						<FormControl component="fieldset">
							<FormLabel component="legend">Multi Sender Type: </FormLabel>
							<RadioGroup
								row aria-label="gender"
								name="row-radio-buttons-group"
								value={tokenType}
								onChange={e => setTokenType(e.target.value)}

							>
								<FormControlLabel value="eth" control={<Radio />} label="TFUEL" />
								<FormControlLabel value="erc20" control={<Radio />} label="TNT20" />
								<FormControlLabel value="erc721" control={<Radio />} label="TNT721" />
								<FormControlLabel value="erc1155" control={<Radio />} label="TNT1155" />
							</RadioGroup>
						</FormControl>

						{(tokenType !== 'eth') &&
							<TextField
								fullWidth
								id="standard-basic"
								label="Token Address"
								variant="standard"
								value={tokenAddress}
								onChange={e => setTokenAddress(e.target.value)}
							/>
						}

						<TextField
							fullWidth
							color='primary'
							id="standard-multiline-static"
							label={(() => {
								if (tokenType === 'eth' || tokenType === 'erc20') {
									return multisenderTable.REC_AMT_TXT
								}
								else if (tokenType === 'erc721') {
									return multisenderTable.REC_ID_TXT
								}
								else if (tokenType === 'erc1155') {
									return multisenderTable.REC_ID_AMT_TXT
								}
							})()}
							multiline
							rows={4}
							// defaultValue="Default Value"
							variant="standard"
							placeholder={(() => {
								if (tokenType === 'eth' || tokenType === 'erc20') {
									return multisenderTable.REC_AMT_VAL
								}
								else if (tokenType === 'erc721') {
									return multisenderTable.REC_ID_VAL
								}
								else if (tokenType === 'erc1155') {
									return multisenderTable.REC_ID_AMT_VAL
								}
							})()}
							value={recipientData}
							onChange={e => setRecipientData(e.target.value)}
						/>

						<Button onClick={handleTokenTransfer}
							disabled={(
								chainIdMsg === messagesTable.NOT_INSTALLED
								|| chainIdMsg === messagesTable.NOT_SUPPORTED
								|| walletMsg === messagesTable.METAMASK_LOCKED
								|| btnText === btnTextTable.APPROVING
								|| btnText === btnTextTable.SENDING
							)}
							variant="contained" endIcon={<SendIcon />}>
							{btnText}
						</Button>
						{
							(btnText === btnTextTable.APPROVING || btnText === btnTextTable.SENDING) &&
							<LinearProgress />
						}

						<AlertMessages message1={message1} />

						{
							(txnHash.length > 0) &&
							<a style={{ fontSize: '15px', textAlign: 'center', fontWeight: 'bold' }}
								href={`${"https://beta-explorer.thetatoken.org/"}txs/${txnHash}`}
							>
								Transaction Successful - View on Theta Explorer

							</a>
						}
					</Stack>
				</div>
			</Wrapper>
		</ContractComponent>
	)
}

const ContractComponent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 50%;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: -10vh;
	padding: 40px 60px;
	border-radius: 20px;
	max-width: auto;
	color: #ffffff;
	font-size: 1.5rem;
	background: linear-gradient( #29B6E8, #22E8BF );
	box-shadow: 2px 8px 10px 4px rgba(0, 0, 0, 0.3);
	
	  
`;
export default MultiSender;

