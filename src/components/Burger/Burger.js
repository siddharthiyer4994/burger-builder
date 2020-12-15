import React from 'react';
import {withRouter} from 'react-router-dom';

import classes from './Burger.css';
import BurgerIngridient from './BurgerIngridient/BurgerIngredient';

const burger =(props) => {
    console.log(props);
    let transformedIngridients = Object.keys(props.ingredients)
    .map(igKey => {
        //console.log([...Array(props.ingredients[igKey])]);
         return [...Array(props.ingredients[igKey])]
         .map( (_,index) => (
             //console.log(index);
             <BurgerIngridient key={igKey+index} type={igKey} />
         ))
    })
    .reduce( (arr, el) => {
        // console.log('arr:',arr);
        // console.log('el:',el);
        return arr.concat(el)
    },[] );

    if(transformedIngridients.length === 0){
        transformedIngridients = <p>Please enter some ingredients</p>;
    }
          // console.log(transformedIngridients);
    return(
        <div className={classes.Burger}>
            <BurgerIngridient type="bread-top" />
            {transformedIngridients}
            <BurgerIngridient type="bread-bottom" />
        </div>
    );
};

export default withRouter(burger);