"use client"

import { useEffect, useRef } from "react"
import { Textarea } from "@/components/ui/textarea"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  placeholder?: string
  className?: string
}

export default function CodeEditor({
  value,
  onChange,
  language = "typescript",
  placeholder,
  className = "",
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Handle tab key for indentation
  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault()

        const start = textarea.selectionStart
        const end = textarea.selectionEnd

        // Insert tab at cursor position
        const newValue = value.substring(0, start) + "  " + value.substring(end)
        onChange(newValue)

        // Move cursor after the inserted tab
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 2
        }, 0)
      }
    }

    textarea.addEventListener("keydown", handleKeyDown)
    return () => textarea.removeEventListener("keydown", handleKeyDown)
  }, [value, onChange])

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`font-mono bg-background/50 ${className}`}
      style={{
        resize: "vertical",
        minHeight: "200px",
        lineHeight: "1.5",
        tabSize: 2,
      }}
    />
  )
}
