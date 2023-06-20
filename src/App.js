import React, { useState } from 'react';
import SingleColor from './SingleColor';
import { SliderPicker } from 'react-color';
import Values from 'values.js';


function App() {
  const [currentColor, setCurrentColor] = useState('#ac25f1')
  const [color, setColor] = useState('')
  const [error, setError] = useState(false)
  const [list, setList] = useState(new Values('#ac25f1').all(10))

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      let colors = new Values(color).all(10)
      setList(colors)
    } catch (error) {
      setError(true)
      console.log(error)
    }
  }

  const handleChangeComplete = (color) => {
    setCurrentColor(color);
  };

  const setcolor = {
    backgroundColor: `${currentColor.hex}`,
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    borderColor: 'transparent',
    borderTopRightRadius: 'var(--radius)',
    borderBottomRightRadius: 'var(--radius)',
    textTransform: 'capitalize',
    color: 'var(--clr-white)',
    cursor: 'pointer',
    marginLeft: '6px',
  }
  return (
    <>
      <section className='container'>
        <h3>color generator</h3>
        <form onSubmit={handleSubmit}>

          <input
            type='text'
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder='#ac25f1'
            className={`${error ? 'error' : null}`}
          />
          <button className='btn' type='search'>
            submit
          </button>
          <button className='setColor' style={setcolor} onClick={(f) => (setColor(currentColor.hex))}>set color</button>
        </form>

      </section>
      <SliderPicker
        color={currentColor}
        onChangeComplete={handleChangeComplete}
      />
      <section className='colors'>
        {list.map((color, index) => {
          return (
            <SingleColor
              key={index}
              {...color}
              index={index}
              hexColor={color.hex}
            />
          )
        })}
      </section>
    </>
  )
}

export default App;
