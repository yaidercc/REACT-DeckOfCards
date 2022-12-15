import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import useGame from '../hooks/useGame';
import { CgCardSpades } from 'react-icons/cg';
const FormPlay = () => {
	const {
		requestCards,
		setNewCard,
		cardsRemaninig,
		setcardsRemaninig,
	} = useGame();
	const handleClick = async () => {
		const cards = await requestCards(2);
		
		if (cardsRemaninig > 0) {
			setcardsRemaninig(cards[2]);
			setNewCard({
				playerOne: cards[0],
				playerTwo: cards[1],
			});
		} else {
			alert('No hay mas cartas en la baraja.');
		}
	};
	return (
		<Stack gap={2} className='col-md-2 mx-auto'>
			<Button
				onClick={handleClick}
				variant='secondary'
				className='d-flex flex-column align-items-center bg-success'
			>
				<CgCardSpades className='fs-4' />
				Pedir cartas
			</Button>
			<p className='text-center fw-bold'>Cartas restantes: {cardsRemaninig}</p>
		</Stack>
	);
};

export default FormPlay;
