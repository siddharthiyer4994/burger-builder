import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 2.5,
    meat: 4,
    bacon: 5
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error:false
    }

    componentDidMount(){
        console.log(this.props);
        axios.get('/ingredients.json')
        .then(res => {
            this.setState({
                ingredients: res.data
            });
        })
        .catch(error => {
            this.setState({error:true})
        })
    }

    updatePurchaseState (ingredients)  {
       
        const sum = Object.keys(ingredients)
                .map(key => {                   //key sis 'salad','meat' etc
                    return ingredients[key]     //return the count of keys.
                })
                .reduce((sum,el) => {
                    return sum + el;
                } , 0);   // 0 is the initial vaule
            this.setState({purchasable : sum > 0});     //returns true if sum>0

    
            }

    purchaseHandler =() => {
                this.setState({purchasing:true});
            }

    purchaseCancelHandler = () => {
                this.setState({purchasing: false});
            }

    purchaseContinueHandler =() => {
        // //alert('Continue');
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Siddharth Iyer',
        //         address: {
        //             street: 'asdasd ajhyfsdj',
        //             zip: '123678',
        //             country: 'PakIsTunn'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axios.post('/orders.json', order)    //firebase only "add .json"
        //     .then(res => {
        //         this.setState({ loading: false, purchasing:false})
        //     }
        // )
        //     .catch(err => {
        //         this.setState({ loading: false, purchasing:false})
        //     });
        this.props.history.push('/checkout');
    }
    
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        // console.log(updatedIngredients);
        updatedIngredients[type] = updatedCount;
        const priceAdd = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAdd;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
     
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        // console.log(updatedIngredients);
        updatedIngredients[type] = updatedCount;

        const priceDeduct = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduct;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        }
        );
        this.updatePurchaseState(updatedIngredients);
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.state.error ? <p> Ingredients could not be loaded </p> : <Spinner />
        let orderSummary = null;

        if(this.state.ingredients){
            burger=(
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        disableOrderButton={orderButtonDisabled}
                        ordered={this.purchaseHandler}
                />
                </Aux>
            )
            orderSummary =<OrderSummary
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            ingredients={this.state.ingredients} />
        }

       

        if(this.state.loading) {
         orderSummary = <Spinner />;
        }

        let orderButtonDisabled = true;
        const tempIngredients = {...this.state.ingredients};
         for (let i in tempIngredients){
           console.log(tempIngredients[i]);
           if(tempIngredients[i] > 0)
           {
            orderButtonDisabled = false;
            break;
         }
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} 
                        modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
               {burger}

            </Aux>

        );
    }

}

export default withErrorHandler(BurgerBuilder,axios);