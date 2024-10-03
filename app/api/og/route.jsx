import { ImageResponse } from 'next/og';
// App router includes @vercel/og.
// No need to install it.
 
export async function GET() {
  return new ImageResponse(
    (
      <div
  style={{
    height: '100%',
    width: '100%',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    backgroundColor: 'white',
    backgroundImage: 'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
    backgroundSize: '100px 100px',
  }}
>
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="80pt" 
      height="80pt" 
      viewBox="0 0 256.000000 256.000000"
      preserveAspectRatio="xMidYMid meet"
      style={{ margin: '0 75px' }}
    >
      <g
        transform="translate(0.000000,256.000000) scale(0.100000,-0.100000)"
        fill="#F00" // Updated fill color
        stroke="none"
      >
        <path d="M0 2135 l0 -425 855 0 855 0 0 -430 0 -430 425 0 425 0 0 430 0 430 -425 0 -425 0 0 425 0 425 -855 0 -855 0 0 -425z" />
        <path d="M0 425 l0 -425 430 0 430 0 0 425 0 425 -430 0 -430 0 0 -425z" />
      </g>
    </svg>
  </div>
  <div
    style={{
      display: 'flex',
      fontSize: 40,
      fontStyle: 'normal',
      color: '#F00', // Updated text color
      marginTop: 30,
      lineHeight: 1.8,
      whiteSpace: 'pre-wrap',
    }}
  >
    <b>tiles.run</b>
  </div>
</div>

    ),
    {
      width: 1200,
      height: 630,
    },
  );
}