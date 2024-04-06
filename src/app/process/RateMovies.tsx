import React from 'react'
import { Movies } from '../components/movies'

type Props = {}

export const RateMovies = (props: Props) => {
  return (
    <div className="flex h-full justify-between items-center px-32 gap-20">
      <Movies></Movies>
    </div>
  )
}