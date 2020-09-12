import React from 'react'

const ItemContext = React.createContext({
  item: {},
  setItem: () => {}
});

export const ItemProvider = ItemContext.Provider
export const ItemConsumer = ItemContext.Consumer

export default ItemContext