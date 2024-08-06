'use client'
import React from 'react'
import FirstScreen from './components/first-screen'
import SecondScreen from './components/second-screen'
import ThirdScreen from './components/third-screen'
import LastScreen from './components/last-screen'

export default function MainPage() {
  return (
    <div>
      <FirstScreen />
      <SecondScreen />
      <ThirdScreen />
      <LastScreen />
    </div>
  )
}
