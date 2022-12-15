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
		validatePlayer1 = validateCuarta(playerOne.cards);
		validatePlayer2 = validateCuarta(playerTwo.cards);
		if (validatePlayer1.win && validatePlayer2.win) {
			setWin(true);
			setShowToast(true);
			setWinName(validatePlayer1.isEscalera ? playerOne.name : playerTwo.name);
		} else {
			if (validatePlayer1.win || validatePlayer2.win) {
				setWin(true);
				setShowToast(true);
				setWinName(validatePlayer1.win ? playerOne.name : playerTwo.name);
			}
		}
	}, [playerOne.cards, playerTwo.cards]);

	useEffect(() => {
		if (newCard.playerOne.length > 0) {
			validateNewCard(playerOne.cards, 'playerOne', 1);
			validateNewCard(playerTwo.cards, 'playerTwo', 2);
		}
	}, [newCard.playerOne, newCard.playerTwo]);

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
	// write a code that validates if a set of poker cards has a fourth of a different suit
	// const validateEscalera = cards => {
	// 	const cardsSimbols = [
	// 		'ACE',
	// 		'2',
	// 		'3',
	// 		'4',
	// 		'5',
	// 		'6',
	// 		'7',
	// 		'8',
	// 		'9',
	// 		'10',
	// 		'JACK',
	// 		'QUEEN',
	// 		'KING',
	// 	];

	// 	const uniqueCards = cards.map(({ value, suit }) => ({ value, suit }));

	// 	const sortedCards = [];
	// 	let escalera = [];

	// 	uniqueCards.map((card, index) => {
	// 		const indexInRanks = cardsSimbols.indexOf(card.value);
	// 		if (index > 0) {
	// 			let flag = true;
	// 			for (let i = 0; i < index; i++) {
	// 				if (cardsSimbols.indexOf(sortedCards[i].value) >= indexInRanks) {
	// 					sortedCards.splice(i, 0, card);
	// 					flag = false;
	// 					break;
	// 				}
	// 			}
	// 			if (flag) sortedCards.push(card);
	// 		} else {
	// 			sortedCards.push(card);
	// 		}
	// 	});
	// 	// sortedCards.map((card, i) => {
	// 	// 	if (escalera.length < 4) {
	// 	// 		let nextCard = card;
	// 	// 		escalera = [];
	// 	// 		escalera.push(card);
	// 	// 		sortedCards.map(cardSorts => {
	// 	// 			if (cardSorts.suit != nextCard.suit) {
	// 	// 				if (
	// 	// 					cardsSimbols.indexOf(cardSorts.value) -
	// 	// 						cardsSimbols.indexOf(nextCard.value) ==
	// 	// 					1
	// 	// 				) {
	// 	// 					escalera.push(cardSorts);
	// 	// 					nextCard = cardSorts;
	// 	// 				}
	// 	// 			}else{
	// 	// 				escalera
	// 	// 				nextCard = cardSorts;

	// 	// 			}
	// 	// 		});
	// 	// 	}
	// 	// });
	// 	const copisortedCards=sortedCards;
	// 	sortedCards.map((card, i) => {
	// 		if (escalera.length < 4) {
	// 			if(escalera.length>0) copisortedCards.shift();
	// 			let nextCard = card;
	// 			escalera = [];
	// 			escalera.push(card);
	// 			for (let i = 0; i < copisortedCards.length; i++) {
	// 				if (copisortedCards[0].suit != nextCard.suit) {
	// 					if (
	// 						[1,-1].includes(cardsSimbols.indexOf(copisortedCards[0].value) -
	// 						cardsSimbols.indexOf(nextCard.value))
	// 					) {
	// 						escalera.push(copisortedCards[0]);
	// 						nextCard = copisortedCards[0];
	// 					} else {
	// 						break;
	// 					}
	// 				}
	// 			}
	// 			// sortedCards.map(cardSorts => {

	// 			// });
	// 		}
	// 	});
	// 	return escalera;
	// };
	const validateTerna = cards => {
		const numbers = ['2', '3', '4', '5', '6', '7', '8', '9', '10'];
		const numberCards = cards
			.filter(card => numbers.includes(card.value))
			.sort((a, b) => a.value - b.value);
		const uniqueNumbers = [...new Set(numberCards.map(({ value }) => value))];

		let countTerna = 0;
		const numbersTerna = [];
		const noterna = [];
		const ternas = { terna1: [], terna2: [] };
		uniqueNumbers.map(card => {
			const aux = numberCards.filter(cardNumber => card == cardNumber.value);
			if (aux.length == 3) {
				if (countTerna < 2) {
					countTerna == 1 ? (ternas.terna1 = aux) : (ternas.terna2 = aux);
					countTerna++;
				}
			} else {
				noterna.push(...aux);
			}
		});
		noterna.push(...cards.filter(card => !numbers.includes(card.value)));
		return { countTerna, noterna, ternas };
	};
	const validateCuarta = cards => {
		let countCuarta = 0;
		const numbersCuarta = [];
		const isEscalera = false;
		const noCuarta = [];
		let win = false;
		const results = {
			terna1: [],
			terna2: [],
			cuarta: [],
		};
		for (let i = 0; i < cards.length; i++) {
			if (
				cards.filter(cardNumber => cards[i].value == cardNumber.value).length ==
				4
			) {
				if (!numbersCuarta.includes(cards[i].value)) {
					numbersCuarta.push(cards[i].value);
					countCuarta++;
					results.cuarta = cards.filter(
						cardNumber => cards[i].value == cardNumber.value
					);
					break;
				}
			} else {
				noCuarta.push(cards[i]);
			}
		}
		const { countTerna, noterna, ternas } = validateTerna(cards);
		if (countCuarta == 0) {
			if (countTerna >= 1) {
				// isEscalera = true;
				results.terna1 = ternas.terna1;
				results.terna2 = ternas.terna2;
				win = false;
			}
		} else {
			if (countTerna == validateTerna(noCuarta).countTerna && countTerna == 2) {
				results.terna1 = ternas.terna1;
				results.terna2 = ternas.terna2;
				win = true;
			} else {
				results.terna1 = ternas.terna1;
				results.terna2 = ternas.terna2;
				win = false;
			}
		}
		return { isEscalera, win, results, noCuarta };
	};

	const validateNewCard = (cards = [], playerName, playerNumber) => {
		const { win, isEscalera, results } = validateCuarta(cards);
		const cardNew = newCard[playerName][0];
		console.log(cardNew);
		if (!win) {
			// const someCard = cards.filter(card => card.value == cardNew.value);
			// if (someCard.length > 0) {
			// 	let uniqueValues = [];
			// 	if (someCard.length > 2) {
			// 		if (playerNumber == 1) {
			// 			setPlayerOne([...replaceValue(cardNew, cards)]);
			// 		} else {
			// 			setPlayerTwo([...replaceValue(cardNew, cards)]);
			// 		}
			// 		alert("mayor a 2 ")
			// 	} else {
			// 		alert("menor a 2 ")
			// 		uniqueValues = cards.filter(cardSearch => {
			// 			if (
			// 				cards.filter(card => card.value == cardSearch.value).length == 1
			// 			) {
			// 				return true;
			// 			}
			// 		});
			// 		if (uniqueValues.length > 0) {
			// 			const round = Math.random() * ((uniqueValues.length - 1) - 0) + 0;
			// 			cards.splice(round, 1,cardNew);
			// 		}
			// 	}
			// }
			setNewCard({...newCard,[playerName]:[]});
		}
		return { win, isEscalera };
	};

	const replaceValue = (valueToReplace, cards) => {
		let uniqueValues = cards.filter(cardSearch => {
			if (cards.filter(card => card.value == cardSearch.value).length == 1) {
				return true;
			}
		});

		if (uniqueValues.length > 0) {
			const round = Math.random() * ((uniqueValues.length - 1) - 0) + 0;
			cards.splice(round, 1,valueToReplace);
		} else {
			uniqueValues = cards.filter(cardSearch => {
				if (cards.filter(card => card.value == cardSearch.value).length <= 2) {
					return true;
				}
			});
			const round = Math.random() * ((uniqueValues.length - 1) - 0) + 0;
			cards.splice(round, 1,valueToReplace);
		}
		return cards;
	};

	// const validateBaraja = cards => {
	// 	const results = {
	// 		terna: validateTerna(cards).countTerna,
	// 		cuarta: validateCuarta(cards).countCuarta,
	// 		escalera:
	// 			validateCuarta(cards).isEscalera || validateTerna(cards).isEscalera,
	// 	};
	// 	if (results.terna == 2 && results.cuarta == 1) {
	// 		if (results.escalera) {
	// 			return {
	// 				escalera: true,
	// 				win: true,
	// 			};
	// 		}
	// 		return {
	// 			escalera: false,
	// 			win: true,
	// 		};
	// 	}
	// 	return {
	// 		escalera: false,
	// 		win: false,
	// 	};
	// };

	const validateBaraja = cards => {
		const results = {
			terna1: [],
			terna2: [],
			cuarta: [],
		};
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
