import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SearchBox from './components/searchBox/SearchBox';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./store";
import Result from "./components/result";
import CACHE_LIST from "./components/cacheList/cacheList";
import {Col, Row, Divider} from "antd";

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <Divider>Vocabulary App</Divider>
          <Row justify="space-around" align="middle">
              <Col span={10}>
                  <SearchBox />
                  <Divider />
                  <CACHE_LIST sortMode = "asc"/>
                  <Result/>
              </Col>
          </Row>


      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
