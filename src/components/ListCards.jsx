import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useGame from '../hooks/useGame';
import { BsFillXCircleFill,BsFillCheckCircleFill } from 'react-icons/bs';
import { ShowNewCard } from './showNewCard';
import { useState } from 'react';
const ListCards = () => {
	const { playerOne, playerTwo, newCard, selectCard,setNewCard,acceptedCard,setacceptedCard } = useGame();
	
	const handlewNewCard=(player,flag)=>{
		if(flag){
			setacceptedCard({...acceptedCard,[player]:true})
		}else{
			setNewCard({
				...newCard,
				[player]:{}
			})
		}
	}
	return (
		<>
			<Container >
				<Row>
					<Col xs={2}>
						<h4 className='text-center'>Cartas {playerOne.name}</h4>
						<Row>
							<h5 className='text-center'>Player 1</h5>
							<div className='text-center'>
								<img
									src={newCard.playerOne[0]?.image}
									alt={newCard.playerOne[0]?.value}
									height={200}
								/>
								{newCard.playerOne[0]?.image && 
									(<>
										<div className='d-flex justify-content-around mt-3'>
											<button className='bg-transparent border none' onClick={()=>handlewNewCard("playerOne",true,newCard.playerOne[0])}>
												<BsFillCheckCircleFill className='fs-3 text-success'/>
											</button>
											<button className='bg-transparent border none' onClick={()=>handlewNewCard("playerOne",false,newCard.playerOne[0])}>
												<BsFillXCircleFill className='fs-3 text-danger'/>
											</button>
										</div>
										{acceptedCard.playerOne &&  <p className='animateText'>Selecciona una carta!</p>}
										</>
									)
								}
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
										className='col-sm-4 col-lg-3 mx-2 my-2'
										src={card.image}
										alt={card.value}
										key={index}
										onClick={() => selectCard(index,1,acceptedCard.playerOne)}
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
										onClick={() => selectCard(index,2,acceptedCard.playerTwo)}
									/>
								))}
							</div>
						</div>
					</Col>
					<Col xs={3}>
						<h4 className='text-center'>{playerTwo.name}</h4>
						<Row>
							<h5 className='text-center'>Player 2</h5>
							<div className='text-center'>
								<img
									src={newCard.playerTwo[0]?.image}
									alt={newCard.playerTwo[0]?.value}
									height={200}
								/>
								{newCard.playerTwo[0]?.image && 
									(
										<>
											<div className='d-flex justify-content-evenly mt-3'>
												<button className='bg-transparent border none' onClick={()=>handlewNewCard("playerTwo",true,newCard.playerTwo[0])}>
													<BsFillCheckCircleFill className='fs-3 text-success'/>
												</button>
												<button className='bg-transparent border none' onClick={()=>handlewNewCard("playerTwo",false,newCard.playerTwo[0])}>
													<BsFillXCircleFill className='fs-3 text-danger'/>
												</button>
											</div>
											{acceptedCard.playerTwo &&  <p className='animateText'>Selecciona una carta!</p>}
										</>
									)
								}
							</div>
						</Row>

						
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default ListCards;
