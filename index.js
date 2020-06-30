import React, { cloneElement } from 'react';
import { WebView, UIManager, requireNativeComponent ,NativeModules} from 'react-native';
import PropTypes from 'prop-types';

export default class extends WebView {

    static displayName = 'X5WebView';

    static propTypes = {
        ...WebView.propTypes,
        // keyboardDisplayRequiresUserAction: PropTypes.bool,
        // allowFileAccessFromFileURLs: PropTypes.bool,
        // hideAccessory: PropTypes.bool,
        // webviewDebugEnabledWhenDev: PropTypes.number
    };

    static getX5CoreVersion = function (cb: Function): Promise {
      if (cb) {
          NativeModules.RNX5WebView.getX5CoreVersion(cb);
      }

      return new Promise(resolve => {
          NativeModules.RNX5WebView.getX5CoreVersion(resolve);
      });
    };

    goForward = () => {
        UIManager.dispatchViewManagerCommand(
            this.getWebViewHandle(),
            UIManager.getViewManagerConfig('RNX5WebView').Commands.goForward,
            null
        );
    };

    goBack = () => {
        UIManager.dispatchViewManagerCommand(
            this.getWebViewHandle(),
            UIManager.getViewManagerConfig('RNX5WebView').Commands.goBack,
            null
        );
    };

    reload = () => {
        UIManager.dispatchViewManagerCommand(
            this.getWebViewHandle(),
            UIManager.getViewManagerConfig('RNX5WebView').Commands.reload,
            null
        );
    };

    stopLoading = () => {
        UIManager.dispatchViewManagerCommand(
            this.getWebViewHandle(),
            UIManager.getViewManagerConfig('RNX5WebView').Commands.stopLoading,
            null
        );
    };

    postMessage = (data) => {
        UIManager.dispatchViewManagerCommand(
            this.getWebViewHandle(),
            UIManager.getViewManagerConfig('RNX5WebView').Commands.postMessage,
            [String(data)]
        );
    };

    injectJavaScript = (data) => {
        UIManager.dispatchViewManagerCommand(
            this.getWebViewHandle(),
            UIManager.getViewManagerConfig('RNX5WebView').Commands.injectJavaScript,
            [data]
        );
    };

    _onLoadingError = (event) => {
        event.persist(); // persist this event because we need to store it
        var {onError, onLoadEnd} = this.props;
        var result = onError && onError(event);
        onLoadEnd && onLoadEnd(event);
        console.warn('Encountered an error loading page', event.nativeEvent);

        result !== false && this.setState({
            lastErrorEvent: event.nativeEvent,
            viewState: 'ERROR'
        });
    };

    onLoadingError = (event) => {
        this._onLoadingError(event)
    };

    render() {
        const wrapper = super.render();
        const [webview,...children] = wrapper.props.children;
        // const { hideAccessory, allowFileAccessFromFileURLs, keyboardDisplayRequiresUserAction,webviewDebugEnabledWhenDev} = this.props;

        const X5webview = (
            <RNX5WebView
                {...webview.props}
                ref="webview"
                // allowFileAccessFromFileURLs={allowFileAccessFromFileURLs}
                // keyboardDisplayRequiresUserAction={keyboardDisplayRequiresUserAction}
                // hideAccessory={hideAccessory}
                // webviewDebugEnabledWhenDev={webviewDebugEnabledWhenDev}
            />
        );

        return cloneElement(wrapper, wrapper.props, X5webview, ...children);
    }
}

const RNX5WebView = requireNativeComponent('RNX5WebView', null, {
    nativeOnly: {
        messagingEnabled:true,
        allowFileAccessFromFileURLs: true,
        hideAccessory: true,
    }
})
