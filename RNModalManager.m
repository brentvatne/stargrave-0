#import "RNModalManager.h"
#import "RNModal.h"
#import "RCTBridge.h"

@implementation RNModalManager

@synthesize bridge = _bridge;

- (UIView *)view
{
  return [[RNModal alloc] initWithBridge:_bridge];
}

RCT_EXPORT_VIEW_PROPERTY(visible, BOOL);

@end
