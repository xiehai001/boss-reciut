import React from 'react';
import ReactDom from 'react-dom';
import thunk from 'redux-thunk'
import { Provider} from 'react-redux'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import { createStore ,applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import reducers from './reducer'
import './config'
import './index.css'

import Login from './container/login/login';
import Register from './container/register/register';
import AuthRoute from './component/authroute/authroute';
import BossInfo from './container/bossinfo/bossinfo';
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashborad/dashborad'

//处理redux 谷歌调试插件
const composeEnhancers = composeWithDevTools({
    // options like actionSanitizer, stateSanitizer
});
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunk)
));
// boss genius me msg 4个页面
ReactDom.render(
    (<Provider store={store} >
        <BrowserRouter>
            <div>
                <AuthRoute/>
                <Switch>
                    <Route path='/bossinfo' component={BossInfo}/>
                    <Route path='/geniusinfo' component={GeniusInfo}/>
                    <Route path='/login' exact component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route component={Dashboard}/>
                </Switch>

            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);



