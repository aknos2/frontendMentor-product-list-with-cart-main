import { useState } from 'react'
import data from '../data.json'
import addToCart from '/assets/images/icon-add-to-cart.svg'
import emptyCart from '/assets/images/illustration-empty-cart.svg'
import plusIcon from '/assets/images/icon-increment-quantity.svg'
import minusIcon from '/assets/images/icon-decrement-quantity.svg'
import deleteIcon from '/assets/images/icon-remove-item.svg'
import treeIcon from '/assets/images/icon-carbon-neutral.svg'
import { ConfirmOrder } from './ConfirmOrder'

function App() {
  const [cartItem, setCartItem] = useState([]);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const totalPrice = cartItem.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleAddToCart = (item) => {
    setCartItem(prev => {
      const exists = prev.find((i) => i.name === item.name);

      if (exists) {
        return prev.map((i) => 
          i.name === item.name 
            ? {...i, quantity: i.quantity + 1}
            : i
        );
      }

      return [...prev, {...item, quantity: 1}]
    })
  }

  const deleteItem = (item) => {
    setCartItem(prev => {
      const exists = prev.find((i) => i.name === item.name);

      if (exists.quantity === 1) {
        return prev.filter(i => i.name !== item.name);
      }

      return prev.map((i) => 
        i.name === item.name 
          ? {...i, quantity: i.quantity - 1}
          : i
      );
    })
  }

  const deleteAllItems = (item) => {
    setCartItem(prev => prev.filter(i => i.name !== item.name))
  }

  const confirmOrder = (e) => {
    e.preventDefault;

    if (!orderConfirmed) {
      setOrderConfirmed(true)
    } else {
      setOrderConfirmed(false)
      setCartItem([]);
    }
  }

  return (
    <>
    <div className="max-w-[375px] lg:max-w-[1440px] bg-rose-50 m-auto px-5 py-7 lg:p-20">
      <h1 className='text-5xl font-bold mb-10 lg:text-4xl'>Desserts</h1>

        <section className='lg:grid lg:grid-cols-[2fr_1fr] gap-10'>
          <div className='lg:grid lg:grid-cols-3 gap-5'>
            {data.map((item, index) => {
              const cartQuantity = cartItem.find((i) => i.name === item.name)?.quantity || 0;

              return (
                <div key={index}>
                  <div className='relative mb-7'>
                    <picture>
                      <source srcSet={item.image.mobile} media="(max-width: 639px)"/>
                      <source srcSet={item.image.tablet} media="(min-width: 640px) and (max-width: 1023px)"/>
                      <source srcSet={item.image.desktop} media="(min-width: 1024px)"/>
                      <img src={item.image.desktop} alt={item.name} 
                      className='rounded-2xl'/>
                    </picture>

                    <div>
                      {cartQuantity === 0 ? (
                        <button className='absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-4 flex justify-center items-center gap-2
                                          bg-white py-2 px-5 border-[0.5px] rounded-full font-semibold lg:w-[80%]'
                                onClick={() => handleAddToCart(item)} >
                          <img src={addToCart} alt="add to cart"/>
                          Add to Cart
                        </button>
                      ) : (
                        <div className='absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-4 flex justify-around items-center gap-2
                                          bg-[hsl(14,86%,42%)] py-2 px-0 rounded-full font-semibold w-38 text-white border-0'
                                >
                                  <button className='border grid h-5 w-5 rounded-full place-content-center'
                                          onClick={() => deleteItem(item)}>
                                    <img src={minusIcon} alt='minus'></img>
                                  </button>
                                  {cartQuantity}
                                  <button className='border grid h-5 w-5 rounded-full place-content-center'
                                          onClick={() => handleAddToCart(item)}>
                                    <img src={plusIcon} alt='plus'></img>
                                  </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='mb-7'>
                    <p className='text-black/50'>{item.category}</p>
                    <h3 className='text-[16px] font-bold'>{item.name}</h3>
                    <p className='font-semibold text-[hsl(14,86%,42%)]'><span>$</span>{`${(item.price).toFixed(2)}`}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className='flex flex-col items-center gap-4 bg-white rounded-xl pt-7 pb-7 lg:h-fit lg:-translate-y-15'>
            <h2 className='self-start text-3xl pl-5 text-[hsl(14,86%,42%)] font-semibold'>Your cart ({cartItem.reduce((sum, item) => sum + item.quantity, 0)})</h2>
            {cartItem.length === 0 ? (
              <div className='flex flex-col gap-2'>
                <img src={emptyCart} alt="empty cart" className='m-auto'/>
                <p className='lg:text-sm'>Your added items will appear here</p>
              </div>
            ) : (
                cartItem.map((item, index) => (
                  <div key={index} className='flex flex-col items-left w-full px-5 text-sm'>
                    <h3 className='font-semibold mb-1 text-[hsl(14,65%,9%)]'>{item.name}</h3>
                    <div className='flex gap-2 items-center mb-3 relative'>
                      <span className='min-w-5 font-semibold text-[hsl(14,86%,42%)]'>{item.quantity}x</span>
                      <span className='min-w-17 text-[hsl(7,20%,60%)]'><small>@</small>${item.price.toFixed(2)}</span>
                      <span className='font-semibold text-[hsl(12,20%,44%)]'>${(item.quantity * parseFloat(item.price)).toFixed(2)}</span>
  
                      <button className='border border-[hsl(7,20%,60%)] w-fit p-[0.1rem] rounded-full grid place-content-center
                                      absolute right-2 -top-2'
                              onClick={() => deleteAllItems(item)}
                              >
                        <img src={deleteIcon} alt="delete"/>
                      </button>
                    </div>
                    <hr className='text-black/20'/>
                  </div>
                ))
            )}
            {cartItem.length > 0 && (
              <>
                <div className='flex justify-around items-center w-full py-1'>
                  <p>Order total</p>
                  <p className='text-2xl font-bold'>${totalPrice.toFixed(2)}</p>
                </div>

                <div className='flex bg-[hsl(13,31%,94%)] p-3 mb-2'>
                  <img src={treeIcon} alt="tree" />
                  <p className='text-sm'>This is a <span className='font-semibold'>carbon neutral</span> delivery</p>
                </div>

                <button className='bg-[hsl(14,86%,42%)] w-full p-3 max-w-[80%] rounded-full text-white font-semibold'
                        onClick={confirmOrder}>
                  Confirm order
                </button>
              </>
            )}
          </div>
      </section>
    </div>     

      <ConfirmOrder cart={cartItem} totalPrice={totalPrice} confirmOrder={confirmOrder} isOpen={orderConfirmed}/>
   
    </>
  )
}

export default App
