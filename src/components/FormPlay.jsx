import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import useGame from '../hooks/useGame';
const FormPlay = () => {
	const { requestCards,setNewCard,newCard } = useGame();
	const handleClick = async () => {
		setNewCard({
			playerOne:{},
			playerTwo:{}
		})
		const cards = await requestCards(2);
		setNewCard({
			playerOne:cards[0],
			playerTwo:cards[1]
		})
		console.log(newCard);
	};
	return (
		<Stack gap={2} className='col-md-5 mx-auto'>
			<Button onClick={handleClick} variant='secondary'>
				Cards
			</Button>
		</Stack>
	);
};

export default FormPlay;
