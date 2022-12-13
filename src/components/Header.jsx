import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
// import { TfiGame } from 'react-icons/tfi';
import {MdOutlineCasino} from 'react-icons/md'
const Header = () => {
	return (
		<Navbar bg='dark' variant='dark'>
			<Container>
				<Navbar.Brand>
					<div className='d-inline-block align-top '>
						<MdOutlineCasino />
					</div>{' '}
					Deck Of Cards Game
				</Navbar.Brand>
			</Container>
		</Navbar>
	);
};

export default Header;
