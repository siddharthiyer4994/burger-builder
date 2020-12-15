import React from 'react';
import classes from './CheckoutSummary.css';
import Button from '../UI/Button/Button';
import Burger from '../Burger/Burger';

const checkoutSummary = (props) => {
    return(
        <div className={classes.CheckoutSummary}>
            <h1>We hope ir tastes well !!</h1>
            <div style={{width:'100%' , margin:'auto'}}>
                    <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
                btnType="Danger" 
                clicked={props.onCheckoutCancelled}>Cancel</Button>
            <Button 
                btnType="Success" 
                clicked={props.onCheckoutContinued}>Continue</Button>
        </div>
    );
}

export default checkoutSummary;