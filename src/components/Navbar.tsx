import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const navItems = [
  { number: "01", label: "Works" },
  { number: "02", label: "Services" },
  { number: "03", label: "About" },
  { number: "04", label: "Contact" },
]

const email = "Davies@gmail.com"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, "0")
      const minutes = String(now.getMinutes()).padStart(2, "0")
      const seconds = String(now.getSeconds()).padStart(2, "0")
      setTime(`CUP ${hours}:${minutes}:${seconds}`)
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <nav
      className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
      style={{ maxWidth: "1340px", margin: "0 auto", paddingLeft: "15px", paddingRight: "15px" }}
    >
      <div className="flex items-center justify-between py-9 pointer-events-auto">
        <div className="hidden mobile:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.number}
              href={`#${item.label.toLowerCase()}`}
              className="flex items-center gap-2 text-white no-underline nav-link-underline"
            >
              <span className="text-[8px] leading-3 tracking-[-0.08px] font-medium uppercase">{item.number}</span>
              <span className="text-xs leading-4 tracking-[-0.12px] font-medium uppercase">{item.label}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 mobile:hidden mobile:flex-1 mobile:justify-end">
          <span className="text-sm leading-5 tracking-[-0.16px] font-normal text-white opacity-50 hidden mobile:block">
            {email}
          </span>
          <span className="text-sm leading-5 tracking-[-0.16px] font-mono font-normal text-white opacity-50">
            {time}
          </span>
        </div>

        <button
          className="mobile:block hidden p-2 text-white hover:opacity-70 transition-opacity"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div
        className="mobile:grid mobile:grid-rows-[0fr] mobile:transition-all mobile:duration-[420ms] mobile:ease-[cubic-bezier(0.16,1,0.3,1)] mobile:overflow-hidden"
        style={{
          gridTemplateRows: isMobileMenuOpen ? "1fr" : "0fr",
        }}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="mobile:overflow-hidden">
          <div className="mobile:py-8 mobile:px-4 mobile:flex mobile:flex-col mobile:items-start mobile:gap-6">
            {navItems.map((item) => (
              <a
                key={item.number}
                href={`#${item.label.toLowerCase()}`}
                className="text-[28px] leading-8 tracking-[-0.84px] font-medium text-white no-underline hover:opacity-70 transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="mobile:flex mobile:flex-col mobile:gap-3 mobile:pt-6 mobile:border-t mobile:border-white/10 mobile:w-full">
              <span className="text-sm leading-5 tracking-[-0.16px] font-normal text-white opacity-50">
                {email}
              </span>
              <span className="text-sm leading-5 tracking-[-0.16px] font-mono font-normal text-white opacity-50">
                {time}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}