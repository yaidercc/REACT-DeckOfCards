import { useEffect, useState } from 'react';
import DeckOfCardsAPI from '../services/deckofcardsapi';
import GameContext from './GameContext';

const GameProvider = ({ children }) => {
	const [idGame, setIdGame] = useState(null);
	const [win, setWin] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [winName, setWinName] = useState('');

	const [playerOne, setPlayerOne] = useState({
		name: '',
		cards: [],
	});

	const [playerTwo, setPlayerTwo] = useState({
		name: '',
		cards: [],
	});

	useEffect(() => {
		if(idGame) requestCards(20);
	}, [idGame])
	

	const playGame = async () => {
		setIdGame(await DeckOfCardsAPI.getIdGame());
		
	};

	const requestCards = async (numberCards) => {
		const cards = await DeckOfCardsAPI.getCards(idGame,numberCards);
		const cardsDivide = [cards?.slice(0,cards.length/2),cards?.slice(cards.length/2)];

		setPlayerOne({ ...playerOne, cards: [...playerOne.cards, ...cardsDivide[0]] });
		setPlayerTwo({ ...playerTwo, cards: [...playerTwo.cards, ...cardsDivide[1]] });

		const findCardPlayerOne = playerOne.cards.find(
			card => card.value === cards[0].value
		);

		const findCardPlayerTwo = playerTwo.cards.find(
			card => card.value === cards[1].value
		);

		if (findCardPlayerOne || findCardPlayerTwo) {
			setWin(true);
			setShowToast(true);
			setWinName(findCardPlayerOne ? playerOne.name : playerTwo.name);
		}
	};

	const validateTerna=()=>{}
	const validateCuarta=()=>{}
	const validateEscalera=()=>{}

	return (
		<GameContext.Provider
			value={{
				playGame,
				requestCards,
				playerOne,
				setPlayerOne,
				playerTwo,
				setPlayerTwo,
				showToast,
				setShowToast,
				winName,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export default GameProvider;
