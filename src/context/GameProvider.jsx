
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
	const numbers=["2", "3", "4", "5", "6", "7", "8", "9", "10"];
	let validatePlayer1=null;
	let validatePlayer2=null;
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
		validatePlayer1=validateBaraja(playerOne.cards);
		validatePlayer2=validateBaraja(playerTwo.cards);
		if (validatePlayer1 || validatePlayer2) {
			// alert("alguien ganoop")
			setWin(true);
			setShowToast(true);
			setWinName(validatePlayer1 ? playerOne.name : playerTwo.name);
		}
	}, [playerOne.cards,playerTwo.cards]);


	const playGame = async () => {
		setIdGame(await DeckOfCardsAPI.getIdGame());
	};

	const requestCards = async numberCards => {
		const cards = await DeckOfCardsAPI.getCards(idGame, numberCards);
		return [cards?.slice(0, cards.length / 2), cards?.slice(cards.length / 2)];
	};

	const addCardsToPlayers = async()=>{
		const cards=await requestCards(20);
		handleCardsPlayers(cards);
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
	};

	const selectCard=(indexCardSelected,player=null,flag=false)=>{
		if(flag){
			if(player==1){
				handleCardsPlayers(null,player,indexCardSelected);
			}else{
				handleCardsPlayers(null,player,indexCardSelected);
			}
		}
	}

	const validateTerna = (cards) => {
		const numberCards = cards.filter((card)=>numbers.includes(card.value)).sort((a,b)=>a.value-b.value)
		const uniqueCards=new Set([...numberCards.map(({value})=>value)]);
		let isWinner=false;
		uniqueCards.forEach((card)=>{
			if(numberCards.filter(cardNumber=>card==cardNumber.value).length>=3){
				isWinner=true;
			}
		});
		return isWinner;
	};
	const validateCuarta = (cards) => false;
	const validateEscalera = (cards) => false;

	const validateBaraja = (cards) => {
		return validateTerna(cards) || validateCuarta (cards) || validateEscalera(cards);
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
				setacceptedCard
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export default GameProvider;
