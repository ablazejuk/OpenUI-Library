import React, { useState } from "react"

const STATES = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
}

function ActionButton({ mode }) {
  const [state, setState] = useState(STATES.IDLE)

  const redirectUrl =
    mode === "success"
      ? "https://google.com"
      : "https://invalid-url-example.test"

  const handleClick = async () => {
    setState(STATES.LOADING)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))

      if (mode === "failure") throw new Error("Simulated failure")

      setState(STATES.SUCCESS)
      setTimeout(() => {
        if (mode === "success") {
          // Demo: Show what would happen instead of actually redirecting
          console.log(`Demo: Would redirect to ${redirectUrl}`)
          // Reset to idle state after showing redirect message
          setTimeout(() => setState(STATES.IDLE), 2000)
        }
      }, 1500)
    } catch {
      setState(STATES.ERROR)
      setTimeout(() => setState(STATES.IDLE), 3000)
    }
  }

  const renderText = () => {
    switch (state) {
      case STATES.LOADING:
        return "Processing..."
      case STATES.SUCCESS:
        return "Redirecting..."
      case STATES.ERROR:
        return "Error! Try Again"
      default:
        return mode === "success" ? "Simulate Success" : "Simulate Failure"
    }
  }

  const buttonClasses = {
    [STATES.IDLE]:
      mode === "success"
        ? "bg-gradient-to-r from-blue-500 via-indigo-500 to-indigo-600"
        : "bg-gradient-to-r from-blue-500 via-indigo-500 to-indigo-600",
    [STATES.LOADING]:
      "bg-gradient-to-r from-blue-500 via-indigo-500 to-indigo-600 opacity-80",
    [STATES.SUCCESS]:
      "bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500",
    [STATES.ERROR]:
      "bg-gradient-to-r from-red-500 via-rose-600 to-pink-600",
  }

  return (
    <button
      onClick={handleClick}
      disabled={state === STATES.LOADING || state === STATES.SUCCESS}
      className={`px-6 py-3 rounded-xl text-white font-semibold shadow-lg transition-all duration-300 flex items-center gap-2 ${buttonClasses[state]} hover:scale-105`}
    >
      {state === STATES.LOADING && (
        <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
      )}
      {renderText()}
    </button>
  )
}

export default function ActionButtonPreview() {
  return (
    <div className="flex items-center justify-center gap-10 h-80">
      <ActionButton mode="success" />
      <ActionButton mode="failure" />
    </div>
  )
}
