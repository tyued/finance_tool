import React, { useCallback, useEffect, useState } from "react";
import { connect } from 'dva';
import { Modal, Radio, Form, Input, Row, Col, Checkbox, Button, Select } from 'antd';
import styles from '@/assets/css/style.less';

const FormItem = Form.Item;
const { Search } = Input
const {Option} = Select

function ModifyModal({ modalType, isVisible, closeModal, dispatch, reserveModel, form }){
    const { getFieldDecorator, resetFields } = form;
    let modalTitle = modalType === 'add'? 'New Reserve' : 'Edit Reserve';
    const [ formData, setFormData ] = useState({
        fixed: false
    });
    const [fixedList, setFixedList] = useState([{aaa:'2222s'}])

    const changeValue = useCallback((event, type) => {
        let value = !event.target ? event : event.target.value;
        if(type === 'id'){
            getMerchantDetail(value)
        }
    }, [getMerchantDetail])

    const getMerchantDetail = async (id) => {
        let res = await dispatch({
            type: 'reserveModel/getMerchantDetail',
            payload: {
                id
            }
        })
        setFormData({
            ...formData,
            ...res,
            fixed: true,
        })
    }
    const clickAddFixed = () => {
        setFixedList([...fixedList, {}])
    }


    const handleSubmit = () => {

    }
    useEffect(() => {
        
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
                    {getFieldDecorator('merchant_id', {
                        initialValue: formData.merchant_id || ''
                    })(
                        <Search placeholder="Please enter merchant's citcon MID" onSearch={(e)=>changeValue(e, 'id')}></Search>
                    )}
                </FormItem>
                <Row gutter={24}>
                    <Col span={12}>
                        <FormItem label="Merchant Name" >
                            {getFieldDecorator('merchant_name', {
                                initialValue: formData.merchant_name || ''
                            })(
                                <Input disabled />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="Settlement Currency">
                            {getFieldDecorator('settlement_currency', {
                                initialValue: formData.settlement_currency || ''
                            })(
                                <Input disabled />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Checkbox className={styles.subTit} style={{fontSize: 22}} checked={formData.fixed}>
                    Fixed Reserve:
                </Checkbox>
                {fixedList.map((item,index) => (
                    <div className={styles.boxliner} key={'fixed'+index}>
                        <Row gutter={24}>
                            <Col span={8}>
                                <FormItem label="Amount">
                                    <Input placeholder="Amount" onChange={(e)=>changeValue(e, 'amount')} />
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
                        <div className={styles.subTit} style={{paddingTop: 10}}>How to Charge</div>
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
                        
                    </div>
                ))}

                
                <Button type='primary' icon='plus' onClick={clickAddFixed}>Add fixed Reserve</Button>
                <div style={{marginTop: 30}}>
                    <Checkbox className={styles.subTit} style={{fontSize: 22}}>
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

function mapStateToProps( data ) {
    const { reserveModel } = data;
    return { reserveModel };
}

export default connect(mapStateToProps)(Form.create()(ModifyModal));