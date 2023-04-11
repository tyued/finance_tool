import React, { useCallback, useEffect, useState } from "react";
import { connect } from 'dva';
import { Modal, Radio, Form, Input, Row, Col, Checkbox, Button, Select, DatePicker, InputNumber, notification } from 'antd';
import styles from '@/assets/css/style.less';
import moment from 'moment';

const FormItem = Form.Item;
const { Search } = Input
const {Option} = Select
const dateFormat = 'YYYY-MM-DD';

const disabledDate = (current) => {
    return current && current<moment().endOf('day')
}

function ModifyModal({ modalType, isVisible, closeModal, dispatch, reserveModel, form }){
    const { getFieldDecorator, resetFields } = form;
    let modalTitle = modalType === 'add'? 'New Reserve' : 'Edit Reserve';
    const [ formData, setFormData ] = useState({
        fixed: false,
        fixedList: [{}]
    });

    const changeValue = useCallback((event, type) => {
        let value = !event?.target ? event : (event.target?.value||event.target?.checked);
        if(type === 'id'){
            getMerchantDetail(value)
            return
        }else if(type === 'end_date' || type === 'start_date'){
            value = moment(value).format(dateFormat)
        }
        setFormData({
            ...formData,
            [type]: value
        });
    }, [getMerchantDetail, formData])

    const getMerchantDetail = async (id) => {
        let res = await dispatch({
            type: 'reserveModel/getMerchantDetail',
            payload: {
                id
            }
        })
        if(!res) return
        setFormData({
            ...formData,
            ...res
        });
    }
    const clickAddFixed = () => {
        setFormData({
            ...formData,
            fixedList:[...formData.fixedList, {}]
        })
    }
    const changeFixedValue = useCallback((event, type, index) => {
        let value = !event?.target ? event : (event.target.value);
        let { fixedList } = formData;
        if(type === 'end_date' || type === 'start_date'){
            value = moment(value).format(dateFormat)
        } 
        formData.fixedList[index][type] = value
        setFormData({
            ...formData,
            fixedList
        })
        
    }, [formData])

    const checkValidator = (rule, value, callback) => {
        const { field } = rule
        const type = field.split('_')?.[0]
        if(type === 'fixed' && formData.fixed && !value ){
            return callback('This is required')
        }
        if(type === 'rolling' && formData.rolling && !value ){
            return callback('This is required')
        }
        callback()
    }
    const handleSubmit = () => {
        form.validateFields(async (err, values) => {
            if(err) return

            const { fixed, rolling, fixedList, merchant_id, merchant_name, settlement_currency,
                start_date, end_date, percent, rolling_period } = formData;

            let reqData = [];

            if(merchant_id && (!merchant_name || !settlement_currency)){
                showError("Please Search Merchant's Citcon MID ")
            }

            if(fixed){
                const reqFixed = fixedList.map(item => {
                    return {merchant_id, type: 'fixed', content:item}
                })
                reqData = reqData.concat(reqFixed)
            }
            if(rolling){
                const reqRolling = {
                    merchant_id,
                    type: 'rolling',
                    content: {
                        start_date,
                        end_date,
                        percent,
                        rolling_period,
                    }
                }
                reqData.push(reqRolling)
            }
            let res = await dispatch({
                type: 'reserveModel/createReserve',
                payload: {
                    list: reqData
                }
            })
            // resetFields();
        });
    }

    const showError = (message) => {
        notification.error({
            message: 'An error has occured',
            description: message,
            placement: 'bottomRight',
        })
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
                        initialValue: formData.merchant_id || '',
                        rules: [{required: true, message: 'mid is required'}]
                    })(
                        <Search placeholder="Please enter merchant's citcon MID" onSearch={(e)=>changeValue(e, 'id')}></Search>
                    )}
                </FormItem>
                <Row gutter={24}>
                    <Col span={12}>
                        <FormItem label="Merchant Name" >
                            {getFieldDecorator('merchant_name', {
                                initialValue: formData.merchant_name || '',
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
                <Checkbox className={styles.subTit} style={{fontSize: 22}}  onChange={(e)=>changeValue(e, 'fixed')}>
                    Fixed Reserve:
                </Checkbox>
                {formData.fixedList.map((item,index) => (
                    <div className={index+1==formData.fixedList.length?'':styles.boxliner} key={'fixed'+index} style={{ paddingBottom: 10 }}>
                        <Row gutter={24}>
                            <Col span={8}>
                                <FormItem label="Amount" name={`amount_${index}`}>
                                    {getFieldDecorator(`fixed_amount_${index}`, {
                                        rules: [{ validator: checkValidator}]
                                    })(
                                        <InputNumber style={{ width: '100%' }} onChange={(e)=>changeFixedValue(e, 'amount', index)} />

                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label="Due Date">
                                    {getFieldDecorator(`fixed_start_date_${index}`, {
                                        rules: [{ validator: checkValidator}]
                                    })(
                                        <DatePicker placeholder="Due Date" disabledDate={disabledDate} format={dateFormat} onChange={(e)=>changeFixedValue(e, 'start_date', index)} />
                                    )}
                                    </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label="Release Date">
                                    {getFieldDecorator(`fixed_end_date_${index}`, {
                                        rules: [{ validator: checkValidator}]
                                    })(
                                        <DatePicker placeholder="Release Date" disabledDate={disabledDate} format={dateFormat} onChange={(e)=>changeFixedValue(e, 'end_date', index)} />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <div className={styles.subTit} style={{paddingTop: 10}}>How to Charge</div>
                        <FormItem>
                            {getFieldDecorator(`fixed_mode_${index}`, {
                                rules: [{ validator: checkValidator}]
                            })(
                                <Radio.Group style={{ marginLeft: 20}}  onChange={(e)=>changeFixedValue(e, 'mode', index)}>
                                    <Radio style={{ width: '100%', marginBottom: 10 }} value='settlement_deduction'>Deduct it from settlemen</Radio>
                                    <Radio style={{ width: '100%', marginBottom: 10 }} value='ach_debit' disabled>ACH Debit</Radio>
                                    <Radio style={{ width: '100%' }} value='invoice'>Invoice</Radio>
                                    {modalType !== 'add' &&  <Select style={{ width: '100%' }} placeholder="Select">
                                        <Option value="A">paid</Option>
                                        <Option value="B" disabled>released</Option>
                                    </Select>}
                                </Radio.Group>  
                            )} 
                        </FormItem>
                        
                    </div>
                ))}
                <Button type='primary' icon='plus' onClick={clickAddFixed}>Add fixed Reserve</Button>
                <div style={{marginTop: 30}}>
                    <Checkbox className={styles.subTit} style={{fontSize: 22}} onChange={(e)=>changeValue(e, 'rolling')}>
                        Rolling Reserve:
                    </Checkbox>
                </div>
                <Row gutter={24}>
                    <Col span={8}>
                        <FormItem label="% of Daily Settlement">
                            {getFieldDecorator(`rolling_percent`, {
                                rules: [{ validator: checkValidator}]
                            })(
                                <InputNumber style={{ width: '100%' }}  placeholder="Amount" onChange={(e)=>changeValue(e, 'percent')} />  
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="Start Date">
                            {getFieldDecorator(`rolling_start_date`, {
                                rules: [{ validator: checkValidator}]
                            })(
                                <DatePicker style={{ width: '100%' }} disabledDate={disabledDate} format={dateFormat} placeholder="Date" onChange={(e)=>changeValue(e, 'start_date')} />  
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="# of Rolling Days">
                            {getFieldDecorator(`rolling_rolling_period`, {
                                rules: [{ validator: checkValidator}]
                            })(
                                <InputNumber style={{ width: '100%' }} placeholder="Date" onChange={(e)=>changeValue(e, 'rolling_period')} />  
                            )}
                            
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={8}>
                        <FormItem label="End Date">
                            <DatePicker style={{ width: '100%' }} disabledDate={disabledDate} format={dateFormat} placeholder="Date" onChange={(e)=>changeValue(e, 'end_date')} />  
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