#import "React/RCTBridgeModule.h"
#import "ReactCommon/BridgeModules.h"
#import "WeatherSdk-Swift.h"

@interface WeatherSdk : NSObject <NativeWeatherSdkSpec>
@end

@implementation WeatherSdk
RCT_EXPORT_MODULE()

- (void)fetchWeatherByCity:(NSString *)city
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject {
  [[[WeatherSdkImpl alloc] init] fetchWeatherByCity:city resolve:resolve reject:reject];
}

- (void)fetchWeatherByCoordinates:(double)lat
                               lon:(double)lon
                          resolver:(RCTPromiseResolveBlock)resolve
                          rejecter:(RCTPromiseRejectBlock)reject {
  [[[WeatherSdkImpl alloc] init] fetchWeatherByCoordinates:lat lon:lon resolve:resolve reject:reject];
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeWeatherSdkSpecJSI>(params);
}

@end
