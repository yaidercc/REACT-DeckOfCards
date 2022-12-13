import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import useGame from '../hooks/useGame';
import { CgCardSpades } from 'react-icons/cg';
const FormPlay = () => {
	const {
		requestCards,
		setNewCard,
		newCard,
		cardsRemaninig,
		setcardsRemaninig,
	} = useGame();
	const handleClick = async () => {
		
		let cards = null;
		let numCards = 0;
		if (!(newCard.playerOne.length > 0 && newCard.playerTwo.length > 0)) {
			numCards = newCard.playerOne.length > 0 || newCard.playerTwo.length > 0 ? 1 : 2;
			cards = await requestCards(numCards);
		}
		if (numCards > 0) {
			setNewCard({
				playerOne: [],
				playerTwo: [],
			});
			if (numCards === 1) {
				if (newCard.playerOne.length > 0) {
					setNewCard({
						...newCard,
						playerTwo: [cards[0]],
					});
				} else {
					setNewCard({
						...newCard,
						playerOne: [cards[0]],
					});
				}
			} else {
				setNewCard({
					playerOne: cards[0],
					playerTwo: cards[1],
				});
			}
			if (cardsRemaninig > 0) {
				setcardsRemaninig(cards[2]);
			} else {
				alert('No hay mas cartas en la baraja.');
			}
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
