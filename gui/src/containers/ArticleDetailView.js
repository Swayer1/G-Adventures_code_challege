import { Table, Card } from 'antd';
import React from 'react';
import axios from 'axios';
import CustomForm from '../components/Form';

class ArticleDetailView extends React.Component {

  state = {
    article: [],
    services: [],
  }

  componentDidMount(){
    const articleID = this.props.match.params.articleID;
    axios.get(`http://127.0.0.1:8000/api/${articleID}`)
      .then(res => {
        this.setState({
          article: res.data,
          services: res.data.services,
        });
      })
  }

  render() {
    const columns = [
        {
          title: 'Type',
          dataIndex: 'type',
        },
        {
          title: 'Name',
          dataIndex: 'Name',
        },
        {
          title: 'Location',
          dataIndex: 'Location',
        },
        {
          title: 'Check in',
          dataIndex: 'check_in',
        },
        {
          title: 'Check out',
          dataIndex: 'check_out',
        },
        {
          title: 'Cost',
          dataIndex: 'cost',
        },
      ];
    const data = this.state.services.map(service=>(
        {
            key:service.id,
            type:service.type,
            Name:service.name,
            Location:service.location,
            check_in:service.accomodation_check_in,
            check_out:service.accomodation_check_out,
            cost:service.cost,
        }
    ));
    return (
        <div>
            <Table columns={columns} dataSource={data} size="middle" />
            <span>
                <Card title={`Total cost : ${this.state.article.cost}`} bordered={false} style={{ width: 300 }}></Card>                
                <CustomForm tripID={this.props.match.params.articleID} OldCost={this.state.article.cost}/>
            </span>
        </div>
    )
  }
}

export default ArticleDetailView;
