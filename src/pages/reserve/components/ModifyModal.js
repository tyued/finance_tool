import React, { useCallback, useEffect } from "react";
import { connect } from 'dva';
import { Modal, Radio, Form, Input, Row, Col, Checkbox, Button, Select, DatePicker, InputNumber, notification, Icon } from 'antd';
import styles from '@/assets/css/style.less';
import moment from 'moment';
import { isEmpty } from '@/utils/tools'

const FormItem = Form.Item;
const { Search } = Input
const {Option} = Select
const dateFormat = 'YYYY-MM-DD';

const disabledDate = (current) => {
    return current && current<moment().subtract(1, 'days')
}

let fixedId = 1;

function ModifyModal({ modalType, isVisible, closeModal, dispatch, reserveModel, form, formData }){
    const { getFieldDecorator, resetFields, setFieldsValue, getFieldsValue, getFieldValue } = form;
    let modalTitle = modalType === 'add'? 'New Reserve' : 'Edit Reserve';

    getFieldDecorator('fixedKeys', { initialValue: [0] });
    const fixedKeys = getFieldValue('fixedKeys');

    const changeValue = useCallback(async (event, type) => {
        let value = !event?.target ? event : (event.target?.value||event.target?.checked);
        if(type === 'id'){
            let res = await dispatch({
                type: 'reserveModel/getMerchantDetail',
                payload: {
                    id: value
                }
            })
            setFieldsValue({
                merchant_id: res?.merchant_id || '', 
                merchant_name: res?.merchant_name || '', 
                settlement_currency: res?.settlement_currency || ''
            })
        }

    }, [dispatch, setFieldsValue])

    const deleteFixed = (k) => {
        let orgFixedKeys = getFieldValue('fixedKeys');
        setFieldsValue({
            fixedKeys: orgFixedKeys.filter(key => key !== k),
        });
    }
    const clickAddFixed = () => {
        let orgFixedKeys = getFieldValue('fixedKeys');
        setFieldsValue({fixedKeys: orgFixedKeys.concat(fixedId++)})
    }
    const checkValidator = (rule, value, callback) => {
        const { field } = rule;
        const type = field.split('_')?.[0];
        const { fixed, rolling} = getFieldsValue();
        if(type === 'fixed' && fixed && !value ){
            return callback('This is required')
        }
        if(type === 'rolling' && rolling && !value ){
            return callback('This is required')
        }
        callback()
    }


    const handleSubmit = () => {
        form.validateFields(async (err, values) => {
            if(err) return;
            const { merchant_id, merchant_name, settlement_currency, fixed, rolling, 
                fixedKeys, fixed_amount, fixed_end_date, fixed_mode, fixed_start_date, 
                rolling_start_date, rolling_end_date, rolling_percent, rolling_period } = values;
            let reqData = [];

            if(merchant_id && (!merchant_name || !settlement_currency)){
                showError("Please Search Merchant's Citcon MID ");
                return;
            }
            if(!fixed || !rolling){
                showError("Please Select Reserve ");
                return;
            }
            if(fixed){
                const reqFixed = fixedKeys.map(key => {
                    return {
                        merchant_id, 
                        type: 'fixed', 
                        start_date: moment(fixed_start_date[key]).format(dateFormat),
                        end_date: moment(fixed_end_date[key]).format(dateFormat),
                        content:{
                            amount: fixed_amount[key],
                            mode: fixed_mode[key]
                        }
                    }
                })
                reqData = reqData.concat(reqFixed)
            }
            if(rolling){
                const reqRolling = {
                    merchant_id,
                    type: 'rolling',
                    start_date: moment(rolling_start_date).format(dateFormat),
                    end_date: moment(rolling_end_date).format(dateFormat),
                    content: {
                        percent: rolling_percent,
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
            if(res){
                resetFields();
                closeModal();
            }

        })
    }
    const showError = (message) => {
        notification.error({
            message: 'An error has occured',
            description: message,
            placement: 'bottomRight',
        })
    }

    useEffect(() => {
        if(isEmpty(formData)) return;
        const { merchant_id, merchant_name, type, content, end_date, start_date } = formData;
        let resData = {}
        if(type === 'fixed'){
            resData = {
                fixed: true,
                fixed_amount: [content.amount],
                fixed_mode: [content.mode],
                fixed_start_date: [start_date?moment(start_date):null],
                fixed_end_date: [end_date?moment(end_date):null],
            }
        }else if(type === 'rolling'){
            resData = {
                rolling: true,
                rolling_start_date: start_date?moment(start_date):null,
                rolling_end_date: end_date?moment(end_date):null,
                rolling_percent: content.percent, 
                rolling_period: content.rolling_period
            }
        }
        setFieldsValue({
            merchant_id, merchant_name, 
            ...resData
        })
    }, [formData, setFieldsValue])
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
                        rules: [{required: true, message: 'mid is required'}]
                    })(
                        <Search placeholder="Please enter merchant's citcon MID" onSearch={(e)=>changeValue(e, 'id')}></Search>
                    )}
                </FormItem>
                <Row gutter={24}>
                    <Col span={12}>
                        <FormItem label="Merchant Name" >
                            {getFieldDecorator('merchant_name', {})(
                                <Input disabled />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="Settlement Currency">
                            {getFieldDecorator('settlement_currency', {})(
                                <Input disabled />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                {(!formData.type || formData.type==='fixed') && <>
                    {getFieldDecorator('fixed', { 
                        valuePropName: 'checked'
                    })(
                        <Checkbox className={styles.subTit} style={{fontSize: 22}}>
                            Fixed Reserve:
                        </Checkbox>
                    )}
                    {fixedKeys.map((key,index) => (
                        <div className={index+1===fixedKeys.length?'':styles.boxliner} key={'fixed'+index} style={{ paddingBottom: 10, position: 'relative' }}>
                            {index!==0 && 
                                <Button className={styles.delButton} type="danger" icon="delete" onClick={() => deleteFixed(key)}></Button>
                            }
                            <Row gutter={24}>
                                <Col span={8}>
                                    <FormItem label="Amount" name={`amount_${index}`}>
                                        {getFieldDecorator(`fixed_amount[${key}]`, {
                                            rules: [{ validator: checkValidator}]
                                        })(
                                            <InputNumber style={{ width: '100%' }} />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem label="Due Date">
                                        {getFieldDecorator(`fixed_start_date[${key}]`, {
                                            rules: [{ validator: checkValidator}]
                                        })(
                                            <DatePicker placeholder="Due Date" disabledDate={disabledDate} format={dateFormat} />
                                        )}
                                        </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem label="Release Date">
                                        {getFieldDecorator(`fixed_end_date[${key}]`, {
                                            rules: [{ validator: checkValidator}]
                                        })(
                                            <DatePicker placeholder="Release Date" disabledDate={disabledDate} format={dateFormat} />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <div className={styles.subTit} style={{paddingTop: 10}}>How to Charge</div>
                            <FormItem>
                                {getFieldDecorator(`fixed_mode[${key}]`, {
                                    rules: [{ validator: checkValidator}]
                                })(
                                    <Radio.Group style={{ marginLeft: 20}}>
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
                    { modalType === 'add' && <Button type='primary' icon='plus' onClick={clickAddFixed}>Add fixed Reserve</Button>}
                </>}
                {(!formData.type || formData.type==='rolling') && <>
                    {getFieldDecorator('rolling', { 
                        valuePropName: 'checked'
                    })(
                        <Checkbox className={styles.subTit} style={{fontSize: 22}}>
                            Rolling Reserve:
                        </Checkbox>
                    )}
                    <Row gutter={24}>
                        <Col span={8}>
                            <FormItem label="% of Daily Settlement">
                                {getFieldDecorator(`rolling_percent`, {
                                    rules: [{ validator: checkValidator}]
                                })(
                                    <InputNumber style={{ width: '100%' }}  placeholder="Amount" />  
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="Start Date">
                                {getFieldDecorator(`rolling_start_date`, {
                                    rules: [{ validator: checkValidator}]
                                })(
                                    <DatePicker style={{ width: '100%' }} disabledDate={disabledDate} format={dateFormat} placeholder="Date"/>  
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="# of Rolling Days">
                                {getFieldDecorator(`rolling_period`, {
                                    rules: [{ validator: checkValidator}]
                                })(
                                    <InputNumber style={{ width: '100%' }} placeholder="Date" />  
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={8}>
                            <FormItem label="End Date">
                                {getFieldDecorator(`rolling_end_date`, {})(
                                    <DatePicker style={{ width: '100%' }} disabledDate={disabledDate} format={dateFormat} placeholder="Date" />  
                                )}
                                
                            </FormItem>
                        </Col>
                    </Row>
                </>}
            </Form>


        </Modal>
    )
}

function mapStateToProps( data ) {
    const { reserveModel } = data;
    return { reserveModel };
}

export default connect(mapStateToProps)(Form.create()(ModifyModal));