'use client'
import Image from 'next/image'

export default function Home() {

  const request = {
    message: "Tell me about Tax mechanic"
  }

  async function callResponseApi() {
    const response = await fetch('/api/response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify the content type as JSON
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      // Handle specific server error messages if needed
      const errorMessage = await response.text();
      // throw new Error(`Server error: ${errorMessage}`);
      console.error("error aaya hai:",errorMessage)
    }else{
      console.log(response.text())
    }
  }

  return (
    <main className='h-screen w-screen flex justify-center items-center'>
      <button 
        className='px-2 py-1 rounded-lg border-2 border-white text-white text-sm'
        onClick={()=>{
          callResponseApi()
        }}
      >Click here</button>
    </main>
  )
}
