#import "RNModalBackdrop.h"

@implementation RNModalBackdrop

-(id)init
{
  self = [super init];
  if (self) {
    UIBlurEffect *blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleDark];
    self.visualEffectView = [[UIVisualEffectView alloc] initWithEffect:blurEffect];
  }
  return self;
}

-(void)layoutSubviews
{
  [super layoutSubviews];
  if ([self.subviews containsObject:self.visualEffectView] == NO) {
    self.visualEffectView.frame = self.bounds;
    [self insertSubview:self.visualEffectView atIndex:0];
  }
}

@end
