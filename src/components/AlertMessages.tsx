import { Box, Typography } from '@mui/material'
import useStore from '../helpers/store'

export default function AlertMessages ( message1: any | null | undefined ) {
	const chainIdMsg = useStore((state: { chainIdMsg: any }) => state.chainIdMsg)
	const walletMsg = useStore((state: { walletMsg: any }) => state.walletMsg)

	return (
		<Box>
			{chainIdMsg.length > 0 && <Typography>{chainIdMsg}</Typography>}
			{walletMsg.length > 0 && <Typography>{walletMsg}</Typography>}
			{message1.length > 0 && <Typography>{message1}</Typography>}
		</Box>
	)
}