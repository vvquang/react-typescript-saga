import React, { FC, createRef } from 'react'
import { DefaultLayout } from 'Layout'
import { useSelector, useDispatch } from 'react-redux'

import { IStoreState, RootState } from 'Redux/rootReducer'
import { increment, decrement, reset } from 'Redux/Clock/Clock.action'
import { addCount, minusCount } from 'Redux/Counter'
import { actionTypes as CounterActionTypes } from 'Redux/Counter/actionTypes'

import { CLickCouterWrap } from './Home.styled'
import Button from 'Components/Button'

export const incrementAsync = () => ({
  type: CounterActionTypes.INCREMENT_ASYNC,
})

const HomePage: FC = () => {
  const count = useSelector((state: IStoreState) => state.clock.count)

  const dispatch = useDispatch()

  const { clicks } = useSelector((state: RootState) => state.counter)

  const onCounterIncrement = () => {
    dispatch(addCount(1))
  }

  const onCounterDecrement = () => {
    dispatch(minusCount(1))
  }

  const onCounterIncrementAsync = () => dispatch(incrementAsync())

  const buttonRef = createRef()
  const handleClick = () => {
    console.log('handle click btn:', buttonRef.current)
  }

  return (
    <DefaultLayout>
      <div className="home-page">Home page</div>
      <Button disabled>Disable button</Button>

      <Button
        ref={buttonRef}
        onClick={handleClick}
        size="large"
        width={[1, 1 / 2, 1 / 4]}
        theme={{ kind: 'darker' }}
        mt={12}
        m={[0, 1, 2]}
        variant="large"
      >
        Theme button
      </Button>

      <Button theme={{ kind: 'darkest' }}>darker</Button>

      <div>
        <h2>
          Clock Count: <span>{count}</span>
        </h2>
        <button onClick={() => dispatch(increment())}>+1</button>
        <button onClick={() => dispatch(decrement())}>-1</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
      </div>

      <CLickCouterWrap>
        <h2>Click counter:</h2>
        <button onClick={onCounterIncrementAsync} className="button">
          Increment after 1 second
        </button>{' '}
        <button onClick={onCounterIncrement} className="button">
          + Increment
        </button>{' '}
        <button onClick={onCounterDecrement} className="button">
          - Decrement
        </button>
        <hr />
        <div>Clicked: {clicks} times</div>
      </CLickCouterWrap>
    </DefaultLayout>
  )
}

export default HomePage
