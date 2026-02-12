'use client'

export function BuyMeACoffeeButton() {
  return (
    <div className="my-12 flex justify-center">
      <a
        href="https://www.buymeacoffee.com/motyl.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-all hover:scale-105 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, #BD5FFF 0%, #9d3dff 100%)',
          boxShadow: '0 4px 15px rgba(189, 95, 255, 0.3)',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14l4 4V5c0-1.1-.9-2-2-2zm-2 12h-8v-2h8v2zm0-4h-8V9h8v2zm0-4H6V5h12v2z" />
        </svg>
        <span>Buy me a coffee</span>
      </a>
    </div>
  )
}
