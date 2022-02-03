import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { Dialog } from '@headlessui/react'
import { Inputs } from './Types'

function Lists() {
  const [productList, setProductList] = useState<Inputs[]>([])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const { ref, onChange, name } = register('product')
  const [isOpen, setIsOpen] = useState(true)
  // console.log(register('product'), onChange)

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log('data', data)
    const newList: Inputs = {
      id: uuidv4(),
      product: data.product,
      archive: false,
      concerns: ['acne'],
    }
    setProductList([newList, ...productList])
    // console.log('data', data, productList);
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" id="product" name={name} onChange={onChange} ref={ref} />

        {errors.product && <span>This Field is required</span>}

        <button type="submit">ADD</button>
      </form>
      <hr />
      <ul>
        {productList &&
          productList.map((el) => (
            <li key={el.id}>
              {el.product}
              <button type="button" onClick={openModal}>
                dit
              </button>
              <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <Dialog.Overlay />

                <Dialog.Title>Edit</Dialog.Title>
                {/* <Dialog.Description>This will permanently deactivate your account</Dialog.Description> */}

                <form onSubmit={handleSubmit(onSubmit)}>
                  <input type="text" id="product" name={name} onChange={onChange} ref={ref} value={el.product} />

                  {errors.product && <span>This Field is required</span>}

                  <button type="submit" onClick={() => setIsOpen(false)}>
                    EDIT
                  </button>
                </form>

                {/* <button type="button" onClick={() => setIsOpen(false)}>Deactivate</button> */}
                {/* <button type="button" onClick={() => setIsOpen(false)}>Cancel</button> */}
              </Dialog>
              <button type="button">delete</button>
            </li>
          ))}
      </ul>
    </>
  )
}

export default Lists
