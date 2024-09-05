import React from 'react'

export const Notfound = () => {
  return (
    <>
    <div className='justify-center flex  '>
           <img src='https://img.freepik.com/premium-vector/404-error-people-trying-connect-disconnected-wires-from-outlet_773186-1052.jpg?size=626&ext=jpg&ga=GA1.1.1168591914.1718009553&semt=ais_hybrid'  className=' '/>
           
    </div>
     <div className='justify-center flex '>
     <button className='text-blue-500' onClick={() => window.location.href = '/'}>GO back to home page</button>
</div>
</>
   
  )
}
