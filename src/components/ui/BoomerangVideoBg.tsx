const BACKGROUND_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4'

export function BoomerangVideoBg() {
  return (
    <video
      aria-hidden="true"
      autoPlay
      className="fixed inset-0 z-0 h-full w-full object-cover"
      loop
      muted
      playsInline
      preload="metadata"
      src={BACKGROUND_VIDEO}
    />
  )
}
