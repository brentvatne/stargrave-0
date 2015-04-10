#import "RNModalBackdrop.h"

@implementation RNModalBackdrop

- (id)init
{
  self = [super init];
  if (self) {
    [self setEffect:@"light"];
  }
  return self;
}

- (void)layoutSubviews
{
  [super layoutSubviews];

  if ([self.subviews containsObject:self.visualEffectView] == NO) {
    self.visualEffectView.frame = self.bounds;
    [self insertSubview:self.visualEffectView atIndex:0];
  }
}

- (void)setEffect:(NSString *)effect
{
  UIBlurEffect *blurEffect;

  if ([effect isEqualToString:@"extra-light"]) {
    blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleExtraLight];
  } else if ([effect isEqualToString:@"light"]) {
    blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleLight];
  } else if ([effect isEqualToString:@"dark"]) {
    blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleDark];
  }

  self.visualEffectView = [[UIVisualEffectView alloc] initWithEffect:blurEffect];
}

@end
