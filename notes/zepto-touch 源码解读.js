/*eslint-disable*/
var Touch = function($) {
    var touch = {},
        touchTimeout, tapTimeout, swipeTimeout, longTapTimeout,
        longTapDelay = 750,
        gesture;
    // 判断滑动方向，返回Left, Right, Up, Down    
    function swipeDirection(x1, x2, y1, y2) {
        return Math.abs(x1 - x2) >=
            Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down');
    }
    //长按
    function longTap() {
        longTapTimeout = null;
        if (touch.last) {
            touch.el.trigger('longTap');
            touch = {};
        }
    }
    //取消长按
    function cancelLongTap() {
        if (longTapTimeout) clearTimeout(longTapTimeout);
        longTapTimeout = null;
    }
    //取消所有
    function cancelAll() {
        if (touchTimeout) clearTimeout(touchTimeout);
        if (tapTimeout) clearTimeout(tapTimeout);
        if (swipeTimeout) clearTimeout(swipeTimeout);
        if (longTapTimeout) clearTimeout(longTapTimeout);
        touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null;
        touch = {};
    }
    // IE的touch事件
    function isPrimaryTouch(event) {
        return (event.pointerType == 'touch' ||
            event.pointerType == event.MSPOINTER_TYPE_TOUCH) && event.isPrimary;
    }
    // IE鼠标事件
    function isPointerEventType(e, type) {
        return (e.type == 'pointer' + type ||
            e.type.toLowerCase() == 'mspointer' + type);
    }

    $(document).ready(function() {
        var now, delta, deltaX = 0,
            deltaY = 0,
            firstTouch, _isPointerType;
        //IE的手势
        if ('MSGesture' in window) {
            gesture = new MSGesture();
            gesture.target = document.body;
        }
        $(document)
            .bind('MSGestureEnd', function(e) { //处理IE手势结束
                var swipeDirectionFromVelocity =
                    e.velocityX > 1 ? 'Right' : e.velocityX < -1 ? 'Left' : e.velocityY > 1 ? 'Down' : e.velocityY < -1 ? 'Up' : null;
                if (swipeDirectionFromVelocity) {
                    touch.el.trigger('swipe');
                    touch.el.trigger('swipe' + swipeDirectionFromVelocity);
                }
            })
            // 处理手指接触
            .on('touchstart MSPointerDown pointerdown', function(e) {
                //排除非触摸设备
                if ((_isPointerType = isPointerEventType(e, 'down')) &&
                    !isPrimaryTouch(e)) return;
                firstTouch = _isPointerType ? e : e.touches[0]; // 获取起点位置数据    
                // 重置终点坐标
                if (e.touches && e.touches.length === 1 && touch.x2) {
                    // Clear out touch movement data if we have it sticking around
                    // This can occur if touchcancel doesn't fire due to preventDefault, etc.
                    touch.x2 = undefined;
                    touch.y2 = undefined;
                }
                // 判断用户动作类型
                now = Date.now();
                delta = now - (touch.last || now); // 距离上次碰触的时间差
                touch.el = $('tagName' in firstTouch.target ?
                    firstTouch.target : firstTouch.target.parentNode); // 手指碰触的元素
                touchTimeout && clearTimeout(touchTimeout); // 重置touch事件处理器的Timeout ID
                //记录起点坐标
                touch.x1 = firstTouch.pageX;
                touch.y1 = firstTouch.pageY;
                //判断是否双击
                if (delta > 0 && delta <= 250) touch.isDoubleTap = true;
                touch.last = now;
                // 注册长按事件处理器ID
                longTapTimeout = setTimeout(longTap, longTapDelay);
                // adds the current touch contact for IE gesture recognition
                // 支持IE手势识别
                if (gesture && _isPointerType) gesture.addPointer(e.pointerId);
            })
            // 处理手指滑动
            .on('touchmove MSPointerMove pointermove', function(e) {
                // 排除非触摸设备
                if ((_isPointerType = isPointerEventType(e, 'move')) &&
                    !isPrimaryTouch(e)) return;
                firstTouch = _isPointerType ? e : e.touches[0];
                cancelLongTap(); // 取消长按事件处理器
                touch.x2 = firstTouch.pageX;
                touch.y2 = firstTouch.pageY;

                deltaX += Math.abs(touch.x1 - touch.x2);
                deltaY += Math.abs(touch.y1 - touch.y2);
            })
            // 处理手指离开
            .on('touchend MSPointerUp pointerup', function(e) {
                // 排除非触摸设备
                if ((_isPointerType = isPointerEventType(e, 'up')) &&
                    !isPrimaryTouch(e)) return;
                cancelLongTap(); // 取消长按事件处理器

                // swipe  判定滑动动作（起点 - 终点的横向或者纵向距离超过30px）
                if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
                    (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30)) {


                    // 注册长按事件处理器ID（立即准备执行长按）
                    swipeTimeout = setTimeout(function() {
                        if (touch.el) {
                            touch.el.trigger('swipe'); // 触发长按
                            // 触发向上|下|左|右的长按
                            touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)));
                        }
                        touch = {}; // 清空数据，本次touch结束
                    }, 0);
                }
                // normal tap 正常轻触
                else if ('last' in touch) { // 如果记录了上次接触时间
                    // don't fire tap when delta position changed by more than 30 pixels,
                    // for instance when moving to a point and back to origin
                    if (deltaX < 30 && deltaY < 30) {
                        // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
                        // ('tap' fires before 'scroll')
                        //立即准备执行轻触，不立即执行是为了scroll时能取消执行轻触
                        tapTimeout = setTimeout(function() {
                            // trigger universal 'tap' with the option to cancelTouch()
                            // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
                            // 触发全局tap，cancelTouch()可以取消singleTap，doubleTap事件，以求更快响应轻触
                            var event = $.Event('tap');
                            event.cancelTouch = cancelAll;
                            // [by paper] fix -> "TypeError: 'undefined' is not an object (evaluating 'touch.el.trigger'), when double tap
                            if (touch.el) touch.el.trigger(event);

                            // trigger double tap immediately
                            // 立即触发doubleTap
                            if (touch.isDoubleTap) {
                                if (touch.el) touch.el.trigger('doubleTap');
                                touch = {};
                            }

                            // trigger single tap after 250ms of inactivity
                            // 250ms后触发singleTap
                            else {
                                touchTimeout = setTimeout(function() {
                                    touchTimeout = null;
                                    if (touch.el) touch.el.trigger('singleTap');
                                    touch = {};
                                }, 250);
                            }
                        }, 0);
                    } else { // 如果是滑了一圈又回到起点，扔掉事件数据，不做处理
                        touch = {};
                    }
                    deltaX = deltaY = 0; // 重置横向，纵向滑动距离
                }
            })
            // when the browser window loses focus,
            // for example when a modal dialog is shown,
            // cancel all ongoing events
            // 浏览器窗口失去焦点时，取消所有事件处理动作
            .on('touchcancel MSPointerCancel pointercancel', cancelAll);

        // scrolling the window indicates intention of the user
        // to scroll, not tap or swipe, so cancel all ongoing events
        // 触发scroll时取消所有事件处理动作
        $(window).on('scroll', cancelAll);
    });

    //在这里注册，在源码中触发
    ['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown',
        'doubleTap', 'tap', 'singleTap', 'longTap'
    ].forEach(function(eventName) {
        $.fn[eventName] = function(callback) {
            return this.on(eventName, callback);
        };
    });

};

export default Touch;