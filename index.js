import { useEffect, Component } from 'react';
import { NativeModules, DeviceEventEmitter, Platform, NativeEventEmitter } from 'react-native';
import { PropTypes } from 'prop-types';

const { IPay88 } = NativeModules;
const iosEvent = new NativeEventEmitter(IPay88);

const isAndroid = Platform.OS === 'android';

let successSubscription;
let failedSubscription;
let cancelSubscription;

export default IPay = (props) => {
  propTypes = {
    successNotify: PropTypes.func.isRequired,
    failedNotify: PropTypes.func.isRequired,
    cancelNotify: PropTypes.func.isRequired,
  };

  useEffect(() => {
    if (isAndroid) {
      // Android
      successSubscription = DeviceEventEmitter.addListener('ipay88:success', (data) => onSuccess(data));
      failedSubscription = DeviceEventEmitter.addListener('ipay88:failed', (data) => onFailed(data));
      cancelSubscription = DeviceEventEmitter.addListener('ipay88:canceled', (data) => onCanceled(data));
    } else {
      // ios
      successSubscription = iosEvent.addListener('ipay88:success', (data) => onSuccess(data));
      failedSubscription = iosEvent.addListener('ipay88:failed', (data) => onFailed(data));
      cancelSubscription = iosEvent.addListener('ipay88:canceled', (data) => onCanceled(data));
    }
    return () => {
      successSubscription.remove();
      failedSubscription.remove();
      cancelSubscription.remove();
    }
  }, [])

  const onSuccess = (data) => {
    props.successNotify(data);
  };

  const onCanceled = (data) => {
    props.cancelNotify(data);
  };

  const onFailed = (data) => {
    props.failedNotify(data);
  };

  return (null)
};

const Pay = (data) => {
  const {
    paymentId = '',
    merchantKey = '',
    merchantCode = '',
    referenceNo = '',
    amount = '',
    currency = '',
    productDescription = '',
    userName = '',
    userEmail = '',
    userContact = '',
    remark = '',
    utfLang = '',
    country = '',
    backendUrl = '',
  } = data;

  const errors = {};
  if (paymentId === '') errors.paymentId = '`paymentId` is required'; // optional
  if (merchantKey === '') errors.merchantKey = '`merchantKey` is required';
  if (merchantCode === '') errors.merchantCode = '`merchantCode` is required`';
  if (referenceNo === '') errors.referenceNo = '`referenceNo` is required';
  if (amount === '') errors.amount = '`amount` is required';
  if (currency === '') errors.currency = '`currency` is required';
  if (productDescription === '') errors.productDescription = '`productDescription` is required';
  if (userName === '') errors.userName = '`userName` is required';
  if (userEmail === '') errors.userEmail = '`userEmail` is required';
  if (userContact === '') errors.userContact = '`userContact` is required';
  if (remark === '') errors.remark = '`remark` is required'; // optional
  if (utfLang === '') errors.utfLang = '`utfLang` is required'; // optional
  if (country === '') errors.country = '`country` is required';
  if (backendUrl === '') errors.backendUrl = '`backendUrl` is required';

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  return IPay88.pay(data);
};

export { Pay };