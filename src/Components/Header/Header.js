import React from 'react'
import './Header.css'
import { useRef } from 'react'
import { useEffect } from 'react'
function Header(props) {
  let resultref = useRef()
  // useEffect(()=>{
  //   // resultref.current.scrollintoview()
  //   // resultref.current.scrollIntoView()
  // },[])
  return (
    <div className='header custom-scroll'>
      <div className='header_history'>
        {/* { props.history &&
        props.history ? map((item)=> (
        <p key={item + "" + Math.random()*44}>{item}</p>
        ))
       } */}
        {
          props.History &&
          props.History?.map((item) => (
            <p key={item + "" + Math.random() * 44}>{item}</p>
          ))}

      </div>
      <br />
      <div className='header_expression custom-scroll'>
        <p>{props.expression}</p>
      </div>
      <p ref={resultref} className='header_result'>{props.result}</p>
    </div>
  )
}

export default Header
