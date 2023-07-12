'use client'

import { useState } from 'react'

export default function Client() {
  const [name, setName] = useState('')

  return (
    <>
      <p>
        Store Name is {name}
      </p>
      <input
        placeholder="Store Name"
        onChange={(e) => setName(e.target.value)}
      />
    </>
  )
}
