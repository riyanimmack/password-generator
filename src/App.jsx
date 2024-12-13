import { useState, useCallback, useEffect, useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(10)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed){
      str = str + "0123456789"
    }
    if(charAllowed){
      str = str + "!@#$%^&*() _+"
    }

    for(let i = 1; i< length; i++){
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed, ])

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current.select()
  }

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, charAllowed])

  return (
    <div className="flex items-center justify-center h-screen bg-gray-500">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800">
        <h1 className="text-white text-center my-3 text-3xl">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} className="outline-none w-full py-1 px-3" placeholder="password"
          readOnly ref={passwordRef}/>
          <button onClick={copyToClipboard} className="outline-none bg-blue-700 text-white px-3 py- 0.5 shrink-0">Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range" min={10} max={40} value={length} className="cursor-pointer" 
            onChange={(e) => setLength(e.target.value)} />
            <label htmlFor="length" className="text-white">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev)
            }}/>
            <label htmlFor="number" className="text-white">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={numberAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }}/>
            <label htmlFor="character" className="text-white">Characters</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
