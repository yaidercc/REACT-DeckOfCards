import { useEffect, useState } from 'react';
import DeckOfCardsAPI from '../services/deckofcardsapi';
import GameContext from './GameContext';

const GameProvider = ({ children }) => {
	const [idGame, setIdGame] = useState(null);
	const [win, setWin] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [winName, setWinName] = useState('');
	const [newCard, setNewCard] = useState({ playerOne: [], playerTwo: [] });
	const [cardsRemaninig, setcardsRemaninig] = useState(0);
	const [turn, setTurn] = useState({
		playerOne: 16,
		playerTwo: 16,
	});
	const [acceptedCard, setacceptedCard] = useState({
		playerOne: false,
		playerTwo: false,
	});

	let validatePlayer1 = null;
	let validatePlayer2 = null;
	const [playerOne, setPlayerOne] = useState({
		name: '',
		cards: [],
	});

	const [playerTwo, setPlayerTwo] = useState({
		name: '',
		cards: [],
	});

	useEffect(() => {
		if (idGame) {
			addCardsToPlayers();
		}
	}, [idGame]);

	useEffect(() => {
		validatePlayer1 = validateBaraja(playerOne.cards);
		validatePlayer2 = validateBaraja(playerTwo.cards);
		if (validatePlayer1 || validatePlayer2) {
			setWin(true);
			setShowToast(true);
			setWinName(validatePlayer1 ? playerOne.name : playerTwo.name);
		}
	}, [playerOne.cards, playerTwo.cards]);

	const playGame = async () => {
		setIdGame(await DeckOfCardsAPI.getIdGame());
	};

	const requestCards = async numberCards => {
		const cards = await DeckOfCardsAPI.getCards(idGame, numberCards);
		let divideCards = [];
		if (numberCards > 1) {
			divideCards = [
				cards?.cards.slice(0, cards?.cards.length / 2),
				cards?.cards.slice(cards?.cards.length / 2),
				cards.remaining,
			];
		} else {
			divideCards = [cards?.cards[0], 0, cards.remaining];
		}
		return divideCards;
	};

	const addCardsToPlayers = async () => {
		const cards = await requestCards(20);
		setcardsRemaninig(cards[2]);
		handleCardsPlayers(cards);
	};

	const handleCardsPlayers = (cards, player = null, id = null) => {
		if (!player) {
			setPlayerOne({ ...playerOne, cards: [...playerOne.cards, ...cards[0]] });
			setPlayerTwo({ ...playerTwo, cards: [...playerTwo.cards, ...cards[1]] });
		} else {
			if (player == 1) {
				const newCards = playerOne.cards.filter((card, i) => i != id);
				newCards.push(...newCard.playerOne);
				setPlayerOne({ ...playerOne, cards: [...newCards] });
				setNewCard({ ...newCard, playerOne: [] });
				setacceptedCard({ ...acceptedCard, playerOne: false });
			}
			if (player == 2) {
				const newCards = playerTwo.cards.filter((card, i) => i != id);
				newCards.push(...newCard.playerTwo);
				setPlayerTwo({ ...playerTwo, cards: [...newCards] });
				setNewCard({ ...newCard, playerTwo: [] });
				setacceptedCard({ ...acceptedCard, playerTwo: false });
			}
		}
	};

	const selectCard = (indexCardSelected, player = null, flag = false) => {
		if (flag) {
			if (player == 1) {
				handleCardsPlayers(null, player, indexCardSelected);
			} else {
				handleCardsPlayers(null, player, indexCardSelected);
			}
		}
	};

	const validateTerna = cards => {
		const numbers = ['2', '3', '4', '5', '6', '7', '8', '9', '10'];
		const numberCards = cards
			.filter(card => numbers.includes(card.value))
			.sort((a, b) => a.value - b.value);
		const uniqueCards = new Set([...numberCards.map(({ value }) => value)]);
		let isWinner = false;
		uniqueCards.forEach(card => {
			if (
				numberCards.filter(cardNumber => card == cardNumber.value).length == 3
			) {
				isWinner = true;
			}
		});
		return isWinner;
	};
	const validateCuarta = cards => {
		const uniqueValues = new Set([...cards.map(({ value }) => value)]);
		const uniqueFigure = new Set([...cards.map(({ suit }) => suit)]);
		let isWinner = false;
		uniqueValues.forEach((card, i) => {
			if (
				cards.filter(cardNumber => card == cardNumber.value).length == 4 ||
				cards.filter(cardFigure => uniqueFigure[i] == cardFigure.suit).length ==
					4
			) {
				isWinner = true;
			}
		});
		return isWinner;
	};
	const validateEscalera = cards => {
		const cardsSimbols = [
			'ACE',
			'2',
			'3',
			'4',
			'5',
			'6',
			'7',
			'8',
			'9',
			'10',
			'JACK',
			'QUEEN',
			'KING',
		];

		const uniqueCards = cards.map(({ value, suit }) => ({ value, suit }));

		const sortedCards = [];
		let escalera = [];

		uniqueCards.map((card, index) => {
			const indexInRanks = cardsSimbols.indexOf(card.value);
			if (index > 0) {
				let flag = true;
				for (let i = 0; i < index; i++) {
					if (cardsSimbols.indexOf(sortedCards[i].value) >= indexInRanks) {
						sortedCards.splice(i, 0, card);
						flag = false;
						break;
					}
				}
				if (flag) sortedCards.push(card);
			} else {
				sortedCards.push(card);
			}
		});
		console.log(sortedCards);
		sortedCards.map((card, i) => {
			if (escalera.length < 3) {
				escalera = sortedCards.filter(cardSorts => {
					if (cardSorts.suit == card.suit) {
						if (
							[0, 1].includes(
								cardsSimbols.indexOf(cardSorts.value) -
									cardsSimbols.indexOf(card.value)
							)
						) {
							console.log('valor actual: ' + card.suit, card.value);
							console.log(
								'valor encontrado: ' + cardSorts.suit,
								cardSorts.value
							);
							return true;
						} else {
							return false;
						}
					} else {
						return false;
					}
				});
			}
		});
		return escalera.length >= 3;
	};

	const validateBaraja = cards => {
		return (
			validateTerna(cards) || validateCuarta(cards) || validateEscalera(cards)
		);
	};

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
				newCard,
				setNewCard,
				selectCard,
				acceptedCard,
				setacceptedCard,
				cardsRemaninig,
				setcardsRemaninig,
				turn,
				setTurn,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export default GameProvider;
