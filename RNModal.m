#import "RNModal.h"
#import "RCTLog.h"
#import "RCTUIManager.h"
#import "RCTView.h"
#import "RCTTouchHandler.h"
#import "UIView+React.h"

@implementation RNModal {
  UIWindow *_overlayWindow;
  UIViewController *_modalViewController;
  RCTView *_modalBaseView;
  RCTTouchHandler *_touchHandler;
}

- (id)initWithBridge:(RCTBridge *)bridge
{
  if ((self = [super init])) {
    _modalViewController = [[UIViewController alloc] init];
    _modalBaseView = [[RCTView alloc] init];

    /* Must register handler because we are in a new UIWindow and our
     * modalBaseView does not have a RCTRootView parent */
    _touchHandler = [[RCTTouchHandler alloc] initWithBridge:bridge];
    [_modalBaseView addGestureRecognizer:_touchHandler];

    _modalViewController.view = _modalBaseView;
  }

  return self;
}

/* Every component has it is initializer called twice, once to create a base view
 * with default props and another to actually create it and apply the props. We make
 * this prop that is always true in order to not create UIWindow for the default props
 * instance */
- (void)setVisible:(BOOL)visible {
  _overlayWindow = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  _overlayWindow.backgroundColor = [UIColor clearColor];
  _overlayWindow.windowLevel = UIWindowLevelStatusBar;
  _overlayWindow.rootViewController = _modalViewController;
  _overlayWindow.userInteractionEnabled = YES;
  _overlayWindow.hidden = NO;

  /* We need to watch for app reload notifications to properly remove the modal,
   * removeFromSuperview does not properly propagate down without this */
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(removeFromSuperview)
                                               name:@"RCTReloadNotification"
                                             object:nil];
}

- (void)insertReactSubview:(UIView *)view atIndex:(NSInteger)atIndex
{
  /* Add subviews to the modal base view rather than self */
  [_modalBaseView insertReactSubview:view atIndex:atIndex];
}

/* We do not need to support unmounting, so I -think- that this cleanup code
 * is safe to put here. */
- (void)removeFromSuperview
{
  [_modalBaseView.subviews makeObjectsPerformSelector:@selector(removeFromSuperview)];
  [_touchHandler invalidate];
  _touchHandler = nil;
  _modalViewController = nil;
  _modalBaseView = nil;
  _overlayWindow = nil;
  [super removeFromSuperview];
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

@end
