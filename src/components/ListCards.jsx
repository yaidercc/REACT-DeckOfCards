import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useGame from '../hooks/useGame';
import { BsFillXCircleFill, BsFillCheckCircleFill } from 'react-icons/bs';
const ListCards = () => {
	const {
		playerOne,
		playerTwo,
		newCard,
		selectCard,
		setNewCard,
		acceptedCard,
		setacceptedCard,
		turn,
		setTurn,
	} = useGame();

	// const handlewNewCard = (player, flag, playerName) => {
	// 	if (turn[player] > 0) {
	// 		if (flag) {
	// 			setacceptedCard({ ...acceptedCard, [player]: true });
	// 		} else {
	// 			setNewCard({
	// 				...newCard,
	// 				[player]: {},
	// 			});
	// 			setacceptedCard({ ...acceptedCard, [player]: false });
	// 		}
	// 		setTurn({
	// 			...turn,
	// 			[player]: turn[player] - 1,
	// 		});
	// 	}else{
	// 		alert(`No hay turnos disponibles para el jugador: ${playerName}`)
	// 	}
	// };
	return (
		<>
			<Container>
				<Row>
					<Col xs={2}>
						<h4 className='text-center'> Cards Player {playerOne.name}</h4>
						<Row>
							<h5 className='text-center'> Turnos: {turn.playerOne}</h5>
							<div className='text-center'>
								<img
									src={newCard.playerOne[0]?.image}
									alt={newCard.playerOne[0]?.value}
									height={200}
								/>
							</div>
						</Row>
					</Col>
					<Col>
						<div className='align-items-center my-2'>
							<h4 className='text-center'>Player {playerOne.name}</h4>
							<p className='text-center'>Cards obtained</p>
							<div className='justify-content-md-center'>
								{playerOne.cards.map((card, index) => (
									<img
										className='col-sm-4 col-lg-3 mx-2 my-2 '
										src={card.image}
										alt={card.value}
										key={index}
										onClick={() => selectCard(index, 1, acceptedCard.playerOne)}
									/>
								))}
							</div>
						</div>
					</Col>
					<Col>
						<div
							className='align-items-center my-2'
							style={{ position: 'relative' }}
						>
							<h4 className='text-center'>Player {playerTwo.name}</h4>
							<p className='text-center'>Cards obtained</p>
							<div className='justify-content-center'>
								{playerTwo.cards.map((card, index) => (
									<img
										className='col-sm-4 col-lg-3 mx-2 my-2'
										key={index}
										src={card.image}
										alt={card.value}
										onClick={() => selectCard(index, 2, acceptedCard.playerTwo)}
									/>
								))}
							</div>
						</div>
					</Col>
					<Col xs={2}>
						<h4 className='text-center'>Cards Player {playerTwo.name}</h4>
						<Row>
							<h5 className='text-center'> Turnos: {turn.playerTwo}</h5>
							<div className='text-center'>
								<img
									src={newCard.playerTwo[0]?.image}
									alt={newCard.playerTwo[0]?.value}
									height={200}
								/>
							</div>
						</Row>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default ListCards;
