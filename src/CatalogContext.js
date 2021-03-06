import React from 'react'

const CatalogContext = React.createContext({
  searchCatalog: {
    header: '',
    array: []
  },
  editSearchCatalog: () => {}
});

export const CatalogProvider = CatalogContext.Provider
export const CatalogConsumer = CatalogContext.Consumer

export default CatalogContext