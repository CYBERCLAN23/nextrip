import { useState, useEffect, useRef } from "react"
import { Navbar } from "./Navbar"

const VIDEO_SOURCES = [
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_030107_874273ea-684a-4e90-bb96-8fdfde48d53d.mp4",
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_032424_3c9c2a9d-807b-4482-80e6-dd6d9dfd4545.mp4",
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260627_094019_4214ea73-b963-46a4-8327-61489192de99.mp4",
]

const switchLabels = [
  "01 / WATER WAVE",
  "02 / GRIDWAVE",
  "03 / LIGHT TUNNEL",
]

const heroParagraph = "I craft bold brands and modern websites with purpose. From strategy to launch, I build digital experiences that connect, convert, and leave a lasting impression."

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [blobUrls, setBlobUrls] = useState<string[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const loadVideos = async () => {
      const urls: string[] = []
      for (const src of VIDEO_SOURCES) {
        try {
          const response = await fetch(src)
          const blob = await response.blob()
          urls.push(URL.createObjectURL(blob))
        } catch {
          urls.push(src)
        }
      }
      setBlobUrls(urls)
    }
    loadVideos()
    return () => {
      blobUrls.forEach(url => URL.revokeObjectURL(url))
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    return () => observer.disconnect()
  }, [])

  const handleSwitchClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-black overflow-hidden"
      aria-label="Hero"
    >
      <div className="absolute inset-0 z-0">
        {VIDEO_SOURCES.map((_, i) => (
          <video
            key={i}
            className="video-crossfade"
            src={blobUrls[i] || VIDEO_SOURCES[i]}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            preload="auto"
          />
        ))}
        <div className="absolute inset-0 bg-black/10 z-[1]" />
      </div>

      <Navbar />

      <div
        className="relative z-[2] flex flex-col justify-end items-end gap-[150px] pt-[190px] px-[15px] min-h-screen"
        style={{ maxWidth: "1340px", margin: "0 auto", width: "100%" }}
      >
        <div className="w-full flex items-start justify-between gap-8 mobile:flex-col mobile:gap-7">
          <div className="flex-[4] flex items-center gap-3">
            {switchLabels.map((label, i) => (
              <button
                key={label}
                onClick={() => handleSwitchClick(i)}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm leading-5 tracking-[-0.12px] font-medium text-white transition-opacity role-link ${i === activeIndex ? "opacity-100" : "opacity-55 hover:opacity-75"}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex-1 flex items-center justify-end">
            <div className="flex items-center gap-2">
              <span
                className={`w-[7px] h-[7px] rounded-full animate-dot-pulse ${activeIndex === 0 ? "bg-[#F598F2] shadow-[0_0_12px_4px_rgba(245,152,242,0.6)]" : "bg-white shadow-[0_0_12px_4px_rgba(255,255,255,0.4)]"}`}
              />
              <span className="text-sm leading-5 tracking-[-0.12px] font-medium text-white">
                Available for work
              </span>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col mobile:flex-col items-end gap-[28px] pb-[60px] mobile:gap-8 mobile:pb-11">
          <div className="flex-[2] mobile:w-full">
            <span
              className={`block text-[200px] leading-[81%] tracking-[-6px] font-medium uppercase animate-reveal-up ${activeIndex === 0 ? "text-[#F598F2]" : "text-white"}`}
              style={{ animationDelay: "0ms" }}
            >
              Viktor.
            </span>
          </div>

          <div className="flex-1 flex flex-col items-end gap-3 pl-[50px] mobile:pl-0 mobile:w-full mobile:items-start mobile:max-w-[420px]">
            <p className="text-base leading-6 tracking-[-0.16px] font-medium text-white opacity-80 animate-reveal-right" style={{ animationDelay: "80ms" }}>
              {heroParagraph}
            </p>
            <button
              className="relative inline-flex items-center justify-center px-6 py-3 text-sm leading-5 tracking-[-0.12px] font-medium text-white border border-white rounded-full lowercase hover:border-transparent transition-colors group animate-reveal-right"
              style={{ animationDelay: "160ms" }}
            >
              <span className="relative z-10">start a project</span>
              <span
                className="absolute inset-0 bg-[#F598F2] rounded-full translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .role-link:hover {
          transform: translateX(4px);
        }
        .nav-link-underline {
          position: relative;
        }
        .nav-link-underline::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 1px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }
        .nav-link-underline:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
      `}</style>
    </section>
  )
}