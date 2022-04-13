import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import styled from 'styled-components';
import theme from "./theme";
import Logo from './img/Logo.png';
import ConnectButton from "./components/ConnectButton";
import AccountModal from "./components/AccountModal";
import "@fontsource/inter";
import Multisender from './pages/Multisender';
function App() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<div className="App">
			<Wrapper>
				<Container>
						<Topbar className="App-topbar">
							<img src={Logo} alt="logo" />
							<ChakraProvider theme={theme}>
								<Flex>
									<ConnectButton handleOpenModal={onOpen} />
									<AccountModal isOpen={isOpen} onClose={onClose} />
								</Flex>
							</ChakraProvider>
						</Topbar>
						<Content>
								<Multisender />
						</Content>
				</Container>
			</Wrapper>
		</div>
	);
}
const Flex = styled.div`
	display: flex;
	align-items: center;
`;

const Topbar = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: space-between;
	height: 74px;
	width: 100%;
	img {
		height: 100px;
		position: center;
		width: 350px;
		margin-left: 1rem;
	}
`;

const Content = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1;
	width: 100%;
`;

const Wrapper = styled.div`
    font-size: 1rem;
	color: white;
	background: linear-gradient(-45deg, #0C2A24, #0F3428, #279179, #65DAA1, #CDFE79);
	background-size: 400% 400%;
	animation: gradient 15s ease infinite;
	height: 100vh;
}

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

	`;
const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	padding: 0px 24px;
	max-width: 1200px;
	margin: 0 auto;
`;

export default App;
