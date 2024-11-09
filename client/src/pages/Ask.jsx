
import { useState, useEffect } from 'react'
import useWebSocket from 'react-use-websocket'
import { Button } from "@/components/ui/button"

const WS_URL = 'ws://localhost:8000'

export default function WebSocketTriggerPage() {
  const [timeLeft, setTimeLeft] = useState(0) // Timer starts from 0
  const [isRunning, setIsRunning] = useState(false)

  const { sendMessage } = useWebSocket(WS_URL, {
    onOpen: () => console.log('WebSocket Connected'),
    shouldReconnect: () => true,
  })

  const startCountdown = () => {
    setTimeLeft(60) // Start 60-second timer
    setIsRunning(true)
    sendMessage('{"type":"trigger"}') // Send trigger message
  }

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000)
      return () => clearTimeout(timerId)
    } else if (timeLeft === 0) {
      setIsRunning(false) // Stop countdown when timer hits 0
    }
  }, [isRunning, timeLeft])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">WebSocket Trigger with Countdown</h1>
      <Button
        onClick={startCountdown}
        disabled={isRunning}
        className="mb-4"
      >
        {isRunning ? `Wait (${timeLeft}s)` : 'Send Trigger Message'}
      </Button>
      <p className="text-gray-600">
        {isRunning
          ? 'Message sent, waiting for 60 seconds...'
          : 'Press the button to send a WebSocket message.'}
      </p>
    </div>
  )
}
