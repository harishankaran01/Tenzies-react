import React from 'react'

export default function Dice(props) {
  let back={
    backgroundColor: props.item.selected ?  "#59E391" : "#fff281"
  }
  return (
  
       <div id='dice' style={back} onClick={()=>props.selectedDice(props.item.id)} >{props.item.value}</div>
    
  )
}
