#import "RNModalManager.h"
#import "RNModal.h"
#import "RCTBridge.h"

@implementation RNModalManager

RCT_EXPORT_MODULE();

@synthesize bridge = _bridge;

- (UIView *)view
{
  return [[RNModal alloc] initWithBridge:_bridge];
}

RCT_EXPORT_VIEW_PROPERTY(visible, BOOL);

@end
