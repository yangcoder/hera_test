//
// Copyright (c) 2017, weidian.com
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// * Redistributions of source code must retain the above copyright notice, this
// list of conditions and the following disclaimer.
//
// * Redistributions in binary form must reproduce the above copyright notice,
// this list of conditions and the following disclaimer in the documentation
// and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
// FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
// DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
// SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
// CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
// OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//


#import "WDHService.h"
#import "WDHBridge.h"
#import "NSObject+WDHJson.h"
#import "WDHScriptMessageHandlerDelegate.h"
#import "WDHLog.h"

@interface WDHService ()<WDHServiceBridgeProtocol>

@property (nonatomic, strong) WDHBridge *serviceBridge;

@property (nonatomic, strong) WKWebView *webView;



@end

NSString * kWDHServiceOpenTypeAppLaunch = @"appLaunch";
NSString * kWDHServiceOpenTypeNavigateBack = @"navigateBack";
NSString * kWDHServiceOpenTypeRedirectTo = @"redirectTo";

@implementation WDHService

- (void)dealloc
{
	HRLog(@"deinit WDHService");
}

- (instancetype)initWithAppConfiguration:(NSDictionary *)appConfiguration manager:(WDHManager *)manager
{
    if (self = [super init]) {
		self.serviceBridge = [[WDHBridge alloc] initWithWebViewDelegate:self managerDelegate:(id<WDHManagerProtocol>)manager];
		WKUserContentController *userContentController = [self.serviceBridge getBridgeUserContentController];
		WKWebViewConfiguration *configuration = WKWebViewConfiguration.new;
		configuration.userContentController = userContentController;
		
		WKWebView *webView = [[WKWebView alloc] initWithFrame:(CGRect){0,0,1,1} configuration:configuration];
        
        NSString *htmlStr = @"<html><head>###<script src=\"../../../framework/script/service.js\" type=\"text/javascript\"></script><script src=\"app-service.js\"></script></head><body><script>WeixinJSBridge.publish('serviceReady', __wxConfig, [100000]);</script></body></html>";
        
		NSString *service_js = appConfiguration[@"service_js"];
        NSString *app_config = appConfiguration[@"app_config"];
//        NSString *local_service = appConfiguration[@"local_service_js"];
//        NSString *ready_js = @"WeixinJSBridge.publish('serviceReady', __wxConfig, [100000]);";
        NSString *dir = appConfiguration[@"root"];
        NSURL *baseUrl = [NSURL fileURLWithPath:dir];
        app_config = [[@"<script>" stringByAppendingString:app_config] stringByAppendingString:@"</script>"];
        htmlStr = [htmlStr stringByReplacingOccurrencesOfString:@"###" withString:app_config];
//         [webView loadHTMLString:htmlStr baseURL:baseUrl];
        [webView loadHTMLString:htmlStr baseURL:baseUrl];
//        [webView evaluateJavaScript:app_config completionHandler:^(id _Nullable content, NSError * _Nullable error) {
//            if (!error) {
//
////                [webView evaluateJavaScript:local_service  completionHandler:^(id _Nullable content, NSError * _Nullable error) {
////                    if (!error) {
////                        [webView evaluateJavaScript:service_js completionHandler:^(id _Nullable content, NSError * _Nullable error) {
////                            if (!error) {
////                                [webView evaluateJavaScript:ready_js completionHandler:^(id _Nullable content, NSError * _Nullable error) {
////                                    NSLog(@"");
////                                }];
////                            }
////                        }];
////                    }
////
////                }];
//            }
//        }];

//        [webView loadRequest:request];
		self.webView = webView;
    }
    
    HRLog(@"<service>:finish load html------");
    
    return self;
}

- (void)serviceBridgeDidNeedInjectScript:(NSString *)script completionHandler:(void (^)(id, NSError *))completionHandler
{
    [self evaluateJavaScript:script completionHandler:completionHandler];
}

- (void)evaluateJavaScript:(NSString *)javaScriptString completionHandler:(void(^)(id result,NSError *error))completionHandler
{

	[self.webView evaluateJavaScript:javaScriptString completionHandler:completionHandler];
}

- (void)loadConfigFileWithCompletion:(void(^)(NSDictionary *dic))completion
{
	[self.serviceBridge loadConfigFileWithCompletion:^(NSDictionary *dic) {
		self.appConfig = dic;
		if (completion) {
			completion(dic);
		}
	}];
}

- (void)callSubscribeHandlerWithEvent:(NSString *)eventName jsonParam:(NSString *)jsonParam webId:(unsigned long long)webId {
	[self.serviceBridge callSubscribeHandlerWithEvent:eventName jsonParam:jsonParam webId:webId];
}

- (void)callSubscribeHandlerWithEvent:(NSString *)eventName jsonParam:(NSString *)jsonParam {
	[self.serviceBridge callSubscribeHandlerWithEvent:eventName jsonParam:jsonParam];
}

- (void)publishCallbackHandler:(NSString *)callbackId {

}

- (void)invokeCallbackHandler:(int)callbackId param:(NSString *)param
{
	[self.serviceBridge invokeCallbackHandlerWithCallbackId:callbackId param:param];
}

- (void)onAppRoute:(NSString *)routeType htmlPath:(NSString *)htmlPath queryString:(NSString *)queryString webId:(unsigned long long)webId
{
    NSMutableDictionary *queryDictionary = [NSMutableDictionary new];
    if (queryString) {
        NSArray *queryArray = [queryString componentsSeparatedByString:@"&"];
        for (NSString *queryItem in queryArray) {
            NSArray *pairs = [queryItem componentsSeparatedByString:@"="];
            if (pairs.count > 1) {
                NSString *key = pairs.firstObject;
                NSString *value = pairs.lastObject;
                queryDictionary[key] = value;
            }
        }
    }
	
	//htmlPath去除query部分
	NSString *path = nil;
	NSRange range = [htmlPath rangeOfString:@"?"];
	if (range.location != NSNotFound) {
		path = [htmlPath substringToIndex:range.location];
	} else {
		path = htmlPath;
	}
    
    NSDictionary *param = nil;
    if (queryDictionary.count) {
        param = @{@"openType":routeType,@"path":path,@"query":queryDictionary};
    }else {
        param = @{@"openType":routeType,@"path":path};
    }
    
    NSString *jsonParam  = [param wdh_jsonString];
    [self callSubscribeHandlerWithEvent:@"onAppRoute" jsonParam:jsonParam webId:webId];
}


@end

