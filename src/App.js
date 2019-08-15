import React, { Component } from 'react';
import './App.css';

import { Input, Row, Col, Typography } from 'antd';

import BarChart from './BarChart';


const { Search } = Input;
const { Title, Paragraph } = Typography;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 200,
      height: 200,
      id: 'barchart',
      data: [1, 2, 5],
      sliderInputValue: 1,
    };
  }

  interpretData(value) {
    // [] or [n] where n > 0
    const emptyRe = /^\[\]$/;
    const reSingle = /^\[^[1-9][0-9]*\]$/;
    const reArr = /^\[([1-9][0-9]*,\s*)+([1-9][0-9]*)*\]$/;
    if (emptyRe.test(value)) {
      // clear error message
      this.setState({data: [], errMsg: ''});
    } else if (reSingle.test(value) || reArr.test(value)) {
      let r = [];
      try {
        r = JSON.parse(value);
        // clear error message
        this.setState({data: r, errMsg: ''});
      } catch(err) {
        this.setState({errMsg: 'Failed to deserialize'});
      }
    } else {
      this.setState({errMsg: 'Unexpected error'});
    }
  }

  render() {
    return (
      <div className='App'>
        <Row>
          <Col span={8}>
          </Col>
          <Col id='CenterCol' span={8}>
            <Title level={2}>
              Interactive D3.js BarChart
            </Title>
            <BarChart
              data={this.state.data}
              width={this.state.width}
              height={this.state.height}
              id={this.state.id}
              widthHandler={e => this.setState({width: e})}
              heightHandler={e => this.setState({height: e})}
              sliderInputValue={this.state.sliderInputValue}
            />
            <Paragraph>
              Data
            </Paragraph>
            <Search
              placeholder="[1, 2, 3]"
              enterButton="Display"
              size="large"
              allowClear
              onSearch={(e) => this.interpretData(e)}
            />
            <Paragraph type="warning">
              {this.state.errMsg}
            </Paragraph>
          </Col>
          <Col span={8}>
          </Col>
        </Row>
      </div>
    );
  }

}

export default App;
