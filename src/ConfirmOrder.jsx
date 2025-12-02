import confirmedIcon from '/assets/images/icon-order-confirmed.svg'

export function ConfirmOrder({cart, totalPrice, confirmOrder, isOpen}) {
  return (
    <>
      {isOpen && <style>{`body { overflow: hidden; }`}</style>}
      <div className={`fixed inset-0 bg-black/50 transition-opacity duration-500 
                        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`flex flex-col bg-white pb-6 pt-8 rounded-t-xl w-full fixed bottom-0 max-h-[90vh] overflow-y-auto
                        transition-transform  ease-in-out duration-600 ${isOpen ? 'translate-y-0' : 'translate-y-full pointer-events-none'}
                        lg:w-[40%] lg:h-[70vh] lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-xl lg:overflow-hidden lg:p-8`}>
          <div className='flex flex-col gap-2 mx-5 mb-7'>
            <img src={confirmedIcon} alt="confirmed" className='w-10' />
            <h1 className='font-bold text-4xl'>
              <span className='block lg:inline lg:mr-2'>Order</span>
              <span className='block lg:inline'>Confirmed</span>
            </h1>
            <p className='text-[hsl(7,20%,60%)] text-sm'>We hope you enjoy your food!</p>
          </div>
          
          <div className='lg:overflow-y-auto'>
            {cart.map((item, index) => (
                <div key={index}
                    className={`relative p-5 mx-5 bg-rose-50 flex h-auto items-center ${index === 0 ? 'rounded-t-xl' : ''} 
                    before:content-[''] before:absolute before:bottom-0
                    before:left-1/2 before:-translate-x-1/2
                    before:w-70 before:h-[0.5px] before:bg-black`}>
                  <div className='w-full'> 
                    <img src={item.image.thumbnail} alt="thumbnail" className='rounded-md'/>
                  </div>

                  <div className='flex flex-col items-left truncate px-5 text-sm w-200'>
                    <h3 className='font-semibold mb-1 text-[hsl(14,65%,9%)] truncate'>{item.name}</h3>
                    <div className='flex gap-2 items-center'>
                      <span className='min-w-5 font-semibold text-[hsl(14,86%,42%)]'>{item.quantity}x</span>
                      <span className='min-w-17 text-[hsl(7,20%,60%)]'><small>@</small>${item.price.toFixed(2)}</span>
                    </div>
                  </div>

                  <div>
                    <span className='font-semibold text-[15px]'>${(item.quantity * parseFloat(item.price)).toFixed(2)}</span>
                  </div>
                </div>
              ))}
          </div>

          <div className='flex justify-around items-center py-5 bg-rose-50 mx-5 mb-7 rounded-b-xl'>
                <p>Order total</p>
                <p className='text-2xl font-bold'>${totalPrice.toFixed(2)}</p>
          </div>
          
          <button className='bg-[hsl(14,86%,42%)] w-full p-3 max-w-[80%] rounded-full text-white font-semibold m-auto'
                  onClick={confirmOrder}>
            Start New Order
          </button>
        </div>
      </div>
    </>
  )
}