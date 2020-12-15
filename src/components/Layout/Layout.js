import React,{Component} from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from  '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class layout extends Component {

    state ={
        showSideDrawer:false
    };
    
    sideDrawerHandler = () => {
     this.setState({showSideDrawer:false});
     console.log('asda');
    }

    sideDrawerToggle = (prevState) => {
        this.setState({showSideDrawer : !prevState.showSideDrawer});
    }

    render(){
        return(
            <Aux>
                <Toolbar toggleSideDrawer={this.sideDrawerToggle} />
                <SideDrawer
                open={this.state.showSideDrawer} 
                closed={this.sideDrawerHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}
export default layout;