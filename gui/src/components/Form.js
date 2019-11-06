import { Form, Input, Button, Select, DatePicker, InputNumber } from 'antd';
import React from 'react';
import axios from 'axios';

const { RangePicker } = DatePicker;
const doWarn = window.console.warn
window.console.warn = (...args) => {
  if(typeof args[0] !== 'string' || !args[0].startsWith('Warning: componentWillReceiveProps has been renamed'))
    doWarn(...args)
  // Uncomment the following line if you still want a little reminder :
//   else doWarn('Oh, yeah, that warning again.')
}

class CustomForm extends React.Component {

	state = {
		ServiceTypes: [],
		selectType: "",
	}

  constructor(props) {
    super(props);
    axios.get(`http://127.0.0.1:8000/api/${this.props.tripID}/types/`)
    .then(res => {
      this.setState({
        ServiceTypes: res.data,
      });
    })
  }

handleChangeSelect = (value) => {
	this.setState({selectType: value});
}

handleFormSubmit = (event, OldCost, tripID) => {
    this.props.form.validateFields((err, fieldsValue) => {
        if (err) {
            event.preventDefault();
            return;
        }
  
        // Should format date value before submit.
        const rangeValue = fieldsValue['range-picker'];
        const values = {
          ...fieldsValue,
          'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
        };
        const type = this.state.selectType;
        const name = event.target.elements.name.value;
        const location = event.target.elements.location.value;
        const cost = event.target.elements.cost.value;   
        axios.post(`http://127.0.0.1:8000/api/${tripID}/new/`, {
            trip: tripID,
            type: type,
            name: name,
            location: location,
            cost: cost,
            accommodation_check_in: values['range-picker'][0],
            accommodation_check_out: values['range-picker'][1],
        })
        .then(res => console.log(res))
        .catch(error => console.log(error))
        axios.put(`http://127.0.0.1:8000/api/${tripID}/cost/`, {
            cost: parseFloat(cost) + parseFloat(OldCost),
        })
        .then(res => console.log(res))
        .catch(error => console.log(error))
      });
}

		render() {
                const { getFieldDecorator } = this.props.form;
                const rangeConfig = {
                    rules: [{ type: 'array', required: true, message: 'Empty field' }],
                  };
                  const formItemLayout = {
                    labelCol: {
                      xs: { span: 1 },
                      sm: { span: 4 },
                    },
                    wrapperCol: {
                      xs: { span: 1 },
                      sm: { span: 4 },
                    },
                  };
        const { Option } = Select;
        const items = this.state.ServiceTypes.map(function(type){
          return <Option key={type.name} value={type.name}>{type.name}</Option>;
        });
				return (
				<div>
                    <Form {...formItemLayout} onSubmit={(event) => this.handleFormSubmit(event, this.props.OldCost, this.props.tripID)}>
                    <Form.Item label="Type">
                    {getFieldDecorator('type', {
                        rules: [{ required: true, message: 'Please select type.' }],
                        })(
                            <Select onChange={this.handleChangeSelect} name="selectOp" placeholder="Chouse a type">
                              {items}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="Name">
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please give a name.' }],
                        })(<Input name="name" placeholder="input name"/>)}
                    </Form.Item>
                    <Form.Item label="Location">
                    {getFieldDecorator('location', {
                        rules: [{ required: true, message: 'Please enter the address.' }],
                        })(<Input name="location" placeholder="input location" />)}
                    </Form.Item>
                    <Form.Item label="RangePicker">
                        {getFieldDecorator('range-picker', rangeConfig)(<RangePicker />)}
                    </Form.Item>
                    <Form.Item label="Cost">
                    {getFieldDecorator('cost', {
                        rules: [{ required: true, message: 'Empty field' }],
                        })(<InputNumber name="cost"/>)}
                    </Form.Item>
                    <Form.Item  wrapperCol={{
                        xs: { span: 1, offset: 4 },
                        sm: { span: 4, offset: 4 },
                    }}>
                        <Button htmlType="submit" type="primary">Add service</Button>
                    </Form.Item>
                    </Form>
				</div>
				);
		}
}

const WrappedTimeRelatedForm = Form.create()(CustomForm);

export default WrappedTimeRelatedForm;
