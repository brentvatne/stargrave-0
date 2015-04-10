#import "RNModalBackdropManager.h"
#import "RNModalBackdrop.h"

@implementation RNModalBackdropManager

RCT_EXPORT_MODULE();

- (RCTView *)view
{
  return [[RNModalBackdrop alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(effect, NSString);

@end
