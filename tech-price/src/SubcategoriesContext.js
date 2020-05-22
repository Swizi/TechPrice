import React from 'react';

const SubcategoriesContext = React.createContext({
  subcategories: {
    header: '',
    array: []
  },
  editSubcategories: () => {}
});

export const SubcategoriesProvider = SubcategoriesContext.Provider
export const SubcategoriesConsumer = SubcategoriesContext.Consumer

export default SubcategoriesContext