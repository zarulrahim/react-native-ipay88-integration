/**
 * By Zarul Rahim
**/

#import "Ipay.h"
#import "IpayPayment.h"
#import "React/RCTBridge.h"
#import <React/RCTEventEmitter.h>

@interface IPay88 : RCTEventEmitter <PaymentResultDelegate, RCTBridgeModule>

@property RCTEventEmitter *Event;

@end


