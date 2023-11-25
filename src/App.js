import React from 'react';
import { nanoid } from 'nanoid';
import ReactConfetti from 'react-confetti';

import Dice from './components/Dice'

export default function App() {
  let [dice,setDice]=React.useState(initialDice());
  let [count,setCount]=React.useState(0);
  let [final,setFinal]=React.useState(false);
   let[storagevalue,setStoragevalue]=React.useState(0);
  React.useEffect(() => {
        const allHeld = dice.every(die =>  die.selected )
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setFinal(true)
            console.log("You won!")
        }
    }, [dice])

  
React.useEffect(() => {
    setStoragevalue(JSON.parse(localStorage.getItem("roll")));
    
  console.log(storagevalue);

}, []);

  


  function generatedice(){
      return { 
      id:nanoid(),
      value:Math.ceil(Math.random()*6),
      selected:false
    }
  }
  function initialDice(){
    let arr=[];
    for(let i=0;i<10;i++){
      arr.push(generatedice())
  }
    return arr;
  }

  function updateDice(){
    if(!final){
      setCount(prev=> prev+1);
      setDice(prev=>{ 
        return prev.map(item=> item.selected ? item : generatedice() )
      });
    }
    else{
      if(count<storagevalue || storagevalue===undefined || storagevalue ===null){
          localStorage.setItem("roll",JSON.stringify(count));
      }
      
      
      setFinal(false);
      setDice(initialDice());
      setCount(0);
      
    }
   
  }
  let passDice=dice.map(item=> <Dice item={item} key={item.id} selectedDice={selecteddice} />
  )
  function selecteddice(id){
    setDice(oldValue=>{
      return oldValue.map(item=>{
        return item.id===id ? 
        {...item, selected:!item.selected} : 
       item
      }
      )
    }
    )
  }
 
  return (

   <main>
{final && <ReactConfetti/>}
      <h1>TENZIES GAME</h1>
       
      <p>Roll until all dice are same.Click each die to freeze it at its current value between rolls.</p>
    <div id="container"> {passDice}</div>
   <div className='moves'>
    { final ? <h4>You have done within {count} Rolls </h4> : <> <h4>No of rolls</h4>
   <h5>{count}</h5></> }
    
   
   </div>


    <button onClick={updateDice}> {final ?"New Game" :"Roll It"} </button>
   </main>
  )
}
