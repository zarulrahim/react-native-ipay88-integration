# React Native iPay88 Integration
Updated on 22 July 2021 by Zarul Rahim

## SDK Version Recommendation 
You can find the sdk library and see the version from attachment that you received from iPay88 team. 

#### Android
`IPHSD_SDK_11022021.aar`

#### iOS
`libipay88sdk.a` (version 1.0.6.6)

## Getting started

### Mostly automatic installation with autolinking (RN > 0.60)

`$ yarn add react-native-ipay88-integration`

or

`$ npm install react-native-ipay88-integration --save`

### Mostly automatic installation with react-native link (RN < 0.60)

`$ react-native link react-native-ipay88-integration`

### Manual installation (Rare case to run manual installation. Not recommended)

#### iOS

1.  In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2.  Go to `node_modules` ➜ `react-native-ipay88-integration` and add `RNIpay88Sdk.xcodeproj`
3.  In XCode, in the project navigator, select your project. Add `libRNIpay88Sdk.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4.  Run your project (`Cmd+R`)<

#### Android

1.  Open up `android/app/src/main/java/[...]/MainActivity.java`

* Add `import com.ipay88.IPay88Package;` to the imports at the top of the file
* Add `new IPay88Package()` to the list returned by the `getPackages()` method

2.  Append the following lines to `android/settings.gradle`:
    ```
    include ':react-native-ipay88-integration'
    project(':react-native-ipay88-integration').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-ipay88-integration/android')
    ```
3.  Insert the following lines inside the dependencies block in `android/app/build.gradle`:
    ```
      compile project(':react-native-ipay88-integration')
    ```

## Workaround

You need to add this into your `/main/AndroidManifest.xml`,

1. Inside `<manifest>` tag, add `xmlns:tools="http://schemas.android.com/tools"`

and then, 

2. Inside `<application>` tag, add `tools:replace="android:allowBackup" android:allowBackup="true"`

## Usage

```javascript
import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Button,
  Text,
  View,
  Alert,
  ToastAndroid
} from "react-native";
import IPay88, { Pay } from "react-native-ipay88-integration";

export default class App extends Component {
  successNotify = data => {
    if (Platform.OS === "ios") {
      const {
        transactionId,
        referenceNo,
        amount,
        remark,
        authorizationCode
      } = data;

      Alert.alert("Message", `Payment authcode is ${authorizationCode}`, {
        cancelable: true
      });
    } else {
      ToastAndroid.show(
        `Message: Payment authcode is ${authorizationCode}`,
        ToastAndroid.LONG
      );
    }
  };

  cancelNotify = data => {
    const { transactionId, referenceNo, amount, remark, error } = data;

    if (Platform.OS === "ios") {
      Alert.alert("Message", `${error}`, { cancelable: true });
    } else {
      ToastAndroid.show(`Message: ${error}`, ToastAndroid.LONG);
    }
  };

  failedNotify = data => {
    const { transactionId, referenceNo, amount, remark, error } = data;

    if (Platform.OS === "ios") {
      Alert.alert("Message", `${error}`, { cancelable: true });
    } else {
      ToastAndroid.show(`Message: ${error}`, ToastAndroid.LONG);
    }
  };

  pay = () => {
    try {
      const data = {};
      data.paymentId = "2"; // refer to ipay88 docs
      data.merchantKey = "{{ merchantKey }}";
      data.merchantCode = "{{ merchantCode }}";
      data.referenceNo = "1234565";
      data.amount = "1.00";
      data.currency = "MYR";
      data.productDescription = "Payment";
      data.userName = "test";
      data.userEmail = "test@gmail.com";
      data.userContact = "0123456789";
      data.remark = "me";
      data.utfLang = "UTF-8";
      data.country = "MY";
      data.backendUrl = "http://sample.com";
      const errs = Pay(data);
      if (Object.keys(errs).length > 0) {
        console.log(errs);
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <IPay88
          successNotify={this.successNotify}
          failedNotify={this.failedNotify}
          cancelNotify={this.cancelNotify}
        />
        <Button title="Pay" onPress={this.pay} />
      </View>
    );
  }
}
```

### Payment Parameters

* paymentId // optional
* merchantKey // required
* merchantCode // required
* referenceNo // required
* amount // required
* currency // required
* productDescription // required
* userName // required
* userEmail // required
* userContact // required
* remark // optional
* utfLang // optional
* country // required
* backendUrl // required

Refer the documentation that you received from iPay88 team for more info about this parameters. 

### Success Notify

* transactionId
* referenceNo
* amount
* remark
* authorizationCode

### Failed Notify

* transactionId
* referenceNo
* amount
* remark
* error

### Cancel Notify

* transactionId
* referenceNo
* amount
* remark
* error

### NOTES
Please noted that this package is developed based on iPay88 Mobile SDK library. Hopefully it helps our fellow React Native developers to implement iPay88 Mobile SDK into their RN app. Besides that, i'm welcoming contributors to make sure this package well maintained. Thank you. Sincerely, ZR. 
