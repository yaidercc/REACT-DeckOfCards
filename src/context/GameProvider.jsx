import { useEffect, useState } from 'react';
import DeckOfCardsAPI from '../services/deckofcardsapi';
import GameContext from './GameContext';

const GameProvider = ({ children }) => {
	const [idGame, setIdGame] = useState(null);
	const [win, setWin] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [winName, setWinName] = useState('');
	const [newCard, setNewCard] = useState({playerOne:{},playerTwo:{}});
	const [acceptedCard, setacceptedCard] = useState({playerOne:false,playerTwo:false});
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


	const playGame = async () => {
		setIdGame(await DeckOfCardsAPI.getIdGame());
	};

	const requestCards = async numberCards => {
		const cards = await DeckOfCardsAPI.getCards(idGame, numberCards);
		return [cards?.slice(0, cards.length / 2), cards?.slice(cards.length / 2)];
	};

	const addCardsToPlayers = async()=>{
		handleCardsPlayers(await requestCards(20));
	}

	const handleCardsPlayers = (cards,player=null,id=null) => {
		if(!player){
			setPlayerOne({ ...playerOne, cards: [...playerOne.cards, ...cards[0]] });
			setPlayerTwo({ ...playerTwo, cards: [...playerTwo.cards, ...cards[1]] });
		}else{
			if(player==1){
				const newCards=playerOne.cards.filter((card,i)=>i!=id);
				newCards.push(...newCard.playerOne)
				setPlayerOne({...playerOne,cards:[...newCards]});
				setNewCard({...newCard,playerOne:{}})
				setacceptedCard({...acceptedCard,playerOne:false})
			}
			if(player==2){
				const newCards=playerTwo.cards.filter((card,i)=>i!=id);
				newCards.push(...newCard.playerTwo)
				setPlayerTwo({...playerTwo,cards:[...newCards]});
				setNewCard({...newCard,playerTwo:{}})
				setacceptedCard({...acceptedCard,playerTwo:false})
			}
		}

		// const findCardPlayerOne = playerOne.cards.find(
		// 	card => card.value === cards[0].value
		// );

		// const findCardPlayerTwo = playerTwo.cards.find(
		// 	card => card.value === cards[1].value
		// );

		// if (findCardPlayerOne || findCardPlayerTwo) {
		// 	setWin(true);
		// 	setShowToast(true);
		// 	setWinName(findCardPlayerOne ? playerOne.name : playerTwo.name);
		// }
	};

	const selectCard=async(indexCardSelected,player=null,flag=false)=>{
		if(flag){
			if(player==1){
				handleCardsPlayers(null,player,indexCardSelected);
			}else{
				handleCardsPlayers(null,player,indexCardSelected);
			}
		}
	}

	const validateTerna = () => {};
	const validateCuarta = () => {};
	const validateEscalera = () => {};
	

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
				setacceptedCard
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export default GameProvider;
