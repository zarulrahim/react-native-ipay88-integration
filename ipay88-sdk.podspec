Pod::Spec.new do |s|
  s.name         = "react-native-ipay88-integration"
  s.version      = "1.0.0"
  s.summary      = "react-native-ipay88-integration"
  s.description  = <<-DESC
                  RNIpay88Sdk
                   DESC
  s.homepage     = "https://github.com/zarulrahim/react-native-ipay88-integration.git"
  s.license      = "MIT"
  s.author       = { "author" => "author@domain.cn" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/author/RNIpay88Sdk.git", :tag => "master" }

  s.source_files = "ios/iPay.h", "ios/IpayPayment.h", "ios/RNIpay88Sdk.h", "ios/RNIpay88Sdk.m"
  s.vendored_libraries = "ios/**/*.a"

  s.requires_arc = true

  s.dependency "React"
end
