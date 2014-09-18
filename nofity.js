(function(w, d, undefined){
	'use strict';

	function isFunction(fn){
		return typeof fn === 'function';
	}

	function Notify(title, options){
		if( typeof title !== 'string' ){
			throw new Error('Notify(): first arg (title) must be a string.');
		}

		this.title = title;
		this.options = {
			icon: '',
			body: '',
			tag: '',
			lang: '',
			onShowCallback: null,
			onErrorCallback: null,
			onCloseCallback: null,
			onClickCallback: null,
			timeout: null
		};

		this.permission = null;
		if( !Notify.isSupport ){
			return false;
		}

		if( typeof options === 'object' ){
			for( var i in options ){
				if( options.hasOwnProperty(i) ){
					this.options[i] = options[i];
				}
			}
		}
	}

	Notify.isSupport = 'Notification' in w;

	Notify.isPermission = !!(Notify.isSupport && Notification.permission === 'granted');

	Notify.requestPermission = function(permissionGranted, permissionDenied, permissionDefault){
		if( !Notify.isSupport ){
			return false;
		}

		w.Notification.requestPermission(function(perm){
			switch(perm){
				case 'granted':
					Notify.isPermission = false;
					isFunction(permissionGranted) && permissionGranted();
					break;
				case 'denied':
					isFunction(permissionDenied) && permissionDenied();
					break;
				default: 
					isFunction(permissionDefault) && permissionDefault();
			}
		});
	};

	Notify.prototype = {
		show: function(){
			if( !Notify.isSupport ){
				return false;
			}

			this.notify = new Notification(this.title, {
				'body': this.options.body,
				'tag': this.options.tag,
				'lang': this.options.lang,
				'icon': this.options.icon
			});

			if( !!this.options.timeout ){
				setTimeout( this.close.bind(this), this.options.timeout * 1000);
			}

			this.notify.addEventListener('show', this, false);
			this.notify.addEventListener('error', this, false);
			this.notify.addEventListener('close', this, false);
			this.notify.addEventListener('click', this, false);
		},
		onShow: function(e){
			this.onShowCallback && this.onShowCallback(e);
		},
		onError: function(e){
			this.onErrorCallback && this.onErrorCallback(e);
			this.destroy();
		},
		onClose: function(e){
			this.onCloseCallback && this.onCloseCallback(e);
			this.destroy();
		},
		onClick: function(e){
			this.onClickCallback && this.onClickCallback(e);
		},
		destroy: function(){
			this.notify.removeEventListener('show', this, false);
			this.notify.removeEventListener('error', this, false);
			this.notify.removeEventListener('close', this, false);
			this.notify.removeEventListener('click', this, false);
		},
		close: function(){
			this.notify.close();
		},
		handleEvent: function(e){
			switch(e.type){
				case 'show':
					this.onShow(e);
					break;
				case 'error': 
					this.onError(e);
					break;
				case 'close':
					this.onClose(e);
					break;
				case 'click':
					this.onClick(e);
					break;
			}
		}
	}

	w.Notify = Notify;


})(window, document);