import React, { useEffect, useState } from "react";
import { Modal, Radio, Form, Input, Row, Col, Checkbox, Button, Select } from 'antd';
import styles from '@/assets/css/style.less';

const FormItem = Form.Item;
const { Search } = Input
const {Option} = Select

function ModifyModal(props){
    const { modalType, isVisible, closeModal } = props;
    const [ modalTitle, setModalTitle ] = useState('');
    
    const handleSubmit = () => {

    }
    useEffect(() => {
        if(modalType === 'add'){
            setModalTitle('New Reserve')
        }else{
            setModalTitle('Edit Reserve')
        }
    }, [modalType])

    return (
        <Modal
            title={ modalTitle }
            visible={ isVisible }
            onCancel={ closeModal }
            okText={ 'Submit' }
            onOk={handleSubmit}
            width={700}
            className={styles.formlabelcss}
        >
            <Form>
                <FormItem label="Merchant's Citcon MID">
                    <Search placeholder="Please enter merchant's citcon MID"></Search>
                </FormItem>
                <Row gutter={24}>
                    <Col span={12}>
                        <FormItem label="Merchant Name" >
                            <Input disabled />  
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="Settlement Currency">
                            <Input disabled />  
                        </FormItem>
                    </Col>
                </Row>
                <Checkbox className={styles.exportTit} style={{fontSize: 22}}>
                    Fixed Reserve:
                </Checkbox>
                <Row gutter={24}>
                    <Col span={8}>
                        <FormItem label="Amount">
                            <Input placeholder="Amount" />  
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="Due Date">
                            <Input placeholder="Date" />  
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="Release Date">
                            <Input placeholder="Date" />  
                        </FormItem>
                    </Col>
                </Row>
                <div className={styles.exportTit} style={{paddingTop: 10}}>How to Charge</div>
                <Row>
                    <Radio.Group style={{marginBottom: 20, marginLeft: 20}}>
                        <div style={{marginBottom: 10}}>
                            <Radio value={1}>Deduct it from settlemen</Radio>
                        </div>
                        <div style={{marginBottom: 10}}>
                            <Radio value={2} disabled>ACH Debit</Radio>
                        </div>
                        <div>
                            <Radio value={3}>Invoice</Radio>
                            {modalType !== 'add' &&  <Select style={{ width: 120, }} placeholder="Select">
                                <Option value="A">paid</Option>
                                <Option value="B" disabled>released</Option>
                            </Select>}
                        </div>
                    </Radio.Group>  
                </Row>
                <Button type='primary' icon='plus'>Add fixed Reserve</Button>
                <div style={{marginTop: 30}}>
                    <Checkbox className={styles.exportTit} style={{fontSize: 22}}>
                        Rolling Reserve:
                    </Checkbox>
                </div>
                <Row gutter={24}>
                    <Col span={8}>
                        <FormItem label="% of Daily Settlement">
                            <Input  placeholder="Amount" />  
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="Start Date">
                            <Input placeholder="Date" />  
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="# of Rolling Days">
                            <Input placeholder="Date" />  
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={8}>
                        <FormItem label="End Date">
                            <Input  placeholder="Date" />  
                        </FormItem>
                    </Col>
                </Row>
            </Form>

        </Modal>
    )
}

export default ModifyModal;