// Create a dynamic OG image route if needed
// app/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Heavenly Panda - Strategy meets creative power'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#14110F',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}>
          <img
            src="https://heavenlypanda.com/heavenly-logo2.jpeg"
            alt="Heavenly Panda Logo"
            width={120}
            height={120}
          />
          <h1 style={{
            fontSize: '60px',
            fontWeight: 'bold',
            color: '#F3ECDD',
            fontFamily: 'sans-serif',
          }}>
            Heavenly Panda
          </h1>
        </div>
        <p style={{
          fontSize: '30px',
          color: '#D4A84B',
          marginTop: '20px',
          fontFamily: 'sans-serif',
        }}>
          Strategy meets creative power
        </p>
      </div>
    ),
    {
      ...size,
    }
  )
}